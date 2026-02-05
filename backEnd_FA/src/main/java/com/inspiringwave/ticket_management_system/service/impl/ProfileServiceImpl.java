package com.inspiringwave.ticket_management_system.service.impl;

import com.inspiringwave.ticket_management_system.dto.request.user.UpdatePasswordRequest;
import com.inspiringwave.ticket_management_system.dto.request.user.UpdateProfileRequest;
import com.inspiringwave.ticket_management_system.dto.response.common.ApiResponse;
import com.inspiringwave.ticket_management_system.dto.response.user.UserDetailsResponse;
import com.inspiringwave.ticket_management_system.entity.User;
import com.inspiringwave.ticket_management_system.exception.BadRequestException;
import com.inspiringwave.ticket_management_system.exception.UnauthorizedException;
import com.inspiringwave.ticket_management_system.mapper.UserMapper;
import com.inspiringwave.ticket_management_system.repository.UserRepository;
import com.inspiringwave.ticket_management_system.service.ProfileService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    // Helpers
    private User getCurrentUser() {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || auth.getName() == null) {
            throw new UnauthorizedException("Unauthorized");
        }

        return userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new UnauthorizedException("User not found"));
    }

    @Override
    public UserDetailsResponse getMyProfile() {

        User user = getCurrentUser();
        return userMapper.toUserDetailsResponse(user);
    }

    @Override
    @Transactional
    public UserDetailsResponse updateMyProfile(UpdateProfileRequest request) {

        User user = getCurrentUser();

        if (request.getUsername() != null && !request.getUsername().isBlank()) {
            user.setUsername(request.getUsername());
        }

        if (request.getBio() != null) {
            user.setBio(request.getBio());
        }

        MultipartFile pic = request.getProfilePicture();
        if (pic != null && !pic.isEmpty()) {
            try {
                user.setProfilePicture(pic.getBytes());
            } catch (IOException e) {
                throw new BadRequestException("Unable to read profile picture");
            }
            user.setProfilePictureName(pic.getOriginalFilename());
            user.setProfilePictureType(pic.getContentType());
        }

        User saved = userRepository.save(user);
        return userMapper.toUserDetailsResponse(saved);
    }

    @Override
    @Transactional
    public ApiResponse changeMyPassword(UpdatePasswordRequest request) {

        User user = getCurrentUser();

        // Validate old password
        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            throw new UnauthorizedException("Old password is incorrect");
        }

        // Prevent same password reuse
        if (passwordEncoder.matches(request.getNewPassword(), user.getPassword())) {
            throw new BadRequestException("New password must be different from old password");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        // Logout all sessions (single active login feature)
        user.setActiveSessionId(null);

        userRepository.save(user);

        return ApiResponse.builder()
                .success(true)
                .message("Password updated successfully. Please login again.")
                .build();
    }
}