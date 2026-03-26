package com.evgarage.smart_charging.dto;

public class AvailabilityUpdateRequest {
    private boolean available;

    public AvailabilityUpdateRequest() {}

    public boolean isAvailable() { return available; }
    public void setAvailable(boolean available) { this.available = available; }
}