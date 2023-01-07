package com.dobamedia.backend.security;

public record User(
        String id,
        String username,
        String passwordBcrypt,
        String role,
        String email
) {
}
