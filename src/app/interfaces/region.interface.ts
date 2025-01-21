import { ResultModel } from "../models/result.model";

export interface Region{
    id: number;
    name: string;
    url: string;
    pokedexes: ResultModel[]
}