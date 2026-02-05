package com.inspiringwave.ticket_management_system.dto.response.auth;

import com.inspiringwave.ticket_management_system.entity.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResponse {

    private String token;
    private Long userId;
    private String username;
    private String email;
    private Set<Role> roles;
}
