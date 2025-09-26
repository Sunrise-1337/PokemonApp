package com.pokemon.api.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class PokemonEntry {
    @JsonProperty("entry_number")
    int entryNumber;

    @JsonProperty("pokemon_species")
    ResultModel pokemonSpecies;
}