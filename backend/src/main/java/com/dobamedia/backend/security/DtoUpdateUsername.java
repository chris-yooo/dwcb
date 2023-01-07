package com.dobamedia.backend.security;

import javax.validation.constraints.NotBlank;

public record DtoUpdateUsername(
        @NotBlank String id,
        @NotBlank String username
) {
}
