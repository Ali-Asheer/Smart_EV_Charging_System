package com.evgarage.smart_charging.controller;

import com.evgarage.smart_charging.model.Charger;
import com.evgarage.smart_charging.model.ChargingSession;
import com.evgarage.smart_charging.service.SmartChargingService;
import com.evgarage.smart_charging.repository.ChargerRepository;
import com.evgarage.smart_charging.repository.ChargingSessionRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/schedule")
@CrossOrigin(origins = "http://localhost:5173")
public class ScheduleController {

    private final SmartChargingService smartChargingService;
    private final ChargerRepository chargerRepo;

    public ScheduleController(SmartChargingService smartChargingService,
            ChargerRepository chargerRepo,
            ChargingSessionRepository sessionRepo) {
        this.smartChargingService = smartChargingService;
        this.chargerRepo = chargerRepo;
    }

    @GetMapping("/generate")
    public ResponseEntity<List<Map<String, Object>>> generateSchedule() {
        // 1️⃣ Generate schedule
        List<ChargingSession> newSessions = smartChargingService.generateSchedule();

        // 2️⃣ Get only active sessions (ignore completed)
        List<ChargingSession> activeSessions = newSessions.stream()
                .filter(ChargingSession::isActive)
                .sorted(Comparator.comparingInt(ChargingSession::getPriority)) // ascending priority
                .collect(Collectors.toList());

        // 3️⃣ Build table data
        List<Map<String, Object>> tableData = new ArrayList<>();

        for (Charger c : chargerRepo.findAll()) {
            // Find the current active session for this charger (if any)
            Optional<ChargingSession> activeSession = activeSessions.stream()
                    .filter(s -> s.getCharger().equals(c))
                    .findFirst(); // only take the first currently active session

            Map<String, Object> row = new HashMap<>();
            row.put("charger", c.getName());

            if (activeSession.isPresent()) {
                ChargingSession s = activeSession.get();
                row.put("vehicle", s.getVehicle().getLicensePlate());
                row.put("priority", s.getPriority());
                row.put("startTime", s.getStartTime());
                row.put("endTime", s.getEndTime());
                row.put("chargeRate", Math.min(s.getVehicle().getMaxChargeRate(), s.getCharger().getMaxPower()));
                row.put("status", "Busy");

            } else {
                row.put("vehicle", null);
                row.put("priority", null);
                row.put("startTime", null);
                row.put("endTime", null);
                row.put("chargeRate", null);
                row.put("status", "Idle");
            }

            tableData.add(row);
        }

        return ResponseEntity.ok(tableData);
    }
}