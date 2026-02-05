package com.inspiringwave.ticket_management_system.service.impl;

import com.inspiringwave.ticket_management_system.dto.request.auth.RegisterRequest;
import com.inspiringwave.ticket_management_system.dto.request.auth.LoginRequest;
import com.inspiringwave.ticket_management_system.dto.response.auth.RegisterResponse;
import com.inspiringwave.ticket_management_system.dto.response.auth.LoginResponse;
import com.inspiringwave.ticket_management_system.entity.User;
import com.inspiringwave.ticket_management_system.entity.enums.Role;
import com.inspiringwave.ticket_management_system.entity.enums.UserStatus;
import com.inspiringwave.ticket_management_system.exception.BadRequestException;
import com.inspiringwave.ticket_management_system.exception.UnauthorizedException;
import com.inspiringwave.ticket_management_system.mapper.AuthMapper;
import com.inspiringwave.ticket_management_system.repository.UserRepository;
import com.inspiringwave.ticket_management_system.security.jwt.JwtService;
import com.inspiringwave.ticket_management_system.service.AuthService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthMapper authMapper;

    @Override
    @Transactional
    public RegisterResponse register(RegisterRequest request) {

        // If user already exists -> reject
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already exists");
        }

        MultipartFile pic = request.getProfilePicture();
        if (pic == null || pic.isEmpty()) {
            throw new BadRequestException("Profile picture is required");
        }

        byte[] profileBytes;
        try {
            profileBytes = pic.getBytes();
        } catch (IOException e) {
            throw new BadRequestException("Unable to read profile picture");
        }

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .bio(request.getBio())
                .profilePicture(profileBytes)
                .profilePictureName(pic.getOriginalFilename())
                .profilePictureType(pic.getContentType())
                .status(UserStatus.PENDING)
                .role(Role.EMPLOYEE)
                .build();

        User saved = userRepository.save(user);

        RegisterResponse response = authMapper.toRegisterResponse(saved);
        response.setMessage("Registration successful. Waiting for admin approval.");
        return response;
    }

    @Override
    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail()).orElse(null);

        // user might have been declined & deleted
        if (user == null) {
            throw new UnauthorizedException("Invalid email or password");
        }

        // Block login if pending approval
        if (user.getStatus() == UserStatus.PENDING) {
            throw new UnauthorizedException("Your account is pending admin approval");
        }

        // Validate password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new UnauthorizedException("Invalid email or password");
        }

        // Generate token (also sets activeSessionId inside JwtService)
        String token = jwtService.generateToken(user);

        // IMPORTANT: persist the new activeSessionId
        userRepository.save(user);

        return LoginResponse.builder()
                .token(token)
                .userId(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .roles(Set.of(user.getRole()))
                .build();
    }

    @Override
    public void logout(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UnauthorizedException("User not found"));

        user.setActiveSessionId(null);
        userRepository.save(user);
    }
}
