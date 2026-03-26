package com.evgarage.smart_charging.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.evgarage.smart_charging.model.Charger;
import org.springframework.stereotype.Repository;

@Repository
public interface ChargerRepository extends JpaRepository<Charger, Long> {

}
