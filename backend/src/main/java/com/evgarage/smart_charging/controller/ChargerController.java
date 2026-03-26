package com.evgarage.smart_charging.controller;

import com.evgarage.smart_charging.model.Charger;
import com.evgarage.smart_charging.repository.ChargerRepository;
import com.evgarage.smart_charging.service.ChargerService;
import com.evgarage.smart_charging.dto.AvailabilityUpdateRequest;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("charging_station")
@CrossOrigin(origins = "http://localhost:5173")


public class ChargerController {
    private final ChargerRepository repository;
    private final ChargerService chargerService;

public ChargerController(ChargerRepository repository,
                    ChargerService chargerService) {
    this.repository = repository;
    this.chargerService = chargerService;
}

    @GetMapping
    public List<Charger> getAllChargers() {
        return chargerService.getAllChargers();
    }

    @GetMapping("/{id}")
    public Charger getCharger(@PathVariable Long id) {
        return repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Charger not found"));
    }
    
    @PostMapping
    public Charger addCharger(@RequestBody Charger charger) {
        return chargerService.addCharger(charger);
    }

    @PutMapping("/{id}/availability")
    public Charger updateAvailability(
            @PathVariable Long id,
            @RequestBody AvailabilityUpdateRequest request) {

        return chargerService.updateAvailability(id, request.isAvailable());
    }
}