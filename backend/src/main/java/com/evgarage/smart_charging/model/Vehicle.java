package com.evgarage.smart_charging.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String licensePlate;
    private double batteryCapacity;
    private double currentCharge;
    private double maxChargeRate;
    private LocalDateTime arrivalTime;
    private LocalDateTime departureTime;
    private int priority;
    private String name;
    }
