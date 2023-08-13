import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { OnePokemonResponse } from '../interfaces/one-pokemon-response';
import { AllResultsResponse } from '../interfaces/all-results-response';
import { SpeciesInfo } from '../interfaces/species-info';
import { EvolutionChain } from '../interfaces/evolution-chain';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  base__url = 'https://pokeapi.co/api/v2/';

  sublinks = {
    pokemon: 'pokemon/',
    berries: 'berry/',
    games: 'version-group/',
    species: 'pokemon-species/',
  }

  private http = inject(HttpClient)

  getAllPokemons(amount: number = 0, page: number = 0): Observable<AllResultsResponse>{
    const params = (amount && page) ? `?offset=${amount * page}&limit=${amount}` : ''
    return this.http.get<AllResultsResponse>(this.base__url + this.sublinks.pokemon + params)
  }

  getOnePokemon(id: number): Observable<OnePokemonResponse>{
    return this.http.get<OnePokemonResponse>(this.base__url + this.sublinks.pokemon + id)
  }
  
  getOnePokemonByUrl(url: string): Observable<OnePokemonResponse>{
    return this.http.get<OnePokemonResponse>(url)
  }

  getOnePokemonBySpeciesUrl(url: string): Observable<OnePokemonResponse>{
    return this.http.get<OnePokemonResponse>(url.replace('-species', ''))
  }

  getSpeciesInfo(id: string): Observable<SpeciesInfo>{
    return this.http.get<SpeciesInfo>(this.base__url + this.sublinks.species + id)
  }
  
  getEvolutionChainByUrl(url: string): Observable<EvolutionChain>{
    return this.http.get<EvolutionChain>(url)
  }

  getAllBerries(amount: number = 0, page: number = 0): Observable<AllResultsResponse>{
    const params = (amount && page) ? `?offset=${amount * page}&limit=${amount}` : ''
    return this.http.get<AllResultsResponse>(this.base__url + this.sublinks.berries + params)
  }

  getOneBerry(id: number): Observable<null>{
    return this.http.get<null>(this.base__url + this.sublinks.berries + id)
  }

  getAllGames(){}
}
