package com.dobamedia.backend.costumers;

public record Costumer(
        String id,
        String wooId,
        String name,
        String username,
        String email,
        String paket
) {
}
