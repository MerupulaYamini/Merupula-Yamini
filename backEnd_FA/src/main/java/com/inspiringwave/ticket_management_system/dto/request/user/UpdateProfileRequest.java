package com.inspiringwave.ticket_management_system.dto.request.user;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateProfileRequest {

    @Size(max = 100, message = "Username cannot exceed 100 characters")
    private String username;

    @Size(max = 500, message = "Bio cannot exceed 500 characters")
    private String bio;

    // Optional display picture update (image only)
    private MultipartFile profilePicture;
}
