package com.dobamedia.backend.security;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public record DtoUpdateUser(
        @NotBlank String id,
        @NotBlank String username,
        @Email String email
) {
}
