import { Component, Injector, Input, OnInit, Signal, ViewChild, WritableSignal, computed, inject, signal } from '@angular/core';
import { ApiService } from '../services/api.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { AllResultsResponse } from '../interfaces/all-results-response';
import { OnePokemonResponse } from '../interfaces/one-pokemon-response';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { SignalsService } from '../services/signals.service';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { PokedexFiltersComponent } from './pokedex-filters/pokedex-filters.component';
import { SharedModule } from '../shared/shared/shared.module';
import { GetTypesStringPipe } from './pipes/getTypesString.pipe';
import { CommonModule } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PokemonDialogWrapperComponent } from '../shared/pokemon-dialog-wrapper/pokemon-dialog-wrapper.component';
import { FavouritesService } from '../services/favourites.service';
import { getPokemonLink } from '../helpers/helper';

@Component({
  standalone: true,
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
  imports: [
    CommonModule,
    PokemonCardComponent, 
    PokedexFiltersComponent, 
    SharedModule,
    GetTypesStringPipe
  ]
})
export class PokedexComponent implements OnInit {
  @Input('pokemon') pokeId?: string;
  @Input('id') startPage: number;
  @Input() limit?: string;

  @ViewChild('pokemonCardDrawer', {static: true}) pokemonCardDrawer: MatDrawer;


  resultsResponse: Signal<AllResultsResponse>;
  currentPokemon: Signal<OnePokemonResponse | undefined> = signal(undefined);
  currentPokemonUrl: string = '';

  currentid: string;

  currentPage: number;
  resultsPerPage: WritableSignal<number>;
  pagesAmount: Signal<number>;


  private injector = inject(Injector);

  private apiService = inject(ApiService);
  private signalsService = inject(SignalsService);
  public favsService = inject(FavouritesService);

  private dialogRef = inject(MatDialog);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private titleService = inject(Title);

  ngOnInit(): void {
    this.toInitVariables()
  }

  toInitVariables(): void{
    this.titleService.setTitle(`Page ${this.startPage} | Pokedex`)

    if (this.pokeId) {
      this.toAssignCurrentPokemon(this.apiService.getOnePokemon(+this.pokeId))
    }

    this.signalsService.pageToBeOpenedOnInit.set(+this.startPage)

    this.resultsPerPage = signal(this.limit ? +this.limit : 20)
    
    this.resultsResponse = toSignal(this.apiService.getAllPokemons(this.resultsPerPage(), this.startPage ? this.startPage - 1 : 0), 
      {
        initialValue: {count: 0, results: []},
        injector: this.injector,
      }
    );

    this.pagesAmount = computed(() => {
      return Math.ceil(this.resultsResponse().count / this.resultsPerPage())
    })
  }

  setCurrentPage(page: number): void{
    if (+this.startPage === page) return

    this.currentPage = page 

    this.router.navigate([`../${page}`], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'merge'
    });

    this.titleService.setTitle(`Page ${this.startPage} | Pokedex`)

    
    this.resultsResponse = toSignal(this.apiService.getAllPokemons(this.resultsPerPage(), this.currentPage - 1), 
      {
        initialValue: {count: 0, results: []},
        injector: this.injector,
      }
    );
  }

  onPokemonChoice(url: string): void{
    if (this.currentPokemonUrl === url) {
      this.dialogRef.closeAll()
      this.pokemonCardDrawer.close()
      this.currentPokemonUrl = ''
      this.changePokemonQuery()
      return
    }

    this.changePokemonQuery(url)

    this.toAssignCurrentPokemon(this.apiService.getOnePokemonByUrl(url))
  }

  changePokemonQuery(url: string = ''): void{
    this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: { 
          ...(url && {pokemon: url.split('pokemon/')[1].replace('/', '')})
        }, 
        queryParamsHandling: url ? 'merge' : ''
    });
  }

  toAssignCurrentPokemon(receivedObservable: Observable<OnePokemonResponse>): void{
    this.currentPokemon = toSignal<OnePokemonResponse, undefined>(
      receivedObservable
        .pipe(
          tap(res => {
            this.toOpenPokemonCard(res);
            this.currentPokemonUrl = getPokemonLink(res.id)
          })
        ), 
      {
        initialValue: undefined,
        injector: this.injector,
      }
    )
  }

  toOpenPokemonCard(data: OnePokemonResponse): void{
    if (window.innerWidth > 1440) {
      this.pokemonCardDrawer.open()
      this.signalsService.pokemonSignal.set(data)
    } else {
      this.pokemonCardDrawer.close()
      this.dialogRef.open(PokemonDialogWrapperComponent, {
        data: {
          model: data,
          isFav: this.favsService.isFav(data.name)
        },
        height: 'fit-content',
        width: 'fit-content'
      })
    }
  }

  handleFavToggle(): void{
    this.favsService.toggleFavsByResponse(this.currentPokemon() as OnePokemonResponse)
  }

  isFav(name: string): boolean{
    return this.favsService.isFav(name)
  }
}
