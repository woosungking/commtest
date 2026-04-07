package com.example.datetimeadder.controller;

import com.example.datetimeadder.dto.CalculationRequest;
import com.example.datetimeadder.dto.CalculationResponse;
import com.example.datetimeadder.service.CalculationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class CalculationController {

    private final CalculationService calculationService;

    public CalculationController(CalculationService calculationService) {
        this.calculationService = calculationService;
    }

    @PostMapping("/calculate")
    public ResponseEntity<CalculationResponse> calculate(@RequestBody(required = false) CalculationRequest request) {
        if (request == null) {
            return ResponseEntity.badRequest().build();
        }
        CalculationResponse response = calculationService.calculate(request.value());
        return ResponseEntity.ok(response);
    }
}
