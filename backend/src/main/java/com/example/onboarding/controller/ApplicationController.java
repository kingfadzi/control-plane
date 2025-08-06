package com.example.onboarding.controller;

import com.example.onboarding.model.AppMetadataResponse;
import com.example.onboarding.service.ApplicationMetadataService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/applications")
public class ApplicationController {

    private static final Logger logger = LoggerFactory.getLogger(ApplicationController.class);

    private final ApplicationMetadataService service;

    public ApplicationController(ApplicationMetadataService service) {
        this.service = service;
    }

    @GetMapping("/{appId}")
    public ResponseEntity<AppMetadataResponse> getApplicationDetails(@PathVariable String appId) {
        logger.info("Received GET request for /applications/{}", appId);

        AppMetadataResponse response = null;
        try {
            response = service.getFullAppMetadata(appId);
            if (response != null) {
                logger.info("Found metadata for appId={}: {}", appId, response);
                return ResponseEntity.ok(response);
            } else {
                logger.warn("No metadata found for appId={}", appId);
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            logger.error("Error while fetching metadata for appId={}", appId, e);
            return ResponseEntity.internalServerError().build();
        }
    }
}
