import { base__url, sublinks } from "../constants/api.constants"

export function getPokemonLink(id: number): string{
    return `${base__url}${sublinks.pokemon}${id}/`
}

export function turnSpeciesLinkIntoRegularPokemonLink(url: string): string{
    return url.replace(sublinks.species, sublinks.pokemon)
}

export function getIdFromLink(url: string, type: string): string{
    return url.replace(base__url + sublinks[type], '').replace('/', '')
}

export function getLinkByTypeAndId(linkType: string, id: string | number): string{
    return `${base__url}${sublinks[linkType]}${id}`
} 