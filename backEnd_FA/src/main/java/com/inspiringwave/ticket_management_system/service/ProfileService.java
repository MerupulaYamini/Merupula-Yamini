package com.inspiringwave.ticket_management_system.service;

import com.inspiringwave.ticket_management_system.dto.request.user.UpdatePasswordRequest;
import com.inspiringwave.ticket_management_system.dto.request.user.UpdateProfileRequest;
import com.inspiringwave.ticket_management_system.dto.response.common.ApiResponse;
import com.inspiringwave.ticket_management_system.dto.response.user.UserDetailsResponse;

public interface ProfileService {
    // Get logged-in user's profile
    UserDetailsResponse getMyProfile();

    // Update logged-in user's profile (username, bio, picture)
    UserDetailsResponse updateMyProfile(UpdateProfileRequest request);

    // Change logged-in user's password
    ApiResponse changeMyPassword(UpdatePasswordRequest request);

}
