package com.inspiringwave.ticket_management_system.dto.response.user;

import com.inspiringwave.ticket_management_system.entity.enums.Role;
import com.inspiringwave.ticket_management_system.entity.enums.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDetailsResponse {

    private Long id;

    private String username;

    private String email;

    private String bio;

    private UserStatus status;

    private Set<Role> roles;

    private Instant createdAt;
}