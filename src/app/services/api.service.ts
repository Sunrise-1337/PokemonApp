import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { OnePokemonResponse } from '../interfaces/one-pokemon-response.interface';
import { AllResultsResponse } from '../models/all-results-response';
import { SpeciesInfo } from '../interfaces/species-info.interface';
import { EvolutionChain } from '../interfaces/evolution-chain.interface';
import { base__url, sublinks } from '../constants/api.constants';
import { TypeResponse } from '../interfaces/type-response.interface';
import { Region } from '../interfaces/region.interface';
import { PokedexResponse } from '../interfaces/pokedex-response.interface';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private http = inject(HttpClient)

  getAllPokemons(amount: number = 0, page: number = 0): Observable<AllResultsResponse>{
    const params = amount ? `?offset=${amount * page}&limit=${amount}` : ''
    return this.http.get<AllResultsResponse>(base__url + sublinks.pokemon + params)
  }

  getSpecificPokedexByUrl(url: string): Observable<PokedexResponse>{
    return this.http.get<PokedexResponse>(url)
  }

  getOnePokemon(id: number): Observable<OnePokemonResponse>{
    return this.http.get<OnePokemonResponse>(base__url + sublinks.pokemon + id)
  }
  
  getOnePokemonByUrl(url: string): Observable<OnePokemonResponse>{
    return this.http.get<OnePokemonResponse>(url)
  }



  getOnePokemonBySpeciesUrl(url: string): Observable<OnePokemonResponse>{
    return this.http.get<OnePokemonResponse>(url.replace('-species', ''))
  }



  getSpeciesInfo(id: string): Observable<SpeciesInfo>{
    return this.http.get<SpeciesInfo>(base__url + sublinks.species + id)
  }
  



  getEvolutionChainByUrl(url: string): Observable<EvolutionChain>{
    return this.http.get<EvolutionChain>(url)
  }


  getAllRegions(): Observable<AllResultsResponse>{
    return this.http.get<AllResultsResponse>(base__url + sublinks.region)
  }

  getOneRegionByUrl(url: string): Observable<Region>{
    return this.http.get<Region>(url)
  }

  
  getTypeByUrl(url: string): Observable<TypeResponse>{
    return this.http.get<TypeResponse>(url)
  }

  getAllTypes(): Observable<AllResultsResponse>{
    return this.http.get<AllResultsResponse>(base__url + sublinks.type)
  }



  getAllBerries(amount: number = 0, page: number = 0): Observable<AllResultsResponse>{
    const params = amount ? `?offset=${amount * page}&limit=${amount}` : ''
    return this.http.get<AllResultsResponse>(base__url + sublinks.berries + params)
  }

  getOneBerry(id: number): Observable<null>{
    return this.http.get<null>(base__url + sublinks.berries + id)
  }




  getAllGames(){}
}