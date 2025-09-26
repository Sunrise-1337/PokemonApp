package com.pokemon.api.model.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.pokemon.api.model.PokemonEntry;
import lombok.Data;

import java.util.List;

@Data
public class PokedexResponse {
    int id;

    @JsonProperty("is_main_series")
    Boolean isMainSeries;

    String name;

    @JsonProperty("pokemon_entries")
    List<PokemonEntry> pokemonEntries;
}