package com.example.onboarding.service;

import com.example.onboarding.integrations.JiraClient;
import com.example.onboarding.integrations.JiraFieldResolver;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class JiraWebhookService {

    private static final Logger log = LoggerFactory.getLogger(JiraWebhookService.class);

    private final ObjectMapper om = new ObjectMapper();
    private final JiraClient jira;
    @SuppressWarnings("unused")
    private final JiraFieldResolver fields; // kept for future use
    private final OpaClient opa;
    private final FormInstanceService forms;

    // Config from application.yml (env overrides supported)
    @Value("${cps.webhook.disable-auth:true}")
    private boolean disableAuth;

    @Value("${cps.webhook.secret:changeme}")
    private String expectedSecret;

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

        // ===== PACK FLOW ONLY (no demo field updates) =====
        log.info(">>> PACKFLOW: starting");
        applyPackFlow(issueKey, root);
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

    /** OPA -> FormInstance -> Jira Remote Link + Comment */
    private void applyPackFlow(String issueKey, JsonNode webhookJson) {
        OpaDecision d = opa.evaluate(webhookJson); // returns packId + version
        log.info("OPA decision for {} => pack={} version={}", issueKey, d.packId(), d.version());

        FormInstance fi = forms.findOrCreate(issueKey, d.packId(), d.version());
        String formUrl = forms.publicUrl(fi);

        log.info("Posting Remote Link to Jira for {} -> {}", issueKey, formUrl);
        jira.addRemoteLink(issueKey, "Complete " + d.packId() + " " + d.version(), formUrl);

        log.info("Posting comment with form URL to {}", issueKey);
        jira.addComment(issueKey, "CPS: Please complete the questionnaire → " + formUrl);

        log.info("Posted form link for {}: {}", issueKey, formUrl);
    }
}
