package com.inspiringwave.ticket_management_system.dto.request.admin;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import static com.inspiringwave.ticket_management_system.util.ValidationRegex.STRONG_PASSWORD;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserPasswordRequest {

    @Pattern(
            regexp = STRONG_PASSWORD,
            message = "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
    )
    @NotBlank(message = "New password is required")
    private String newPassword;
}
