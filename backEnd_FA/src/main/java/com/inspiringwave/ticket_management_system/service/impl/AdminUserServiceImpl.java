package com.inspiringwave.ticket_management_system.service.impl;

import com.inspiringwave.ticket_management_system.dto.request.admin.UpdateUserRoleRequest;
import com.inspiringwave.ticket_management_system.dto.request.admin.UpdateUserStatusRequest;
import com.inspiringwave.ticket_management_system.dto.response.common.ApiResponse;
import com.inspiringwave.ticket_management_system.dto.response.user.UserDetailsResponse;
import com.inspiringwave.ticket_management_system.dto.response.user.UserResponse;
import com.inspiringwave.ticket_management_system.entity.User;
import com.inspiringwave.ticket_management_system.entity.enums.Role;
import com.inspiringwave.ticket_management_system.entity.enums.UserStatus;
import com.inspiringwave.ticket_management_system.exception.BadRequestException;
import com.inspiringwave.ticket_management_system.exception.ResourceNotFoundException;
import com.inspiringwave.ticket_management_system.mapper.UserMapper;
import com.inspiringwave.ticket_management_system.repository.UserRepository;
import com.inspiringwave.ticket_management_system.service.AdminUserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AdminUserServiceImpl implements AdminUserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(userMapper::toUserResponse)
                .toList();
    }

    @Override
    public List<UserResponse> getPendingUsers() {
        return userRepository.findAllByStatus(UserStatus.PENDING)
                .stream()
                .map(userMapper::toUserResponse)
                .toList();
    }

    @Override
    public UserDetailsResponse getUserById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userId));
        return userMapper.toUserDetailsResponse(user);
    }


    @Override
    @Transactional
    public ApiResponse approveOrDecline(Long userId, UpdateUserStatusRequest request) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userId));

        UserStatus status = request.getStatus();
        if (status == null) {
            throw new BadRequestException("Status is required");
        }

        // Only PENDING users can be approved/declined
        if (user.getStatus() != UserStatus.PENDING) {
            throw new BadRequestException("Only PENDING users can be approved/declined");
        }

        // DECLINE = delete user fully (no rejected table)
        if (status == UserStatus.DECLINED) {
            userRepository.delete(user);

            return ApiResponse.builder()
                    .success(true)
                    .message("Registration rejected. The user account has been removed and can register again.")
                    .build();
        }

        // APPROVE
        if (status == UserStatus.ACTIVE) {
            user.setStatus(UserStatus.ACTIVE);
            userRepository.save(user);

            return ApiResponse.builder()
                    .success(true)
                    .message("User approved successfully")
                    .build();
        }

        throw new BadRequestException("Invalid status for approval flow. Use ACTIVE or DECLINED.");
    }


    @Override
    @Transactional
    public ApiResponse updateUserRole(Long userId, UpdateUserRoleRequest request) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userId));

        if (request.getRole() == null) {
            throw new BadRequestException("Role is required");
        }

        // Only allow role changes for ACTIVE accounts
        if (user.getStatus() != UserStatus.ACTIVE) {
            throw new BadRequestException("User must be ACTIVE to change role");
        }

        // Only allow promotion to ADMIN
        if (request.getRole() != Role.ADMIN) {
            throw new BadRequestException("Only promotion to ADMIN is allowed");
        }

        // Already admin
        if (user.getRoles() != null && user.getRoles().contains(Role.ADMIN)) {
            return ApiResponse.builder()
                    .success(true)
                    .message("User is already an ADMIN")
                    .build();
        }

        // Keep EMPLOYEE role as well (recommended)
        user.setRoles(new HashSet<>(Set.of(Role.ADMIN, Role.EMPLOYEE)));
        userRepository.save(user);

        return ApiResponse.builder()
                .success(true)
                .message("User promoted to ADMIN successfully")
                .build();
    }

    @Override
    public ApiResponse deleteEmployee(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userId));

        // Only Employees can be removed
        boolean isEmployeeOnly = user.getRoles() != null
                && user.getRoles().contains(Role.EMPLOYEE)
                && !user.getRoles().contains(Role.ADMIN);

        if (!isEmployeeOnly) {
            throw new BadRequestException("Only employees can be removed");
        }

        userRepository.delete(user);

        return ApiResponse.builder()
                .success(true)
                .message("Employee removed successfully")
                .build();
    }
}
