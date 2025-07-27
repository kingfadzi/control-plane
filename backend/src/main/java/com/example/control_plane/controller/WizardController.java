// src/main/java/com/example/control_plane/controller/WizardController.java
package com.example.control_plane.controller;

import com.example.control_plane.model.Wizard;
import com.example.control_plane.repo.WizardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/wizard")
@RequiredArgsConstructor
public class WizardController {
    private final WizardRepository repo;

    @PostMapping("/start")
    public String startWizard() {
        Wizard wizard = new Wizard();
        repo.save(wizard);
        return wizard.getId();
    }

    @PostMapping("/{id}/step/{step}")
    public void submitStep(@PathVariable String id, @PathVariable String step, @RequestBody Map<String, String> body) {
        Wizard wizard = repo.findById(id).orElseThrow();
        switch (step) {
            case "email" -> wizard.setEmail(body.get(step));
            case "address" -> wizard.setAddress(body.get(step));
            case "payment" -> wizard.setPayment(body.get(step));
        }
        // Update step
        switch (step) {
            case "email" -> wizard.setStep("address");
            case "address" -> wizard.setStep("payment");
            case "payment" -> wizard.setStep("complete");
        }
        repo.save(wizard);
    }

    @GetMapping("/{id}/step")
    public Map<String, String> getCurrentStep(@PathVariable String id) {
        Wizard wizard = repo.findById(id).orElseThrow();
        return Map.of("step", wizard.getStep());
    }

    @GetMapping("/{id}")
    public Wizard getFullData(@PathVariable String id) {
        return repo.findById(id).orElseThrow();
    }
}
