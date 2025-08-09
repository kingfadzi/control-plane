package com.example.onboarding.integrations;

import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Component
public class JiraClient {
    private final RestTemplate http = new RestTemplate();
    private final String baseUrl  = System.getenv().getOrDefault("CPS_JIRA_BASE_URL", "http://mars:8080");
    private final String apiToken = System.getenv().getOrDefault("CPS_JIRA_API_TOKEN", "");

    private HttpHeaders authJson() {
        HttpHeaders h = new HttpHeaders();
        h.setContentType(MediaType.APPLICATION_JSON);
        h.setBearerAuth(apiToken); // Authorization: Bearer <token>
        return h;
    }

    public void updateIssue(String issueKey, Map<String, Object> body) {
        HttpEntity<Map<String, Object>> req = new HttpEntity<>(body, authJson());
        String url = baseUrl + "/rest/api/2/issue/" + issueKey;
        http.exchange(url, HttpMethod.PUT, req, String.class);
    }

    public void addComment(String issueKey, String comment) {
        HttpEntity<Map<String, String>> req = new HttpEntity<>(Map.of("body", comment), authJson());
        String url = baseUrl + "/rest/api/2/issue/" + issueKey + "/comment";
        http.postForEntity(url, req, String.class);
    }

    public ResponseEntity<String> getFields() {
        HttpEntity<Void> req = new HttpEntity<>(authJson());
        String url = baseUrl + "/rest/api/2/field";
        return http.exchange(url, HttpMethod.GET, req, String.class);
    }
}
