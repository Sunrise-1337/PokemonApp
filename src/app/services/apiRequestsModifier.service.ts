import { Injectable, inject } from '@angular/core';
import { Result } from '../classes/result';
import { AllResultsResponse } from '../classes/all-results-response';
import { ApiService } from './api.service';
import { Observable, map, switchMap } from 'rxjs';
import { turnSpeciesLinkIntoRegularPokemonLink } from '../helpers/helper';
import { PokemonEntry } from '../interfaces/pokedex-response.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestsModifierService {
    private apiService = inject(ApiService)

    toGetTypedPokedex(url: string, limit: number = 0, page: number = 0): Observable<AllResultsResponse>{
        return this.apiService
                .getTypeByUrl(url)
                .pipe(
                    map(el => {
                        let resultArray: Result[] = el.pokemon.map(el => {
                            return el.pokemon
                        }),
                            realCount: number = resultArray.length;

                        if (limit) {
                            let offset: number = limit * page;

                            limit = (offset + limit) > realCount ? realCount - 1 : offset + limit;
                
                            return new AllResultsResponse(realCount, resultArray.slice(offset, limit))
                        }

                        return new AllResultsResponse(realCount, resultArray)
                    })
                )
    }

    regionalPokedexLogic(url: string, limit: number = 0, page: number = 0): Observable<AllResultsResponse>{
        return this.apiService.getSpecificPokedexByUrl(url)
                .pipe(
                    map(res => {
                        const { pokemon_entries } = res;

                        let arrayToBeMapped: PokemonEntry[],
                            offset: number = limit * page,
                            resultArray: Result[],
                            realCount: number = pokemon_entries.length;
                        
                        limit = (offset + limit) > realCount ? realCount - 1 : offset + limit;

                        arrayToBeMapped = limit ? pokemon_entries.slice(offset, limit) : pokemon_entries;

                        resultArray = arrayToBeMapped.map(res => new Result(res.pokemon_species.name, turnSpeciesLinkIntoRegularPokemonLink(res.pokemon_species.url)))

                        return new AllResultsResponse(realCount, resultArray)
                    })
                )
    }

    toGetRegionalPokedex(url: string, limit: number = 0, page: number = 0): Observable<AllResultsResponse>{
        return this.apiService.getOneRegionByUrl(url)
                .pipe(
                    switchMap(res => {
                        return this.regionalPokedexLogic(res.pokedexes[0].url, limit, page);
                    }),
                )
    }
}