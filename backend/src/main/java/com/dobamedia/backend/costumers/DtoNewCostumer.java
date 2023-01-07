package com.dobamedia.backend.costumers;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public record DtoNewCostumer(
        @NotBlank
        String wooId,
        @NotBlank
        String name,
        @NotBlank
        String username,
        @Email
        String email,
        @NotBlank
        String paket
) {
}
