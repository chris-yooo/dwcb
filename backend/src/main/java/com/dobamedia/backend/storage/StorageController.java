package com.dobamedia.backend.storage;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/storages")
@RequiredArgsConstructor
public class StorageController {

    private final StorageService storageService;

    @PostMapping
    public Storage addStorage(@Valid @RequestBody DtoNewStorage dtoNewStorage) {
        return storageService.addStorage(dtoNewStorage);
    }

    @GetMapping
    public List<Storage> getStorages() {
        return storageService.getStorages();
    }

    @GetMapping("/{id}")
    public Storage getStorageById(@PathVariable String id) {
        return storageService.getStorageById(id);
    }

    @PutMapping("/{id}")
    public Storage updateStorage(@PathVariable String id, @Valid @RequestBody DtoUpdateStorage dtoUpdateStorage) {
        return storageService.updateCostumer(id, dtoUpdateStorage);
    }

    @DeleteMapping("/{id}")
    public Storage deleteStorage(@PathVariable String id) {
        return storageService.deleteStorage(id);
    }
}
