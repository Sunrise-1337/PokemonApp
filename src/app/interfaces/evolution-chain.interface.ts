import { Result } from "../models/result"

export interface EvolutionChain {
    chain?: SingleEvolution
}

export interface SingleEvolution {
    species: Result;
    evolves_to?: SingleEvolution | SingleEvolution[]
}