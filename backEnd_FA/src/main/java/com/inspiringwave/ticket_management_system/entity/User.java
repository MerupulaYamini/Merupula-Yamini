package com.inspiringwave.ticket_management_system.entity;

import com.inspiringwave.ticket_management_system.entity.enums.UserStatus;
import jakarta.persistence.*;
import lombok.*;

import com.inspiringwave.ticket_management_system.entity.enums.Role;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // User Name
    @Column(nullable = false, length = 60)
    private String username;

    // User Email
    @Column(nullable = false, unique = true, length = 120)
    private String email;

    // Password
    @Column(nullable = false, length = 200)
    private String password;

    // image (stored as bytes)
    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(nullable = false, columnDefinition = "LONGBLOB")
    private byte[] profilePicture;

    // image name
    @Column(nullable = false)
    private String profilePictureName; // eg: profile.jpg

    // image type
    @Column(nullable = false)
    private String profilePictureType;

    // User Bio
    @Column(columnDefinition = "TEXT")
    private String bio;

    // Tells User status (Accept or Decline by Admin)
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserStatus status;

    // User Role (Admin or Employee)
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "role")
    private Role role;

    private String activeSessionId;

    private Instant createdAt;
    private Instant updatedAt;

    @PrePersist
    void onCreate() {
        this.createdAt = Instant.now();
        this.updatedAt = this.createdAt;
    }

    @PreUpdate
    void onUpdate() {
        this.updatedAt = Instant.now();
    }

}
