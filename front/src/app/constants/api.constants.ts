import { ApiSublinks } from "../interfaces/api-sublinks.interface";

export const base__url: string = 'https://pokeapi.co/api/v2/';

export const sublinks : ApiSublinks = {
  pokemon: 'pokemon/',
  berries: 'berry/',
  games: 'version-group/',
  species: 'pokemon-species/',
  region: 'region/',
  type: 'type/',
  pokedex: 'pokedex/'
};