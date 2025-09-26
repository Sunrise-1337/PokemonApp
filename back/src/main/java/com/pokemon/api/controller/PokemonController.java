package com.pokemon.api.controller;

import com.pokemon.api.model.responses.AllResultsResponse;
import com.pokemon.api.model.responses.OnePokemonResponse;
import com.pokemon.api.service.PokemonApiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/pokemons")
public class PokemonController {
    private final PokemonApiService apiService;

    @GetMapping("/all")
    public AllResultsResponse toGetAllPokemons(
            @RequestParam(defaultValue = "20") int amount,
            @RequestParam(defaultValue = "0") int offset
    ) {
        return apiService.toGetAllPokemons(amount, offset);
    }

    @GetMapping("/{id}")
    public OnePokemonResponse toGetOnePokemonById(@PathVariable int id) {
        return apiService.toGetPokemonById(id);
    }
}