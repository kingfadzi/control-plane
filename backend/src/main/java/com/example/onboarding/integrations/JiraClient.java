package com.example.onboarding.integrations;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

@Component
public class JiraClient {

    private static final Logger log = LoggerFactory.getLogger(JiraClient.class);

    private final RestTemplate http;
    private final String baseUrl;
    private final String token; // read from env JIRA_TOKEN

    public JiraClient(
            @Value("${cps.jira.base-url:http://mars:8080}") String baseUrl
    ) {
        this.baseUrl = baseUrl;

        // Read JIRA token from shell env; fail fast if missing
        String envToken = System.getenv("JIRA_TOKEN");
        if (envToken == null || envToken.isBlank()) {
            throw new IllegalStateException("JIRA_TOKEN environment variable is not set");
        }
        this.token = envToken;

        this.http = new RestTemplate();
        SimpleClientHttpRequestFactory rf = new SimpleClientHttpRequestFactory();
        rf.setConnectTimeout(Duration.ofSeconds(3));
        rf.setReadTimeout(Duration.ofSeconds(15));
        this.http.setRequestFactory(rf);

        log.info("JiraClient initialized (baseUrl={}) using Bearer token from JIRA_TOKEN", this.baseUrl);
    }

    private HttpHeaders authJson() {
        HttpHeaders h = new HttpHeaders();
        h.setContentType(MediaType.APPLICATION_JSON);
        h.setBearerAuth(token); // NOTE: if you move to Jira Cloud, switch to Basic (email:apiToken)
        return h;
    }

    public void updateIssue(String issueKey, Map<String, Object> body) {
        String url = baseUrl + "/rest/api/2/issue/" + issueKey;
        log.debug("Jira PUT {}", url);
        HttpEntity<Map<String, Object>> req = new HttpEntity<>(body, authJson());
        http.exchange(url, HttpMethod.PUT, req, String.class);
    }

    public void addComment(String issueKey, String comment) {
        String url = baseUrl + "/rest/api/2/issue/" + issueKey + "/comment";
        log.debug("Jira POST {}", url);
        HttpEntity<Map<String, String>> req = new HttpEntity<>(Map.of("body", comment), authJson());
        http.postForEntity(url, req, String.class);
    }

    public ResponseEntity<String> getFields() {
        String url = baseUrl + "/rest/api/2/field";
        log.debug("Jira GET {}", url);
        HttpEntity<Void> req = new HttpEntity<>(authJson());
        return http.exchange(url, HttpMethod.GET, req, String.class);
    }

    /** Add a Remote Link to an issue (simple MVP). */
    public void addRemoteLink(String issueKey, String title, String linkUrl) {
        String url = baseUrl + "/rest/api/2/issue/" + issueKey + "/remotelink";
        log.debug("Jira POST {}", url);

        Map<String, Object> object = new HashMap<>();
        object.put("title", title);
        object.put("url", linkUrl);

        Map<String, Object> body = new HashMap<>();
        body.put("object", object);
        body.put("relationship", "is required by");

        HttpEntity<Map<String, Object>> req = new HttpEntity<>(body, authJson());
        http.postForEntity(url, req, String.class);
    }
}
