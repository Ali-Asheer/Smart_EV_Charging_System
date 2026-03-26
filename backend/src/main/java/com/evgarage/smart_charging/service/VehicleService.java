package com.evgarage.smart_charging.service;

import com.evgarage.smart_charging.model.Vehicle;
import com.evgarage.smart_charging.repository.VehicleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleService {

    private final VehicleRepository vehicleRepository;

    public VehicleService(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    public Vehicle addVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    public Vehicle updateVehicle(Vehicle vehicle) {
        if(vehicle.getId() == null) {
            throw new RuntimeException("Vehicle ID is required for update");
        }
        return vehicleRepository.save(vehicle);
    }
}
