import { Component, Injector, OnInit, Signal, computed, inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Result } from '../interfaces/result';
import { Observable, map } from 'rxjs';
import { AllResultsResponse } from '../interfaces/all-results-response';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {
  allPokemons$: Observable<AllResultsResponse>;

  allPokemons: Signal<Result[]>;
  amountOfResults: Signal<number>;
  currentPage: number;

  pokemonsToDisplay: any;
  
  private injector = inject(Injector);
  
  constructor(private apiService: ApiService){}

  ngOnInit(): void {
    this.allPokemons$ = this.apiService.getAllPokemons()

    this.amountOfResults = 
      toSignal<number, number>(
        this.allPokemons$.pipe(map(res => res.count)), 
        {
          initialValue: 0,
          injector: this.injector,
        }
      )

    this.allPokemons = 
      toSignal<Result[], Result[]>(
        this.allPokemons$.pipe(map(res => res.results)), 
        {
          initialValue: [],
          injector: this.injector,
        }
      );

    this.allPokemons().forEach(res => this.apiService.getOnePokemonByUrl(res.url))

    this.pokemonsToDisplay = computed(() => {this.allPokemons().forEach((res: Result) => return {
      ...res
  }}))
  }
}
