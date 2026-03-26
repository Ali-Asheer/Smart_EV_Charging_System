package com.evgarage.smart_charging.service;

import com.evgarage.smart_charging.model.Charger;
import com.evgarage.smart_charging.repository.ChargerRepository;

import jakarta.transaction.Transactional;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ChargerService {

    private final ChargerRepository chargerRepository;

    public ChargerService(ChargerRepository chargerRepository) {
        this.chargerRepository = chargerRepository;
    }

    public List<Charger> getAllChargers() {
        return chargerRepository.findAll();
    }

    public Charger getCharger(Long id) {
        return chargerRepository.findById(id)
            .orElseThrow();
    }

    public Charger addCharger(Charger charger) {
        return chargerRepository.save(charger);
    }

    @Transactional
    public Charger updateAvailability(Long id, boolean available) {
        Charger charger = chargerRepository.findById(id)
            .orElseThrow();

        charger.setAvailable(available);
        return charger;
    }
}