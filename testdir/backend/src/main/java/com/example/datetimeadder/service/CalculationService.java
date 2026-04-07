package com.example.datetimeadder.service;

import com.example.datetimeadder.dto.CalculationResponse;
import com.example.datetimeadder.dto.DateTimeComponents;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class CalculationService {

    public CalculationResponse calculate(int value) {
        LocalDateTime now = LocalDateTime.now();
        DateTimeComponents current = new DateTimeComponents(
            now.getYear(),
            now.getMonthValue(),
            now.getDayOfMonth(),
            now.getHour(),
            now.getMinute()
        );
        return calculateWith(current, value);
    }

    public CalculationResponse calculateWith(DateTimeComponents components, int value) {
        DateTimeComponents results = new DateTimeComponents(
            components.year() + value,
            components.month() + value,
            components.day() + value,
            components.hour() + value,
            components.minute() + value
        );
        return new CalculationResponse(components, value, results);
    }
}
