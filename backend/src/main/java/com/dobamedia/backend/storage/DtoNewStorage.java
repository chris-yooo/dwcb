package com.dobamedia.backend.storage;

import javax.validation.constraints.NotBlank;

public record DtoNewStorage(
        @NotBlank
        String boxname,
        @NotBlank
        String username,
        @NotBlank
        String password,
        @NotBlank
        String link
) {
}
