import { ResultModel } from "../models/result.model"

export interface EvolutionChain {
    chain?: SingleEvolution
}

export interface SingleEvolution {
    species: ResultModel;
    evolves_to?: SingleEvolution | SingleEvolution[]
}