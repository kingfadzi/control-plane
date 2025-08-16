package com.example.onboarding.service;

import com.example.onboarding.integrations.JiraClient;
import com.example.onboarding.integrations.JiraFieldResolver;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class JiraWebhookService {

    private static final Logger log = LoggerFactory.getLogger(JiraWebhookService.class);

    private final ObjectMapper om = new ObjectMapper();
    private final JiraClient jira;
    private final JiraFieldResolver fields;
    private final OpaClient opa;
    private final FormInstanceService forms;

    @Value("${cps.webhook.disable-auth:true}")
    private boolean disableAuth;

    @Value("${cps.webhook.secret:changeme}")
    private String expectedSecret;

    @Value("${cps.fields.gov-summary:Governance Summary}")
    private String F_GOV_SUMMARY;

    @Value("${cps.fields.gov-status:Governance Status}")
    private String F_GOV_STATUS;

    @Value("${cps.fields.notes:Control Pack Notes}")
    private String F_NOTES;

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

        // === Minimal pack-driven flow ===
        applyPackFlow(issueKey, root);

        // Keep your simple demo updates (optional)
        applyDemoPack(issueKey);
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

    /** OPA -> FormInstance -> Jira Remote Link + Comment */
    private void applyPackFlow(String issueKey, JsonNode webhookJson) {
        OpaDecision d = opa.evaluate(webhookJson); // returns packId + version
        log.info("OPA decision for {} => pack={} version={}", issueKey, d.packId(), d.version());

        FormInstance fi = forms.findOrCreate(issueKey, d.packId(), d.version());
        String formUrl = forms.publicUrl(fi);

        jira.addRemoteLink(issueKey, "Complete " + d.packId() + " " + d.version(), formUrl);
        jira.addComment(issueKey, "CPS: Please complete the questionnaire → " + formUrl);

        log.info("Posted form link for {}: {}", issueKey, formUrl);
    }

    /** Simple field/label demo (optional) */
    private void applyDemoPack(String issueKey) {
        String cfSummary = fields.idFor(F_GOV_SUMMARY);
        String cfStatus  = fields.idFor(F_GOV_STATUS);
        String cfNotes   = fields.idFor(F_NOTES);

        Map<String, Object> update = new HashMap<>();
        update.put("labels", List.of(Map.of("add", "governed")));

        Map<String, Object> fieldSet = new HashMap<>();
        fieldSet.put("duedate", LocalDate.now().plusDays(7).toString());
        if (cfSummary != null) fieldSet.put(cfSummary, "Control Pack Demo applied");
        if (cfStatus  != null) fieldSet.put(cfStatus,  Map.of("value", "In Progress"));
        if (cfNotes   != null) fieldSet.put(cfNotes,   "Auto-set by CPS");

        Map<String, Object> body = new HashMap<>();
        body.put("update", update);
        body.put("fields", fieldSet);

        jira.updateIssue(issueKey, body);
        jira.addComment(issueKey, "CPS: Applied CP-DEMO v1.0.0 · labels+=governed · due+7d");
        log.info("Applied demo updates to {}", issueKey);
    }
}
