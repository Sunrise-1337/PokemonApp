import { Poketype } from "./poketype"

export interface OnePokemonResponse {
    id: number,
    name: string,
    base_experience: number,
    height: number,
    order: number,
    weight: number,
    forms: {name: string, url: string}[],

    sprites: {
        front_default: string,
        front_shiny: string
    },

    other:{
        "official-artwork": {
            front_default: string
        }
    },

    versions: {
        [key: string]: {
            [key: string]: {
                front_default: string,
                front_shiny: string
            }
        }
    },

    stats: Stat[],

    types: Poketype[],

    past_types: PastType[]

}

interface Stat{
    base_stat: number,
    effort: number,
    stat: {
        name: string,
        url: string
    }
}

interface PastType{
    generation: {
        name: string,
        url: string
    },
    types: Poketype[]
}