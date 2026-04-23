package com.bunzo.backend.dto;

import com.bunzo.backend.entity.Role;

public record AuthResponse(
        String token,
        Long userId,
        String fullName,
        String email,
        Role role
) {
}
