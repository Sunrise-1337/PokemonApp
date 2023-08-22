import { Result } from "../classes/result"

export interface SpeciesInfo {
    base_happiness: number
    capture_rate: number
    color: Result
    egg_groups: Result[]
    evolution_chain: EvolutionChainUrl
    evolves_from_species: Result
    flavor_text_entries: FlavorTextEntry[]
    form_descriptions: any[]
    forms_switchable: boolean
    gender_rate: number
    genera: Genera[]
    generation: Result
    growth_rate: Result
    habitat: Result
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
    shape: Result
    varieties: Variety[]
  }
  
  export interface EvolutionChainUrl {
    url: string
  }
  
  export interface FlavorTextEntry {
    flavor_text: string
    language: Result
    version: Result
  }
  
  export interface Genera {
    genus: string
    language: Result
  }
  
  export interface Name {
    language: Result
    name: string
  }
  
  export interface PalParkEncounter {
    area: Result
    base_score: number
    rate: number
  }
  
  export interface PokedexNumber {
    entry_number: number
    pokedex: Result
  }

  export interface Variety {
    is_default: boolean
    pokemon: Result
  }
  