package com.dobamedia.backend.costumers;

public record DtoUpdateCostumer(
        String wooId,
        String name,
        String username,
        String email,
        String paket
) {
}
