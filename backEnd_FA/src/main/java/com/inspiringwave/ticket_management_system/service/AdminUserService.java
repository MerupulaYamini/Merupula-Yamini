package com.inspiringwave.ticket_management_system.service;

import com.inspiringwave.ticket_management_system.dto.request.admin.UpdateUserRoleRequest;
import com.inspiringwave.ticket_management_system.dto.request.admin.UpdateUserStatusRequest;
import com.inspiringwave.ticket_management_system.dto.response.common.ApiResponse;
import com.inspiringwave.ticket_management_system.dto.response.user.UserDetailsResponse;
import com.inspiringwave.ticket_management_system.dto.response.user.UserResponse;

import java.util.List;

public interface AdminUserService {

    List<UserResponse> getAllUsers();

    List<UserResponse> getPendingUsers();

    UserDetailsResponse getUserById(Long userId);

    ApiResponse approveOrDecline(Long userId, UpdateUserStatusRequest request);

    ApiResponse deleteEmployee(Long userId);

    ApiResponse updateUserRole(Long userId, UpdateUserRoleRequest request);

}
