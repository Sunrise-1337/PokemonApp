package com.pokemon.api.service;

import com.pokemon.api.model.responses.AllResultsResponse;
import com.pokemon.api.model.responses.OnePokemonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@RequiredArgsConstructor
@Service
public class PokemonApiService {
    private final RestTemplate restTemplate;
    private final String baseUrl = "https://pokeapi.co/api/v2/pokemon";

    public AllResultsResponse toGetAllPokemons(int amount, int offset) {
        String url = UriComponentsBuilder.fromUriString(baseUrl)
                                         .queryParam("amount", amount)
                                         .queryParam("offset", offset)
                                         .toUriString();

        return restTemplate.getForObject(
            url,
            AllResultsResponse.class
        );
    }

    public OnePokemonResponse toGetPokemonById(long id) {
        String url = UriComponentsBuilder.fromUriString(baseUrl)
                                         .pathSegment(String.valueOf(id))
                                         .toUriString();

        return restTemplate.getForObject(
                url,
                OnePokemonResponse.class
        );
    }
}