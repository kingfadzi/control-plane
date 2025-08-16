package com.example.onboarding.service;

import com.example.onboarding.integrations.JiraClient;
import com.example.onboarding.integrations.JiraFieldResolver;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Service
public class JiraWebhookService {

    private static final Logger log = LoggerFactory.getLogger(JiraWebhookService.class);

    private final ObjectMapper om = new ObjectMapper();
    private final JiraClient jira;
    @SuppressWarnings("unused")
    private final JiraFieldResolver fields; // reserved for future field updates
    private final OpaClient opa;
    private final FormInstanceService forms;

    // Config from application.yml (env overrides supported)
    @Value("${cps.webhook.disable-auth:true}")
    private boolean disableAuth;

    @Value("${cps.webhook.secret:changeme}")
    private String expectedSecret;

    // Risk story “constraint” settings
    @Value("${cps.risk.issue-type:Story}")
    private String riskIssueType; // e.g., "Story" or custom "Risk"

    @Value("${cps.risk.labels:governance,constraint,risk}")
    private String riskLabelsCsv; // comma-separated

    public JiraWebhookService(JiraClient jira,
                              JiraFieldResolver fields,
                              OpaClient opa,
                              FormInstanceService forms) {
        this.jira = jira;
        this.fields = fields;
        this.opa = opa;
        this.forms = forms;
    }

    /** Entry point from controller */
    public void process(Map<String, String> headers, String payload) throws Exception {
        if (payload == null || payload.isEmpty()) throw new IllegalArgumentException("Empty webhook payload");
        verifyWebhook(headers);

        JsonNode root = om.readTree(payload);
        String event = root.path("webhookEvent").asText("");
        String issueKey = root.path("issue").path("key").asText("");
        String issueType = root.path("issue").path("fields").path("issuetype").path("name").asText("");
        String projectKey = root.path("issue").path("fields").path("project").path("key").asText("");

        if (issueKey.isEmpty()) throw new IllegalArgumentException("No issue key in payload");

        log.info("Event={} issue={} type={} project={}", event, issueKey, issueType, projectKey);

        // ===== PACK FLOW + CONSTRAINT (Risk Story) =====
        log.info(">>> PACKFLOW: starting");
        applyPackFlow(issueKey, projectKey, root);
        log.info(">>> PACKFLOW: done");
    }

    /** Toggleable auth (disabled by default) */
    private void verifyWebhook(Map<String, String> headers) {
        if (disableAuth) {
            log.debug("Webhook auth disabled (cps.webhook.disable-auth=true)");
            return;
        }
        String provided = headers.getOrDefault("X-Webhook-Secret", "");
        if (!expectedSecret.equals(provided)) throw new SecurityException("Invalid webhook secret");
        log.debug("Webhook auth passed");
    }

    /**
     * OPA -> FormInstance -> Remote Link on parent -> Create Risk Story (constraint)
     * -> Link (Risk blocks Parent) -> Remote Link on risk -> Comment on parent
     */
    private void applyPackFlow(String parentIssueKey, String projectKey, JsonNode webhookJson) {
        // 1) Policy decision (which pack/version)
        OpaDecision d = opa.evaluate(webhookJson);
        log.info("OPA decision for {} => pack={} version={}", parentIssueKey, d.packId(), d.version());

        // 2) Create/reuse form instance + URL
        FormInstance fi = forms.findOrCreate(parentIssueKey, d.packId(), d.version());
        String formUrl = forms.publicUrl(fi);

        // 3) Add questionnaire link on the parent (remote link + comment)
        log.info("Posting Remote Link to Jira for {} -> {}", parentIssueKey, formUrl);
        jira.addRemoteLink(parentIssueKey, "Complete " + d.packId() + " " + d.version(), formUrl);

        log.info("Posting comment with form URL to {}", parentIssueKey);
        jira.addComment(parentIssueKey, "CPS: Please complete the questionnaire → " + formUrl);

        // 4) Create the Risk Story as the constraint
        String riskSummary = "[Risk] " + parentIssueKey + " · " + d.packId() + " " + d.version();
        String riskDescription = "Automatically created by CPS as a governance constraint.\n\n"
                + "Questionnaire: " + formUrl + "\n"
                + "Pack: " + d.packId() + " " + d.version() + "\n";
        List<String> riskLabels = Arrays.stream(riskLabelsCsv.split("\\s*,\\s*"))
                .filter(s -> !s.isBlank()).toList();

        String riskIssueKey = jira.createIssue(projectKey, riskIssueType, riskSummary, riskDescription, riskLabels);
        log.info("Risk story {} created (constraint for {})", riskIssueKey, parentIssueKey);

        // 5) Link: Risk Story blocks Parent (so parent shows "is blocked by <risk>")
        jira.linkIssuesBlocks(riskIssueKey, parentIssueKey);
        log.info("Linked constraint: {} blocks {}", riskIssueKey, parentIssueKey);

        // 6) Put the questionnaire link on the Risk Story too (for convenience)
        jira.addRemoteLink(riskIssueKey, "Questionnaire Link", formUrl);

        // 7) Notify on the parent
        jira.addComment(parentIssueKey, "CPS: Risk story created as constraint → " + riskIssueKey);

        log.info("Constraint established: parent={} risk={} url={}", parentIssueKey, riskIssueKey, formUrl);
    }
}
