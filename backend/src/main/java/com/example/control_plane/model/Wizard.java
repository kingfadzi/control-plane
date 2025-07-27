package com.example.control_plane.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.UUID;

@Data
@Entity
public class Wizard {
    @Id
    private String id = UUID.randomUUID().toString();

    private String step = "email";

    private String email;
    private String address;
    private String payment;
}
