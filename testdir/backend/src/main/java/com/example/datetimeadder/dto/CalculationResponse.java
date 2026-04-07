package com.example.datetimeadder.dto;

public record CalculationResponse(
    DateTimeComponents currentDateTime,
    int inputValue,
    DateTimeComponents results
) {}
