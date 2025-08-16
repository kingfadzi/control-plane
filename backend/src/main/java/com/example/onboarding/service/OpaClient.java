package com.example.onboarding.service;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class OpaClient {

    @Value("${cps.default-pack.id:DG-CAP-001}")
    private String defaultPack;

    @Value("${cps.default-pack.version:1.0.0}")
    private String defaultVersion;

    public OpaDecision evaluate(JsonNode webhookJson) {
        // MVP: return defaults. Swap to HTTP POST to OPA when ready.
        return new OpaDecision(defaultPack, defaultVersion);
    }
}
