package com.pokemon.api.model.responses;

import com.pokemon.api.model.ResultModel;
import lombok.Data;

import java.util.List;

@Data
public class RegionResponse {
    int id;
    String name;
    String url;
    List<ResultModel> pokedexes;
}