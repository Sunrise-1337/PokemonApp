package com.pokemon.api.model.responses;

import com.pokemon.api.model.ResultModel;
import lombok.Data;

import java.util.List;

@Data
public class AllResultsResponse {
    private int count;
    private String next;
    private String previous;
    private List<ResultModel> results;

    public AllResultsResponse(int count, List<ResultModel> results) {
        this.count = count;
        this.results = results;

        this.next = "";
        this.previous = "";
    }
}