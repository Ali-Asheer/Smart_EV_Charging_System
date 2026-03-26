package com.evgarage.smart_charging.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.evgarage.smart_charging.model.Vehicle;
import org.springframework.stereotype.Repository;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
}