package com.evgarage.smart_charging.dto;

public class StartSessionRequest {
    private Long vehicleId;
    private Long chargerId;
    private int priority;

    public StartSessionRequest() {}

    // getters
    public Long getVehicleId() { return vehicleId; }
    public Long getChargerId() { return chargerId; }
    public int getPriority() { return priority; }

    // setters
    public void setVehicleId(Long vehicleId) { this.vehicleId = vehicleId; }
    public void setChargerId(Long chargerId) { this.chargerId = chargerId; }
    public void setPriority(int priority) { this.priority = priority; }
}