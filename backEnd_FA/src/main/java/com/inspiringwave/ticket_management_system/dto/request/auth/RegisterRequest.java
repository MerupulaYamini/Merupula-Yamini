package com.inspiringwave.ticket_management_system.dto.request.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import static com.inspiringwave.ticket_management_system.util.ValidationRegex.STRONG_PASSWORD;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class RegisterRequest {

    @NotBlank(message = "Username is required")
    private String username;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @Pattern(
            regexp = STRONG_PASSWORD,
            message = "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
    )

    @NotBlank(message = "Password is required")
    private String password;

    @NotNull(message = "Profile picture is required")
    private MultipartFile profilePicture;

    private String bio;
}
