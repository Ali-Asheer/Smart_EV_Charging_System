package com.evgarage.smart_charging;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.evgarage.smart_charging.service.SmartChargingService;

@SpringBootApplication
public class SmartChargingApplication {

	public static void main(String[] args) {
		SpringApplication.run(SmartChargingApplication.class, args);
		
	}

	// This runs automatically after Spring Boot starts
    @Bean
    public CommandLineRunner run(SmartChargingService smartChargingService) {
        return args -> {
            smartChargingService.generateSchedule();
        };
    }

}
