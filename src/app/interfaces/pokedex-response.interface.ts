import { Result } from "../models/result"

export interface PokedexResponse{
    id: number
    is_main_series: boolean
    name: string
    pokemon_entries: PokemonEntry[]
}

export interface PokemonEntry {
    entry_number: number
    pokemon_species: Result
}
  