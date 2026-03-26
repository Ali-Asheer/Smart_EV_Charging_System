package com.evgarage.smart_charging.controller;

import java.util.List;
import org.springframework.web.bind.annotation.*;
import com.evgarage.smart_charging.model.Vehicle;
import com.evgarage.smart_charging.repository.VehicleRepository;


@RestController
@RequestMapping("/vehicle")
@CrossOrigin(origins = "http://localhost:5173")
public class VehicleController {

    private final VehicleRepository repository;

    public VehicleController(VehicleRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public Vehicle addVehicle(@RequestBody Vehicle vehicle) {
        return repository.save(vehicle);
    }

    @GetMapping
    public List<Vehicle> getAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Vehicle getById(@PathVariable Long id) {
        return repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Vehicle not found"));
    }
}