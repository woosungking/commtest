package com.example.datetimeadder.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class CalculationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void calculate_validRequest_returns200WithJsonStructure() throws Exception {
        mockMvc.perform(post("/api/calculate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"value\": 5}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.currentDateTime").exists())
                .andExpect(jsonPath("$.inputValue").value(5))
                .andExpect(jsonPath("$.results").exists())
                .andExpect(jsonPath("$.currentDateTime.year").isNumber())
                .andExpect(jsonPath("$.currentDateTime.month").isNumber())
                .andExpect(jsonPath("$.currentDateTime.day").isNumber())
                .andExpect(jsonPath("$.currentDateTime.hour").isNumber())
                .andExpect(jsonPath("$.currentDateTime.minute").isNumber());
    }

    @Test
    void calculate_missingBody_returns400() throws Exception {
        mockMvc.perform(post("/api/calculate")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @Test
    void calculate_nonIntegerValue_returns400() throws Exception {
        mockMvc.perform(post("/api/calculate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"value\": \"abc\"}"))
                .andExpect(status().isBadRequest());
    }
}
