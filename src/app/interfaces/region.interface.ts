import { Result } from "../models/result";

export interface Region{
    id: number;
    name: string;
    url: string;
    pokedexes: Result[]
}