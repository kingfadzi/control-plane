package com.example.onboarding.service;

import com.example.onboarding.integrations.JiraClient;
import com.example.onboarding.integrations.JiraFieldResolver;
import com.example.onboarding.opa.OpaClient;
import com.example.onboarding.opa.OpaModels.OpaInput;
import com.example.onboarding.opa.OpaModels.OpaRequest;
import com.example.onboarding.opa.OpaModels.OpaResponse;
import com.example.onboarding.opa.OpaModels.OpaResult;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

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

    // Risk story settings
    @Value("${cps.risk.issue-type:Story}")
    private String riskIssueType; // e.g., "Risk" if you have a custom type

    @Value("${cps.risk.labels:governance,constraint,risk}")
    private String riskLabelsCsv; // comma-separated

    // Questionnaire task settings
    @Value("${cps.task.issue-type:Sub-task}")
    private String questionnaireIssueType; // usually "Sub-task"

    @Value("${cps.questionnaire.labels:governance,questionnaire}")
    private String questionnaireLabelsCsv; // comma-separated

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
        if (projectKey == null || projectKey.isBlank()) throw new IllegalArgumentException("No project key in payload");

        log.info("Event={} issue={} type={} project={}", event, issueKey, issueType, projectKey);

        // ===== POLICY FLOW (OPA-driven) =====
        log.info(">>> POLICY: starting");
        applyPolicyFlow(issueKey, projectKey, root);
        log.info(">>> POLICY: done");
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
     * OPA decision → for each recommended domain:
     * - Create Risk story (blocks parent)
     * - If questionnaire_required: create Sub-task under parent with form link (for the app owner)
     * - Link Sub-task ↔ Risk with "relates to"
     * - Leave a single consolidated parent comment summarizing created items
     */
    private void applyPolicyFlow(String parentIssueKey, String projectKey, JsonNode webhookJson) {
        // 1) Build OPA input exactly as required
        OpaInput in = new OpaInput();
        in.criticality     = textAt(webhookJson, "issue.fields.criticality");
        in.security        = textAt(webhookJson, "issue.fields.security");
        in.integrity       = textAt(webhookJson, "issue.fields.integrity");
        in.availability    = textAt(webhookJson, "issue.fields.availability");
        in.resilience      = textAt(webhookJson, "issue.fields.resilience");
        in.confidentiality = textAt(webhookJson, "issue.fields.confidentiality");
        in.hasDependencies = boolAt(webhookJson, "issue.fields.has_dependencies");

        // 2) Evaluate policy (no fallbacks)
        OpaResponse resp = opa.evaluate(new OpaRequest(in));
        if (resp == null || resp.result == null) {
            log.warn("OPA decision unavailable for {}", parentIssueKey);
            return;
        }
        OpaResult r = resp.result;

        log.info("OPA decision for {} => review_mode={} assessment_required={} mandatory={} questionnaire_required={} attestation_required={} domains={}",
                parentIssueKey, r.reviewMode, r.assessmentRequired, r.assessmentMandatory,
                r.questionnaireRequired, r.attestationRequired, safeList(r.arbDomains));

        List<String> domains = safeList(r.arbDomains);
        if (domains.isEmpty()) {
            log.info("No domains returned by OPA for {}. Skipping domain-scoped actions.", parentIssueKey);
            return;
        }

        boolean needsConstraint = Boolean.TRUE.equals(r.assessmentRequired) || Boolean.TRUE.equals(r.attestationRequired);

        // Collect summary lines to reduce noise
        List<String> summaryLines = new ArrayList<>();

        for (String domain : domains) {
            String domainSlug = domain.toLowerCase(Locale.ROOT).replace(' ', '-'); // e.g., "service-transition"
            String packId = domainToPackId(domain);
            String packVersion = "v1";

            // ---- 2a) Create domain risk (blocks parent) ----
            String riskIssueKey = null;
            if (needsConstraint) {
                List<String> riskLabels = new ArrayList<>();
                riskLabels.addAll(splitCsv(riskLabelsCsv));
                riskLabels.add(domainSlug);

                String riskSummary = "[Risk][" + domain + "] " + parentIssueKey + " · " + compact(r.reviewMode);
                String triggers = (r.firedRules != null && !r.firedRules.isEmpty())
                        ? String.join("; ", r.firedRules)
                        : "N/A";

                StringBuilder desc = new StringBuilder();
                desc.append("Decision\n");
                desc.append("- Domain: ").append(domain).append("\n");
                desc.append("- Review mode: ").append(nvl(r.reviewMode, "N/A")).append("\n");
                desc.append("- Assessment required: ").append(boolWord(r.assessmentRequired)).append("\n");
                desc.append("- Mandatory: ").append(boolWord(r.assessmentMandatory)).append("\n");
                desc.append("- Attestation required: ").append(boolWord(r.attestationRequired)).append("\n");
                desc.append("- Triggers: ").append(triggers).append("\n\n");
                desc.append("Notes\n");
                desc.append("- This risk blocks ").append(parentIssueKey).append(".\n");
                desc.append("- The questionnaire task (if required) will be created under ").append(parentIssueKey).append(" for the application owner.\n");

                try {
                    riskIssueKey = jira.createIssue(projectKey, riskIssueType, riskSummary, desc.toString(), riskLabels);
                    jira.linkIssuesBlocks(riskIssueKey, parentIssueKey);
                    summaryLines.add("[" + domain + "] Risk: " + riskIssueKey + " (blocks " + parentIssueKey + ")");
                } catch (Exception e) {
                    log.warn("Failed to create/link risk for domain {} (parent {}): {}", domain, parentIssueKey, e.toString());
                    summaryLines.add("[" + domain + "] Risk: creation failed (" + e.getClass().getSimpleName() + ")");
                }
            }

            // ---- 2b) Create domain questionnaire task (Sub-task) under parent, with form link ----
            if (Boolean.TRUE.equals(r.questionnaireRequired)) {
                try {
                    // form instance & public URL
                    FormInstance fi = forms.findOrCreate(parentIssueKey, packId, packVersion);
                    String formUrl = forms.publicUrl(fi);

                    List<String> taskLabels = new ArrayList<>();
                    taskLabels.addAll(splitCsv(questionnaireLabelsCsv));
                    taskLabels.add(domainSlug);

                    String taskSummary = "[Questionnaire][" + domain + "] Respond to risk " +
                            (riskIssueKey != null ? riskIssueKey : "in " + domain) ;
                    StringBuilder taskDesc = new StringBuilder();
                    taskDesc.append("You are required to complete the ").append(domain).append(" questionnaire in response to the risk raised.\n\n");
                    taskDesc.append("Form: ").append(formUrl).append("\n");
                    if (riskIssueKey != null) {
                        taskDesc.append("Related risk: ").append(riskIssueKey).append("\n");
                    }
                    taskDesc.append("\nAcceptance criteria\n");
                    taskDesc.append("- Questionnaire submitted\n");
                    taskDesc.append("- Questions answered accurately and completely\n");

                    String taskKey = jira.createSubtask(
                            projectKey,
                            parentIssueKey,
                            questionnaireIssueType,  // usually "Sub-task"
                            taskSummary,
                            taskDesc.toString(),
                            taskLabels
                    );

                    // Link to the form on the Sub-task (for the app owner)
                    jira.addRemoteLink(taskKey, "Complete " + domain + " questionnaire", formUrl);

                    // Relate the Sub-task to the Risk (for traceability across personas)
                    if (riskIssueKey != null) {
                        jira.linkIssuesRelates(taskKey, riskIssueKey);
                    }

                    summaryLines.add("[" + domain + "] Questionnaire: " + taskKey + " (sub-task under " + parentIssueKey + ")");
                } catch (Exception e) {
                    log.warn("Failed to create questionnaire sub-task for domain {} (parent {}): {}", domain, parentIssueKey, e.toString());
                    summaryLines.add("[" + domain + "] Questionnaire: creation failed (" + e.getClass().getSimpleName() + ")");
                }
            }
        }

        // ---- 3) Single consolidated parent comment ----
        if (!summaryLines.isEmpty()) {
            String summary = "Governance actions created:\n" + summaryLines.stream()
                    .map(s -> "- " + s)
                    .collect(Collectors.joining("\n"));
            jira.addComment(parentIssueKey, summary);
        }
    }

    // ---------- helpers ----------

    private static String textAt(JsonNode root, String dottedPath) {
        JsonNode node = walk(root, dottedPath);
        return node != null && !node.isMissingNode() && !node.isNull() ? node.asText() : null;
    }

    private static Boolean boolAt(JsonNode root, String dottedPath) {
        JsonNode node = walk(root, dottedPath);
        return node != null && !node.isMissingNode() && !node.isNull() ? node.asBoolean() : null;
    }

    private static JsonNode walk(JsonNode root, String dottedPath) {
        JsonNode cur = root;
        for (String part : dottedPath.split("\\.")) {
            if (cur == null) return null;
            cur = cur.path(part);
        }
        return cur;
    }

    private static String nvl(String v, String dflt) {
        return (v == null || v.isBlank()) ? dflt : v;
    }

    private static String compact(String s) {
        if (s == null) return null;
        return s.replaceAll("\\s+", " ").trim();
    }

    private static List<String> safeList(List<String> v) {
        return v == null ? Collections.emptyList() : v;
    }

    private static String boolWord(Boolean b) {
        if (b == null) return "N/A";
        return b ? "Yes" : "No";
    }

    private static List<String> splitCsv(String csv) {
        if (csv == null || csv.isBlank()) return Collections.emptyList();
        return Arrays.stream(csv.split("\\s*,\\s*"))
                .filter(s -> !s.isBlank())
                .collect(Collectors.toList());
    }

    private static String domainToPackId(String domain) {
        switch (domain) {
            case "EA": return "ea-governance";
            case "Security": return "security-governance";
            case "Data": return "data-governance";
            case "Service Transition": return "service-transition";
            default:
                return domain.toLowerCase(Locale.ROOT).replace(' ', '-');
        }
    }
}
