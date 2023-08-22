import { Result } from "../classes/result";

export interface Region{
    id: number;
    name: string;
    url: string;
    pokedexes: Result[]
}