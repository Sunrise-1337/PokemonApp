package com.pokemon.api.model.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.pokemon.api.model.PokeType;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class OnePokemonResponse {
    private int id;
    private String name;

    @JsonProperty("base_experience")
    private int baseExperience;

    private int height;
    private int order;
    private int weight;

    private List<Form> forms;
    private Sprites sprites;
    private Other other;

    private Map<String, Map<String, VersionSprites>> versions;

    private List<Stat> stats;
    private List<PokeType> types;

    @JsonProperty("past_types")
    private List<PastType> pastTypes;


    @Data
    public static class Form {
        private String name;
        private String url;
    }

    @Data
    public static class Sprites {
        @JsonProperty("front_default")
        private String frontDefault;

        @JsonProperty("front_shiny")
        private String frontShiny;
    }

    @Data
    public static class Other {
        @JsonProperty("official-artwork")
        private OfficialArtwork officialArtwork;

        @Data
        public static class OfficialArtwork {
            @JsonProperty("front_default")
            private String frontDefault;
        }
    }

    @Data
    public static class VersionSprites {
        @JsonProperty("front_default")
        private String frontDefault;

        @JsonProperty("front_shiny")
        private String frontShiny;
    }

    @Data
    public static class Stat {
        @JsonProperty("base_stat")
        private int baseStat;

        private int effort;
        private StatInfo stat;

        @Data
        public static class StatInfo {
            private String name;
            private String url;
        }
    }

    @Data
    public static class PastType {
        private Generation generation;
        private List<PokeType> types;

        @Data
        public static class Generation {
            private String name;
            private String url;
        }
    }
}