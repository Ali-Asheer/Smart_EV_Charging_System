package com.evgarage.smart_charging.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class ChargingPriority {

    private Long vehicleId;
    private Long chargerId;
    private int priority;
    }
/* public class SessionResponseDTO {
    private Long id;
    private String vehicleLP;
    private String chargerName;
    private int Vpriority;
    private LocalDateTime startTime
    ;
} */
