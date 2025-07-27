package com.example.control_plane.repo;

import com.example.control_plane.model.Wizard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WizardRepository extends JpaRepository<Wizard, String> {
}
