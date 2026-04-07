package com.example.datetimeadder.service;

import com.example.datetimeadder.dto.CalculationResponse;
import com.example.datetimeadder.dto.DateTimeComponents;
import net.jqwik.api.ForAll;
import net.jqwik.api.Property;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * 속성 2: 계산 정확성 및 독립성
 * Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
 */
class CalculationServicePropertyTest {

    private final CalculationService service = new CalculationService();

    @Property(tries = 100)
    void calculationAccuracyAndIndependence(
            @ForAll int year,
            @ForAll int month,
            @ForAll int day,
            @ForAll int hour,
            @ForAll int minute,
            @ForAll int value
    ) {
        DateTimeComponents components = new DateTimeComponents(year, month, day, hour, minute);
        CalculationResponse result = service.calculateWith(components, value);

        assertThat(result.results().year()).isEqualTo(year + value);
        assertThat(result.results().month()).isEqualTo(month + value);
        assertThat(result.results().day()).isEqualTo(day + value);
        assertThat(result.results().hour()).isEqualTo(hour + value);
        assertThat(result.results().minute()).isEqualTo(minute + value);
    }
}
