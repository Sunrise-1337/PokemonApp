package com.pokemon.api.service;

import com.pokemon.api.mappers.PokemonEntryToResultModelMapper;
import com.pokemon.api.model.*;
import com.pokemon.api.model.responses.AllResultsResponse;
import com.pokemon.api.model.responses.PokedexResponse;
import com.pokemon.api.model.responses.RegionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
@Service
public class RegionalPokedexService {
    private final RestTemplate restTemplate;
    private final PokemonEntryToResultModelMapper pokemonEntryToResultModelMapper;
    private final String baseUrl = "https://pokeapi.co/api/v2/region";

    public AllResultsResponse toGetRegionalPokedex(int id, int amount, int offset) {
        String url = UriComponentsBuilder.fromUriString(baseUrl)
                                         .pathSegment(String.valueOf(id))
                                         .toUriString();

        RegionResponse region = restTemplate.getForObject(url, RegionResponse.class);

        if (!Objects.isNull(region)) {
            PokedexResponse pokedexResponse = toGetPokedexByUrl(region.getPokedexes().getFirst().getUrl());

            return toModifyPokedexResponseToStandardResponse(pokedexResponse, amount, offset);
        }

        return null;
    }

    private AllResultsResponse toModifyPokedexResponseToStandardResponse(PokedexResponse pokedexResponse, int amount, int offset) {
        List<PokemonEntry> pokemonEntries = pokedexResponse.getPokemonEntries();
        
        int realCount = pokemonEntries.size();

        if (offset >= realCount) {
            return new AllResultsResponse(0, Collections.emptyList());
        }

        int endIndex = Math.min(offset + amount, realCount);

        List<PokemonEntry> listToBeMapped =
                endIndex != 0
                    ? pokemonEntries.subList(offset, endIndex)
                    : pokemonEntries;

        return new AllResultsResponse(realCount, pokemonEntryToResultModelMapper.mapList(listToBeMapped));
    }

    private PokedexResponse toGetPokedexByUrl(String url) {
        return restTemplate.getForObject(
                url,
                PokedexResponse.class
        );
    }
}