package com.example.onboarding.service;

import com.example.onboarding.integrations.JiraClient;
import com.example.onboarding.integrations.JiraFieldResolver;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class JiraWebhookService {

    private static final Logger log = LoggerFactory.getLogger(JiraWebhookService.class);

    private final ObjectMapper om = new ObjectMapper();
    private final JiraClient jira;
    private final JiraFieldResolver fields;

    // Toggle webhook auth (disabled by default for MVP)
    private final boolean disableAuth =
            Boolean.parseBoolean(System.getenv().getOrDefault("CPS_DISABLE_WEBHOOK_AUTH", "true"));

    // Optional: expected secret if/when you re-enable auth
    private final String expectedSecret = System.getenv().getOrDefault("CPS_WEBHOOK_SECRET", "changeme");

    // Display names for your custom fields (override via env if different)
    private final String F_GOV_SUMMARY = System.getenv().getOrDefault("CPS_FIELD_GOV_SUMMARY", "Governance Summary");
    private final String F_GOV_STATUS  = System.getenv().getOrDefault("CPS_FIELD_GOV_STATUS",  "Governance Status");
    private final String F_NOTES       = System.getenv().getOrDefault("CPS_FIELD_NOTES",       "Control Pack Notes");

    public JiraWebhookService(JiraClient jira, JiraFieldResolver fields) {
        this.jira = jira;
        this.fields = fields;
    }

    /** Entry point from controller */
    public void process(Map<String, String> headers, String payload) throws Exception {
        if (payload == null || payload.isEmpty()) {
            throw new IllegalArgumentException("Empty webhook payload");
        }

        // Auth check (no-op by default)
        verifyWebhook(headers);

        // Parse payload
        JsonNode root = om.readTree(payload);
        String event = root.path("webhookEvent").asText("");
        String issueKey = root.path("issue").path("key").asText("");
        String issueType = root.path("issue").path("fields").path("issuetype").path("name").asText("");
        String projectKey = root.path("issue").path("fields").path("project").path("key").asText("");

        if (issueKey.isEmpty()) {
            throw new IllegalArgumentException("No issue key in payload");
        }

        log.info("Event={} issue={} type={} project={}", event, issueKey, issueType, projectKey);

        // MVP: apply to any event hitting this endpoint
        applyDemoPack(issueKey);
    }

    /** Toggleable auth (disabled by default) */
    private void verifyWebhook(Map<String, String> headers) {
        if (disableAuth) {
            log.debug("Webhook auth disabled (CPS_DISABLE_WEBHOOK_AUTH=true)");
            return;
        }
        // Example header-based check if you enable later (via proxy or Jira Cloud secret)
        String provided = headers.getOrDefault("X-Webhook-Secret", "");
        if (!expectedSecret.equals(provided)) {
            throw new SecurityException("Invalid webhook secret");
        }
        log.debug("Webhook auth passed");
    }

    /** MVP action: set fields, add label, add comment */
    private void applyDemoPack(String issueKey) {
        // Resolve custom field IDs (returns null if not found)
        String cfSummary = fields.idFor(F_GOV_SUMMARY); // e.g., "customfield_12345"
        String cfStatus  = fields.idFor(F_GOV_STATUS);
        String cfNotes   = fields.idFor(F_NOTES);

        // Prepare updates
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

        // Apply via Jira API
        jira.updateIssue(issueKey, body);
        jira.addComment(issueKey, "CPS: Applied CP-DEMO v1.0.0 · labels+=governed · due+7d");

        log.info("Applied demo updates to {}", issueKey);
    }
}
