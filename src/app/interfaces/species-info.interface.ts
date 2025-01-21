import { ResultModel } from "../models/result.model"

export interface SpeciesInfo {
    base_happiness: number
    capture_rate: number
    color: ResultModel
    egg_groups: ResultModel[]
    evolution_chain: EvolutionChainUrl
    evolves_from_species: ResultModel
    flavor_text_entries: FlavorTextEntry[]
    form_descriptions: any[]
    forms_switchable: boolean
    gender_rate: number
    genera: Genera[]
    generation: ResultModel
    growth_rate: ResultModel
    habitat: ResultModel
    has_gender_differences: boolean
    hatch_counter: number
    id: number
    is_baby: boolean
    is_legendary: boolean
    is_mythical: boolean
    name: string
    names: Name[]
    order: number
    pal_park_encounters: PalParkEncounter[]
    pokedex_numbers: PokedexNumber[]
    shape: ResultModel
    varieties: Variety[]
  }
  
  export interface EvolutionChainUrl {
    url: string
  }
  
  export interface FlavorTextEntry {
    flavor_text: string
    language: ResultModel
    version: ResultModel
  }
  
  export interface Genera {
    genus: string
    language: ResultModel
  }
  
  export interface Name {
    language: ResultModel
    name: string
  }
  
  export interface PalParkEncounter {
    area: ResultModel
    base_score: number
    rate: number
  }
  
  export interface PokedexNumber {
    entry_number: number
    pokedex: ResultModel
  }

  export interface Variety {
    is_default: boolean
    pokemon: ResultModel
  }
  