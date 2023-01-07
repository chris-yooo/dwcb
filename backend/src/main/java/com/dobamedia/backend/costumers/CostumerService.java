package com.dobamedia.backend.costumers;

import com.dobamedia.backend.utils.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CostumerService {

    private final CostumerRepository costumerRepository;
    private final Utils utils;

    public Costumer addCostumer(DtoNewCostumer dtoNewCostumer) {
        Costumer costumer = new Costumer(
                utils.addUUIDasString(),
                dtoNewCostumer.wooId(),
                dtoNewCostumer.name(),
                dtoNewCostumer.username(),
                dtoNewCostumer.email(),
                dtoNewCostumer.paket()
        );
        costumerRepository.save(costumer);
        return costumer;
    }

    public List<Costumer> getCostumers() {
        return costumerRepository.findAll();
    }

    public Costumer getCostumerById(String id) {
        return costumerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Costumer not found"));
    }

    public Costumer getCostumerByName(String name) {
        return (Costumer) costumerRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("Costumer not found"));
    }

    public Costumer updateCostumer(String id, DtoUpdateCostumer dtoUpdateCostumer) {
        Costumer costumer = getCostumerById(id);
        costumer = new Costumer(
                costumer.id(),
                dtoUpdateCostumer.wooId(),
                dtoUpdateCostumer.name(),
                dtoUpdateCostumer.username(),
                dtoUpdateCostumer.email(),
                dtoUpdateCostumer.paket()
        );
        return costumerRepository.save(costumer);
    }

    public void deleteCostumer(String id) {
        costumerRepository.deleteById(id);
    }
}
