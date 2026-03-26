package com.evgarage.smart_charging.controller;

import com.evgarage.smart_charging.repository.ChargingSessionRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/power-and-busy")
@CrossOrigin(origins = "http://localhost:5173")
public class PowerController {

    private final ChargingSessionRepository sessionRepo;

    public PowerController(ChargingSessionRepository sessionRepo) {
        this.sessionRepo = sessionRepo;
    }

    @GetMapping
    public Map<String, Object> getPowerAndBusy() {
        Map<String, Object> map = new HashMap<>();

        List<String> timestamps = new ArrayList<>();
        List<Double> powerValues = new ArrayList<>();
        List<Long> busyChargers = new ArrayList<>();

        LocalDateTime now = LocalDateTime.now();

        for (int i = 6; i > 0; i--) {
            LocalDateTime start = now.minusHours(i);
            LocalDateTime end = now.minusHours(i - 1);

            timestamps.add(start.getHour() + ":00");

            Double power = sessionRepo.sumPower(start, end);
            Long busy = sessionRepo.countBusyChargers(start, end);

            powerValues.add(power != null ? power : 0);
            busyChargers.add(busy != null ? busy : 0);
        }

        map.put("timestamps", timestamps);
        map.put("powerValues", powerValues);
        map.put("busyChargers", busyChargers);

        return map;
    }
}