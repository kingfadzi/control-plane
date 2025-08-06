package com.example.onboarding.controller;

import com.example.onboarding.model.AppMetadataResponse;
import com.example.onboarding.service.ApplicationMetadataService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/applications")
public class ApplicationController {

    private final ApplicationMetadataService service;

    public ApplicationController(ApplicationMetadataService service) {
        this.service = service;
    }

    @GetMapping("/{appId}")
    public ResponseEntity<AppMetadataResponse> getApplicationDetails(@PathVariable String appId) {
        var response = service.getFullAppMetadata(appId);
        return response != null ? ResponseEntity.ok(response) : ResponseEntity.notFound().build();
    }
}
