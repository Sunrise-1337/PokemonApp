export interface TypeResponse{
    id: number
    name: string
    pokemon: Pokemon[]
}
 
export interface Pokemon {
    pokemon: Pokemon2
    slot: number
}

export interface Pokemon2 {
    name: string
    url: string
}
  