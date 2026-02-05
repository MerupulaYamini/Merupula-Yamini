package com.inspiringwave.ticket_management_system.service;

import com.inspiringwave.ticket_management_system.dto.request.auth.LoginRequest;
import com.inspiringwave.ticket_management_system.dto.request.auth.RegisterRequest;
import com.inspiringwave.ticket_management_system.dto.response.auth.LoginResponse;
import com.inspiringwave.ticket_management_system.dto.response.auth.RegisterResponse;

public interface AuthService {

    RegisterResponse register(RegisterRequest request);

    LoginResponse login(LoginRequest request);

    void logout(String email);
}
