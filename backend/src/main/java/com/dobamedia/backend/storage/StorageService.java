package com.dobamedia.backend.storage;

import com.dobamedia.backend.utils.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StorageService {

    private final StorageRepository storageRepository;
    private final Utils utils;

    public Storage addStorage(DtoNewStorage dtoNewStorage) {
        Storage storage = new Storage(
                utils.addUUIDasString(),
                dtoNewStorage.boxname(),
                dtoNewStorage.username(),
                dtoNewStorage.password(),
                dtoNewStorage.link()
        );
        storageRepository.save(storage);
        return storage;
    }

    public List<Storage> getStorages() {
        return storageRepository.findAll();
    }

    public Storage updateCostumer(String id, DtoUpdateStorage dtoUpdateStorage) {
        Storage storage = getStorageById(id);
        storage = new Storage(
                storage.id(),
                dtoUpdateStorage.boxname(),
                dtoUpdateStorage.username(),
                dtoUpdateStorage.password(),
                dtoUpdateStorage.link()
        );
        return storageRepository.save(storage);
    }

    public Storage getStorageById(String id) {
        return storageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Storage not found"));
    }

    public Storage deleteStorage(String id) {
        Storage storage = getStorageById(id);
        if (!id.equals(storage.id())) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "The storage you want to delete not found!");
        }
        storageRepository.deleteById(id);
        return storage;
    }
}
