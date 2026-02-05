package com.inspiringwave.ticket_management_system.controller;

import com.inspiringwave.ticket_management_system.dto.request.user.UpdatePasswordRequest;
import com.inspiringwave.ticket_management_system.dto.request.user.UpdateProfileRequest;
import com.inspiringwave.ticket_management_system.dto.response.common.ApiResponse;
import com.inspiringwave.ticket_management_system.dto.response.user.UserDetailsResponse;
import com.inspiringwave.ticket_management_system.service.ProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    // Get my profile (Admin/Employee)
    @GetMapping("/me")
    public ResponseEntity<UserDetailsResponse> getMyProfile() {
        return ResponseEntity.ok(profileService.getMyProfile());
    }

    // Update my profile (multipart: username/bio/profilePicture)
    @PatchMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<UserDetailsResponse> updateMyProfile(
            @Valid @ModelAttribute UpdateProfileRequest request
    ) {
        return ResponseEntity.ok(profileService.updateMyProfile(request));
    }

    // Change my password (JSON)
    @PatchMapping("/password")
    public ResponseEntity<ApiResponse> changePassword(
            @Valid @RequestBody UpdatePasswordRequest request
    ) {
        return ResponseEntity.ok(profileService.changeMyPassword(request));
    }
}
