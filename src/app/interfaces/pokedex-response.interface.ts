import { ResultModel } from "../models/result.model"

export interface PokedexResponse{
    id: number
    is_main_series: boolean
    name: string
    pokemon_entries: PokemonEntry[]
}

export interface PokemonEntry {
    entry_number: number
    pokemon_species: ResultModel
}
  