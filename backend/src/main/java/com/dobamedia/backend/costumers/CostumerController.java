package com.dobamedia.backend.costumers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/costumers")
@RequiredArgsConstructor
public class CostumerController {

    private final CostumerService costumerService;

    @PostMapping
    public Costumer addCostumer(@Valid @RequestBody DtoNewCostumer dtoNewCostumer) {
        return costumerService.addCostumer(dtoNewCostumer);
    }

    @GetMapping
    public List<Costumer> getCostumers() {
        return costumerService.getCostumers();
    }

    @GetMapping("/{id}")
    public Costumer getCostumerById(@PathVariable String id) {
        return costumerService.getCostumerById(id);
    }

    @GetMapping("/{name}")
    public Costumer getCostumerByName(@PathVariable String name) {
        return costumerService.getCostumerByName(name);
    }

    @PutMapping("/{id}")
    public Costumer updateCostumer(@PathVariable String id, @Valid @RequestBody DtoUpdateCostumer dtoUpdateCostumer) {
        return costumerService.updateCostumer(id, dtoUpdateCostumer);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable String id) {
        Costumer costumer = costumerService.getCostumerById(id);
        if (!id.equals(costumer.id())) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "The username you want to delete not found!");
        }
        costumerService.deleteCostumer(id);
    }
}
