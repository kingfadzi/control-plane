package com.example.onboarding.integrations;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Component
public class JiraClient {

    private final RestTemplate restTemplate = new RestTemplate();
    private final String baseUrl;
    private final String username;
    private final String token;

    public JiraClient(
            @Value("${jira.base-url}") String baseUrl,
            @Value("${jira.username}") String username
    ) {
        this.baseUrl = baseUrl;
        this.username = username;

        // Read JIRA_TOKEN from shell env at runtime
        String envToken = System.getenv("JIRA_TOKEN");
        if (envToken == null || envToken.isEmpty()) {
            throw new IllegalStateException("JIRA_TOKEN environment variable is not set");
        }
        this.token = envToken;
    }

    private HttpHeaders authHeaders() {
        String auth = username + ":" + token;
        String encoded = Base64.getEncoder()
                .encodeToString(auth.getBytes(StandardCharsets.UTF_8));

        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.AUTHORIZATION, "Basic " + encoded);
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(java.util.List.of(MediaType.APPLICATION_JSON));
        return headers;
    }

    public String get(String path) {
        HttpEntity<Void> request = new HttpEntity<>(authHeaders());
        ResponseEntity<String> response =
                restTemplate.exchange(baseUrl + path, HttpMethod.GET, request, String.class);
        return response.getBody();
    }

    public void put(String path, Object body) {
        HttpEntity<Object> request = new HttpEntity<>(body, authHeaders());
        restTemplate.exchange(baseUrl + path, HttpMethod.PUT, request, String.class);
    }

    public void post(String path, Object body) {
        HttpEntity<Object> request = new HttpEntity<>(body, authHeaders());
        restTemplate.exchange(baseUrl + path, HttpMethod.POST, request, String.class);
    }
}
