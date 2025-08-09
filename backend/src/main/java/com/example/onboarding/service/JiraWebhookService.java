package com.example.onboarding.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.util.Base64;
import java.util.Map;

@Service
public class JiraWebhookService {

    private static final Logger logger = LoggerFactory.getLogger(JiraWebhookService.class);

    // TODO: Move to config or secret manager
    private static final String WEBHOOK_SECRET = "my-shared-secret";

    public void process(Map<String, String> headers, String payload) {
        if (payload == null || payload.isEmpty()) {
            throw new IllegalArgumentException("Empty webhook payload");
        }

        logger.debug("Webhook headers: {}", headers);
        logger.info("Webhook payload (truncated to 500 chars): {}",
                payload.length() > 500 ? payload.substring(0, 500) + "..." : payload);

        // --- Optional: Verify webhook signature ---
        verifySignature(headers, payload);

        // --- TODO: Parse JSON payload ---
        // Use Jackson or Gson to parse into a JiraWebhookEvent DTO
        // Example:
        // JiraWebhookEvent event = objectMapper.readValue(payload, JiraWebhookEvent.class);

        // --- TODO: Apply matching rule ---
        // if (event.issue.fields.project.key.equals("CAP") && event.issue.fields.issuetype.name.equals("Capability")) { ... }

        // --- TODO: Call Jira REST API to update the issue ---
        // Example: set Governance Summary, Governance Status, etc.

        logger.info("Processed Jira webhook successfully (no action taken in MVP stub)");
    }

    private void verifySignature(Map<String, String> headers, String payload) {
        // This is a placeholder for HMAC or other signature verification
        // Jira Cloud supports a "secret" in webhooks, but you need to validate it manually
        // For MVP, we just check for a static header match

        String providedSecret = headers.getOrDefault("X-Webhook-Secret", "");
        if (!WEBHOOK_SECRET.equals(providedSecret)) {
            throw new SecurityException("Invalid webhook secret");
        }

        logger.debug("Webhook signature validated");
    }
}
