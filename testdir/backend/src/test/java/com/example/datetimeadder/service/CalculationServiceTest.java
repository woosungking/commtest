package com.example.datetimeadder.service;

import com.example.datetimeadder.dto.CalculationResponse;
import com.example.datetimeadder.dto.DateTimeComponents;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class CalculationServiceTest {

    private CalculationService service;

    @BeforeEach
    void setUp() {
        service = new CalculationService();
    }

    @Test
    void calculateWith_value5_addsToAllComponents() {
        DateTimeComponents input = new DateTimeComponents(2025, 7, 15, 10, 30);
        CalculationResponse response = service.calculateWith(input, 5);

        assertThat(response.currentDateTime()).isEqualTo(input);
        assertThat(response.inputValue()).isEqualTo(5);
        assertThat(response.results().year()).isEqualTo(2030);
        assertThat(response.results().month()).isEqualTo(12);
        assertThat(response.results().day()).isEqualTo(20);
        assertThat(response.results().hour()).isEqualTo(15);
        assertThat(response.results().minute()).isEqualTo(35);
    }

    @Test
    void calculateWith_value0_doesNotChangeComponents() {
        DateTimeComponents input = new DateTimeComponents(2025, 7, 15, 10, 30);
        CalculationResponse response = service.calculateWith(input, 0);

        assertThat(response.results().year()).isEqualTo(2025);
        assertThat(response.results().month()).isEqualTo(7);
        assertThat(response.results().day()).isEqualTo(15);
        assertThat(response.results().hour()).isEqualTo(10);
        assertThat(response.results().minute()).isEqualTo(30);
    }

    @Test
    void calculateWith_negativeMinus3_subtractsFromAllComponents() {
        DateTimeComponents input = new DateTimeComponents(2025, 7, 15, 10, 30);
        CalculationResponse response = service.calculateWith(input, -3);

        assertThat(response.results().year()).isEqualTo(2022);
        assertThat(response.results().month()).isEqualTo(4);
        assertThat(response.results().day()).isEqualTo(12);
        assertThat(response.results().hour()).isEqualTo(7);
        assertThat(response.results().minute()).isEqualTo(27);
    }
}
