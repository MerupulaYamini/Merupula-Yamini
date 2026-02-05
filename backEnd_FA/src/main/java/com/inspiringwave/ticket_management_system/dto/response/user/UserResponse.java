package com.inspiringwave.ticket_management_system.dto.response.user;

import com.inspiringwave.ticket_management_system.entity.enums.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {

    private Long id;
    private String username;
    private String email;
    private UserStatus status;
}
