package com.example.onboarding.service;

import com.example.onboarding.integrations.JiraClient;
import com.example.onboarding.integrations.JiraFieldResolver;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger; import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class JiraWebhookService {
    private static final Logger log = LoggerFactory.getLogger(JiraWebhookService.class);
    private final ObjectMapper om = new ObjectMapper();
    private final JiraClient jira;
    private final JiraFieldResolver fields;

    // Display names for your custom fields (override via env if different)
    private final String F_GOV_SUMMARY = System.getenv().getOrDefault("CPS_FIELD_GOV_SUMMARY", "Governance Summary");
    private final String F_GOV_STATUS  = System.getenv().getOrDefault("CPS_FIELD_GOV_STATUS",  "Governance Status");
    private final String F_NOTES       = System.getenv().getOrDefault("CPS_FIELD_NOTES",       "Control Pack Notes");

    public JiraWebhookService(JiraClient jira, JiraFieldResolver fields) {
        this.jira = jira;
        this.fields = fields;
    }

    public void process(Map<String, String> headers, String payload) throws Exception {
        if (payload == null || payload.isEmpty()) throw new IllegalArgumentException("Empty webhook payload");

        JsonNode root = om.readTree(payload);
        String event = root.path("webhookEvent").asText("");
        String issueKey = root.path("issue").path("key").asText("");
        String issueType = root.path("issue").path("fields").path("issuetype").path("name").asText("");
        String projectKey = root.path("issue").path("fields").path("project").path("key").asText("");

        if (issueKey.isEmpty()) throw new IllegalArgumentException("No issue key");
        log.info("Event={} issue={} type={} project={}", event, issueKey, issueType, projectKey);

        // MVP: apply to any created issue (tighten with conditions if you want)
        applyDemoPack(issueKey);
    }

    private void applyDemoPack(String issueKey) {
        // Resolve custom field IDs (returns null if not found)
        String cfSummary = fields.idFor(F_GOV_SUMMARY);
        String cfStatus  = fields.idFor(F_GOV_STATUS);
        String cfNotes   = fields.idFor(F_NOTES);

        // Build mutable maps
        Map<String, Object> update = new HashMap<>();
        update.put("labels", List.of(Map.of("add", "governed")));

        Map<String, Object> fieldSet = new HashMap<>();
        fieldSet.put("duedate", LocalDate.now().plusDays(7).toString());
        if (cfSummary != null) fieldSet.put(cfSummary, "Control Pack Demo applied");
        if (cfStatus  != null) fieldSet.put(cfStatus, Map.of("value", "In Progress"));
        if (cfNotes   != null) fieldSet.put(cfNotes,  "Auto-set by CPS");

        Map<String, Object> body = new HashMap<>();
        body.put("update", update);
        body.put("fields", fieldSet);

        jira.updateIssue(issueKey, body);
        jira.addComment(issueKey, "CPS: Applied CP-DEMO v1.0.0 · labels+=governed · due+7d");
        log.info("Applied demo updates to {}", issueKey);
    }
}
