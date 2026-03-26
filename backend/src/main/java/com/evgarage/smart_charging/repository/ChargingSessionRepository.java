package com.evgarage.smart_charging.repository;

import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.evgarage.smart_charging.model.Charger;
import com.evgarage.smart_charging.model.ChargingSession;
import org.springframework.stereotype.Repository;

@Repository

public interface ChargingSessionRepository extends JpaRepository<ChargingSession, Long> {

    long countByActiveTrue();
    boolean existsByChargerAndActiveTrue(Charger charger);

    @Query("""
        SELECT SUM(
            CASE 
                WHEN s.vehicle.maxChargeRate < s.charger.maxPower THEN s.vehicle.maxChargeRate
                ELSE s.charger.maxPower
            END
        )
        FROM ChargingSession s
        WHERE s.startTime < :end
    AND (s.endTime IS NULL OR s.endTime > :start)
    """)
    Double sumPower(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    @Query("""
        SELECT COUNT(DISTINCT s.charger.id)
        FROM ChargingSession s
        WHERE s.startTime < :end
    AND (s.endTime IS NULL OR s.endTime > :start)
    """)
    Long countBusyChargers(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
    
}