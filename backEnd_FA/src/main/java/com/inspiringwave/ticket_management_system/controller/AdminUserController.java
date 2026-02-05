package com.inspiringwave.ticket_management_system.controller;

import com.inspiringwave.ticket_management_system.dto.request.admin.UpdateUserRoleRequest;
import com.inspiringwave.ticket_management_system.dto.request.admin.UpdateUserStatusRequest;
import com.inspiringwave.ticket_management_system.dto.response.common.ApiResponse;
import com.inspiringwave.ticket_management_system.dto.response.user.UserDetailsResponse;
import com.inspiringwave.ticket_management_system.dto.response.user.UserResponse;
import com.inspiringwave.ticket_management_system.service.AdminUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/users")
@RequiredArgsConstructor
public class AdminUserController {

    private final AdminUserService adminUserService;

    // All users
    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        return ResponseEntity.ok(adminUserService.getAllUsers());
    }

    // Pending users only (for approval screen)
    @GetMapping("/pending")
    public ResponseEntity<List<UserResponse>> getPendingUsers() {
        return ResponseEntity.ok(adminUserService.getPendingUsers());
    }

    // User details
    @GetMapping("/{userId}")
    public ResponseEntity<UserDetailsResponse> getUserById(@PathVariable Long userId) {
        return ResponseEntity.ok(adminUserService.getUserById(userId));
    }

    // Approve / Decline registration
    @PatchMapping("/{userId}/status")
    public ResponseEntity<ApiResponse> approveOrDecline(
            @PathVariable Long userId,
            @Valid @RequestBody UpdateUserStatusRequest request
    ) {
        return ResponseEntity.ok(adminUserService.approveOrDecline(userId, request));
    }
    // employee -> admin (admin only can change it because /admin/**)
    @PatchMapping("/{userId}/role")
    public ResponseEntity<ApiResponse> updateUserRole(
            @PathVariable Long userId,
            @Valid @RequestBody UpdateUserRoleRequest request
    ) {
        return ResponseEntity.ok(adminUserService.updateUserRole(userId, request));
    }

    // Delete employee (existing employee removal)
    @DeleteMapping("/{userId}")
    public ResponseEntity<ApiResponse> deleteEmployee(@PathVariable Long userId) {
        return ResponseEntity.ok(adminUserService.deleteEmployee(userId));
    }
}