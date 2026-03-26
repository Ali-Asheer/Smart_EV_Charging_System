package com.evgarage.smart_charging.service;

import com.evgarage.smart_charging.model.Vehicle;
import com.evgarage.smart_charging.model.Charger;
import com.evgarage.smart_charging.model.ChargingSession;
import com.evgarage.smart_charging.repository.VehicleRepository;
import com.evgarage.smart_charging.repository.ChargerRepository;
import com.evgarage.smart_charging.repository.ChargingSessionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SmartChargingService {

    private static final Logger log = LoggerFactory.getLogger(SmartChargingService.class);

    private final VehicleRepository vehicleRepo;
    private final ChargerRepository chargerRepo;
    private final ChargingSessionRepository sessionRepo;

    public SmartChargingService(VehicleRepository vehicleRepo,
                                ChargerRepository chargerRepo,
                                ChargingSessionRepository sessionRepo) {
        this.vehicleRepo = vehicleRepo;
        this.chargerRepo = chargerRepo;
        this.sessionRepo = sessionRepo;
    }

    public List<ChargingSession> generateSchedule() {
        log.info("=== Smart generateSchedule called ===");

        List<Vehicle> vehicles = vehicleRepo.findAll();
        List<Charger> chargers = chargerRepo.findAll();

        // Sort vehicles by ascending priority (1 → 2 → 3)
        vehicles.sort(
        Comparator.comparingInt(Vehicle::getPriority)
            .thenComparingDouble(Vehicle::getCurrentCharge)
);

        // Track when each charger becomes free
        Map<Charger, LocalDateTime> chargerAvailableAt = new HashMap<>();
        for (Charger c : chargers) {
            if (c.isAvailable()) {
                chargerAvailableAt.put(c, LocalDateTime.now());
            }
        }

        List<ChargingSession> sessions = new ArrayList<>();

        for (Vehicle v : vehicles) {
            if (chargerAvailableAt.isEmpty()) {
                log.info("No available chargers left for remaining vehicles.");
                break;
            }

            // Pick the charger that becomes free the earliest
            Charger selectedCharger = Collections.min(chargerAvailableAt.entrySet(),
                    Comparator.comparing(Map.Entry::getValue)).getKey();
            LocalDateTime startTime = chargerAvailableAt.get(selectedCharger);

            double remainingCharge = v.getBatteryCapacity() - v.getCurrentCharge();
            double chargeRate = Math.min(v.getMaxChargeRate(), selectedCharger.getMaxPower());

            ChargingSession session = new ChargingSession();
            session.setVehicle(v);
            session.setCharger(selectedCharger);
            session.setPriority(v.getPriority());
            session.setActive(true);
            session.setStartTime(startTime);

            if (chargeRate > 0 && remainingCharge > 0) {
                double hoursToFull = remainingCharge / chargeRate;
                LocalDateTime endTime = startTime.plusMinutes((long) (hoursToFull * 60));
                session.setEndTime(endTime);
                // Update charger availability
                chargerAvailableAt.put(selectedCharger, endTime);

                log.debug("Vehicle [{}] scheduled on Charger [{}]. Start: {} | End: {} | ChargeRate: {} kW",
                        v.getLicensePlate(), selectedCharger.getName(), startTime, endTime, chargeRate);
            } else {
                session.setEndTime(startTime);
                log.warn("Vehicle [{}] has zero charge rate or is already full.", v.getLicensePlate());
            }

            sessions.add(session);
        }

        // Save all sessions
        sessionRepo.saveAll(sessions);
        log.info("=== Smart scheduling complete. Total sessions created: {} ===", sessions.size());

        return sessions;
    }
}