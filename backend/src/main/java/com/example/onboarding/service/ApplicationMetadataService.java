package com.example.onboarding.service;

import com.example.onboarding.model.AppMetadataResponse;
import com.example.onboarding.model.ApplicationMetadata;
import com.example.onboarding.repository.ApplicationMetadataRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ApplicationMetadataService {

    private final ApplicationMetadataRepository repo;

    public ApplicationMetadataService(ApplicationMetadataRepository repo) {
        this.repo = repo;
    }

    // Used if you want raw entity
    public Optional<ApplicationMetadata> findByAppId(String appId) {
        return repo.findByAppId(appId);
    }

    // Used for frontend response format
    public AppMetadataResponse getFullAppMetadata(String appId) {
        return repo.findByAppId(appId)
                .map(app -> {
                    List<AppMetadataResponse.AppComponent> children = repo.findChildren(appId)
                            .stream()
                            .map(child -> new AppMetadataResponse.AppComponent(child.getAppName(), child.getAppId()))
                            .collect(Collectors.toList());

                    return new AppMetadataResponse(app, children);
                })
                .orElse(null);
    }
}
