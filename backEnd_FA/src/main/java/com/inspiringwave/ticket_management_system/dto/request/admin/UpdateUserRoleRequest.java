package com.inspiringwave.ticket_management_system.dto.request.admin;

import com.inspiringwave.ticket_management_system.entity.enums.Role;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class UpdateUserRoleRequest {

    @NotNull(message = "Role is required")
    private Role role; // ADMIN or EMPLOYEE
}