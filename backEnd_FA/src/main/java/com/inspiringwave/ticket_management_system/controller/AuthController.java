package com.inspiringwave.ticket_management_system.controller;

import com.inspiringwave.ticket_management_system.dto.request.auth.LoginRequest;
import com.inspiringwave.ticket_management_system.dto.request.auth.RegisterRequest;
import com.inspiringwave.ticket_management_system.dto.response.auth.LoginResponse;
import com.inspiringwave.ticket_management_system.dto.response.auth.RegisterResponse;
import com.inspiringwave.ticket_management_system.dto.response.common.ApiResponse;
import com.inspiringwave.ticket_management_system.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    // Register must be multipart/form-data because it has MultipartFile
    @PostMapping(value = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<RegisterResponse> register(@Valid @ModelAttribute RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    // Login is JSON
    @PostMapping(value = "/login", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    // Logout requires token (authenticated)
    @PostMapping("/logout")
    public ResponseEntity<ApiResponse> logout(Authentication authentication) {

        // email stored as username in Spring Security
        String email = authentication.getName();

        authService.logout(email);

        return ResponseEntity.ok(
                ApiResponse.builder()
                        .success(true)
                        .message("Logged out successfully")
                        .build()
        );
    }
}