package com.pokemon.api.model;

import lombok.Data;

@Data
public class PokeType {
    private int slot;
    private TypeInfo type;

    @Data
    public static class TypeInfo {
        private String name;
        private String url;
    }
}