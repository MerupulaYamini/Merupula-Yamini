package com.inspiringwave.ticket_management_system.dto.response.auth;

import com.inspiringwave.ticket_management_system.entity.enums.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class RegisterResponse {

    private Long id;
    private String username;
    private String email;
    private UserStatus status;
    private String message;
}
