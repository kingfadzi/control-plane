package com.example.onboarding.integrations;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.client.SimpleClientHttpRequestFactory;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

@Component
public class JiraClient {

    private static final Logger log = LoggerFactory.getLogger(JiraClient.class);


    private final RestTemplate http;

    @Value("${cps.jira.base-url:http://mars:8080}")
    private String baseUrl;

    @Value("${cps.jira.api-token:}")
    private String apiToken;

    public JiraClient() {
        this.http = new RestTemplate();
        // Minimal, dependency-free timeouts
        SimpleClientHttpRequestFactory rf = new SimpleClientHttpRequestFactory();
        rf.setConnectTimeout(Duration.ofSeconds(3));
        rf.setReadTimeout(Duration.ofSeconds(15));
        this.http.setRequestFactory(rf);
    }

    private HttpHeaders authJson() {
        HttpHeaders h = new HttpHeaders();
        h.setContentType(MediaType.APPLICATION_JSON);
        if (apiToken != null && !apiToken.isBlank()) {
            h.setBearerAuth(apiToken); // Authorization: Bearer <token>
        }
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

    /** Optional overload with icon + status niceties. */
    public void addRemoteLink(String issueKey, String title, String linkUrl, String icon16Url, String statusTitle) {
        String url = baseUrl + "/rest/api/2/issue/" + issueKey + "/remotelink";
        log.debug("Jira POST {}", url);

        Map<String, Object> icon = new HashMap<>();
        icon.put("url16x16", icon16Url);
        icon.put("title", "CPS");

        Map<String, Object> statusIcon = new HashMap<>();
        statusIcon.put("title", statusTitle);

        Map<String, Object> status = new HashMap<>();
        status.put("resolved", false);
        status.put("icon", statusIcon);

        Map<String, Object> object = new HashMap<>();
        object.put("title", title);
        object.put("url", linkUrl);
        object.put("icon", icon);
        object.put("status", status);

        Map<String, Object> body = new HashMap<>();
        body.put("object", object);
        body.put("relationship", "is required by");

        HttpEntity<Map<String, Object>> req = new HttpEntity<>(body, authJson());
        http.postForEntity(url, req, String.class);
    }
}
