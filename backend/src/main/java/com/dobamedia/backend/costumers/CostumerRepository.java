package com.dobamedia.backend.costumers;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CostumerRepository extends MongoRepository<Costumer, String> {
    Optional<Object> findByName(String name);
}
