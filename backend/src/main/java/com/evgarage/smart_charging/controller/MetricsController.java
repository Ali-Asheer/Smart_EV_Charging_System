package com.evgarage.smart_charging.controller;

import com.evgarage.smart_charging.repository.ChargerRepository;
import com.evgarage.smart_charging.repository.VehicleRepository;
import com.evgarage.smart_charging.repository.ChargingSessionRepository;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/metrics")
@CrossOrigin(origins = "http://localhost:5173")
public class MetricsController {

    private final ChargerRepository chargerRepo;
    private final VehicleRepository vehicleRepo;
    private final ChargingSessionRepository sessionRepo;

    public MetricsController(ChargerRepository chargerRepo,
            VehicleRepository vehicleRepo,
            ChargingSessionRepository sessionRepo) {
        this.chargerRepo = chargerRepo;
        this.vehicleRepo = vehicleRepo;
        this.sessionRepo = sessionRepo;
    }

    @GetMapping
    public Map<String, Object> getMetrics() {
        Map<String, Object> metrics = new HashMap<>();

        long totalChargers = chargerRepo.count();
        long activeSessions = chargerRepo.findAll().stream()
            .filter(charger -> sessionRepo.existsByChargerAndActiveTrue(charger))
            .count()-1;
        long totalVehicles = vehicleRepo.count();

        // Total energy used: sum all sessions (optional, adjust units if needed)
        Double powerUsed = sessionRepo.findAll().stream()
                .mapToDouble(s -> s.getVehicle().getCurrentCharge()) // or sum actual session energy if available
                .sum();

        metrics.put("totalChargers", totalChargers);
        metrics.put("activeSessions", activeSessions);
        metrics.put("vehicles", totalVehicles);
        metrics.put("powerUsed", powerUsed);

        return metrics;
    }
}
