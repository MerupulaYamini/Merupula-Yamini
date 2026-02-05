package com.inspiringwave.ticket_management_system.util;

public final class ValidationRegex {
    private ValidationRegex() {}

    // min 8, 1 uppercase, 1 lowercase, 1 number, 1 special char
    public static final String STRONG_PASSWORD =
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";
}

