package com.pokemon.api.mappers;

import com.pokemon.api.model.PokemonEntry;
import com.pokemon.api.model.ResultModel;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class PokemonEntryToResultModelMapper {
    public ResultModel map(PokemonEntry pokemonEntry) {
        ResultModel resultModel = new ResultModel();

        resultModel.setName(pokemonEntry.getPokemonSpecies().getName());

        String url = pokemonEntry.getPokemonSpecies().getUrl();
        String modifiedUrl = url.replace("pokemon/", "pokemon-species/");

        resultModel.setUrl(modifiedUrl);

        return resultModel;
    }

    public List<ResultModel> mapList(List<PokemonEntry> pokemonEntries) {
        return pokemonEntries
                .stream()
                .map(this::map)
                .collect(Collectors.toList());
    }
}