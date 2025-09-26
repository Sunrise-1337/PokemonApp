package com.pokemon.api.controller;

import com.pokemon.api.model.responses.AllResultsResponse;
import com.pokemon.api.service.RegionalPokedexService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/pokedex")
public class PokedexController {
    private final RegionalPokedexService apiService;

    @GetMapping("/{id}")
    public AllResultsResponse toGetPokedexByRegion(
            @PathVariable int id,
            @RequestParam(defaultValue = "20") int amount,
            @RequestParam(defaultValue = "0") int offset
    ) {
        return apiService.toGetRegionalPokedex(id, amount, offset);
    }
}