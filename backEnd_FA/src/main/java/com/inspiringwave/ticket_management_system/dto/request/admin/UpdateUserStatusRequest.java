package com.inspiringwave.ticket_management_system.dto.request.admin;

import com.inspiringwave.ticket_management_system.entity.enums.UserStatus;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserStatusRequest {
    @NotNull(message = "Status is required")
    private UserStatus status; // ACTIVE or DECLINED
}
