import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, Injector, Input, OnInit, Signal, ViewChild, WritableSignal, computed, inject, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { AllResultsResponseModel } from '../../models/all-results-response.model';
import { OnePokemonResponse } from '../../interfaces/one-pokemon-response.interface';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { SignalsStoreService } from '../../services/signals-store.service';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { PokedexFiltersComponent } from './components/pokedex-filters/pokedex-filters.component';

import { CommonModule } from '@angular/common';
import { Observable, map, of, take, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PokemonDialogWrapperComponent } from '../../shared/components/pokemon-dialog-wrapper/pokemon-dialog-wrapper.component';
import { FavouritesService } from '../../services/favourites.service';
import { getIdFromLink, getLinkByTypeAndId, getPokemonLink } from '../../helpers/helper';
import { ResultModel } from '../../models/result.model';
import { FilterDataModel } from '../../models/filterData.model';
import { ApiRequestsModifierService } from '../../services/apiRequestsModifier.service';
import { TitleService } from '../../services/title.service';
import { SubjectsNotificationService } from '../../services/signals-notification.service';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { MatButton } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    PokemonCardComponent,
    PokedexFiltersComponent,
    PaginationComponent,
    MatDrawer,
    MatDrawerContainer,
    MatButton
  ]
})
export class PokedexComponent implements OnInit {
  @Input('pokemon') pokeId?: string;
  @Input('id') startPage: number;

  @Input() filter: string;
  @Input() filterId: string;
  @Input() filterSector: string;

  @Input() limit?: string;

  @ViewChild('pokemonCardDrawer', {static: true}) pokemonCardDrawer: MatDrawer;


  resultsResponse: Signal<AllResultsResponseModel>;
  currentPokemon: Signal<OnePokemonResponse | undefined> = signal(undefined);
  currentPokemonUrl: string = '';
  itemsCount: WritableSignal<number>;

  currentid: string;

  currentPage: number;
  resultsPerPage: WritableSignal<number> = signal(20);
  pagesAmount: Signal<number>;

  regionsArray: Signal<ResultModel[]>;
  typesArray: Signal<ResultModel[]>;


  private injector = inject(Injector);

  private apiService = inject(ApiService);
  private signalsStoreService = inject(SignalsStoreService);
  public favsService = inject(FavouritesService);
  public apiModifier = inject(ApiRequestsModifierService);
  private titleService = inject(TitleService);

  private dialogRef = inject(MatDialog);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  private subjectsService = inject(SubjectsNotificationService)
  private destroyRef = inject(DestroyRef)
  private cdRef = inject(ChangeDetectorRef)

  ngOnInit(): void {
    this.toInitVariables()
    this.toSetSubsciptions()
  }

  toSetSubsciptions(): void{
    this.subjectsService.updateViewNotificationSubject
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(res => {
        this.cdRef.detectChanges()
        console.log('marking for checking')
      })
  }

  toInitVariables(): void{
    this.itemsCount = signal(0);
    this.titleService.toSetPokedexPageTitle(this.currentPage)

    if (this.pokeId) {
      this.toAssignCurrentPokemon(this.apiService.getOnePokemon(+this.pokeId))
    }

    if (!this.filterSector) {
      this.handleNewFilterApplication(new FilterDataModel('all', '', ''))
    } else {
      this.setCurrentPage(this.startPage - 1)
    }

    this.signalsStoreService.pageToBeOpenedOnInit.set(+this.startPage)

    if (this.limit) this.resultsPerPage = signal(+this.limit)
    
    this.toSetResultsResponseFromObservable(this.apiService.getAllPokemons(this.resultsPerPage(), this.startPage ? this.startPage - 1 : 0));

    this.pagesAmount = computed(() => {
      return Math.ceil(this.itemsCount() / this.resultsPerPage())
    })

    this.regionsArray = toSignal(this.apiService.getAllRegions().pipe(map(res => res.results)), 
    {
      initialValue: [],
      injector: this.injector,
    });

    
    this.typesArray = toSignal(this.apiService.getAllTypes().pipe(map(res => res.results)), 
    {
      initialValue: [],
      injector: this.injector,
    });
  }

  setCurrentPage(page: number): void{
    if (+this.startPage === page) return

    this.currentPage = page 

    this.router.navigate([`../${page}`], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'merge'
    });

    this.titleService.toSetPokedexPageTitle(this.currentPage)

    this.toSetDisplayByType(this.filterSector, getLinkByTypeAndId(this.filterSector, this.filterId), this.currentPage - 1)
  }

  onPokemonChoice(url: string): void{
    if (this.currentPokemonUrl === url) {
      this.dialogRef.closeAll()
      this.pokemonCardDrawer.close()
      this.currentPokemonUrl = ''
      this.toChangePokemonQuery()
      return
    }

    this.toChangePokemonQuery(url)

    this.toAssignCurrentPokemon(this.apiService.getOnePokemonByUrl(url))
  }

  toChangePokemonQuery(url: string = ''): void{
    this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: { 
          pokemon: url ? url.split('pokemon/')[1].replace('/', '') : ''
        }, 
        queryParamsHandling: 'merge'
    });
  }

  toChangeFiltersQuery(data: FilterDataModel): void{
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { 
        filter: data.unit.name,
        filterSector: data.sector,
        filterId: data.sector !== 'all' && data.sector !== 'favourites' ? getIdFromLink(data.unit.url, data.sector) : ''
      }, 
      queryParamsHandling: 'merge'
    });
  }
  
  handleNewFilterApplication(data: FilterDataModel, firstCall: boolean = false): void{
    if (!firstCall) this.signalsStoreService.pageToBeOpenedOnInit.set(1)

    this.toChangeFiltersQuery(data)

    this.toSetDisplayByType(data.sector, data.unit.url, this.startPage ? this.startPage - 1 : 0)
  }

  toSetDisplayByType(sector: string, url: string, page: number){
    switch (sector) {
      case 'all':     
        this.toSetResultsResponseFromObservable(
          this.apiService.getAllPokemons(this.resultsPerPage(), page)
        );
        break;
      
      case 'favourites': 
        this.toSetResultsResponseFromObservable(
          of(this.favsService.getFavsList(this.resultsPerPage(), page))
        );
        break;
      
      case 'region': 
        this.toSetResultsResponseFromObservable(
          this.apiModifier.toGetRegionalPokedex(url, this.resultsPerPage(), page)
        )
        break;

      case 'type': 
        this.toSetResultsResponseFromObservable(
          this.apiModifier.toGetTypedPokedex(url, this.resultsPerPage(), page)
        );
        break;
    }
  }

  toSetResultsResponseFromObservable(observableToSet: Observable<AllResultsResponseModel>): void{
    this.resultsResponse = toSignal(
      observableToSet
        .pipe(
          tap(res => {
            this.itemsCount.set(res.count)
          })
        ), 
      {
        initialValue: {count: 0, results: []},
        injector: this.injector,
      }
    );
  }

  toAssignCurrentPokemon(receivedObservable: Observable<OnePokemonResponse>): void{
    this.currentPokemon = toSignal<OnePokemonResponse>(
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
    if (window && window.innerWidth > 1440) {
      this.pokemonCardDrawer.open()
      this.signalsStoreService.pokemonSignal.set(data)
    } else {
      this.pokemonCardDrawer.close()
      let cardRef = this.dialogRef.open(PokemonDialogWrapperComponent, {
        data: {
          model: data,
          isFav: this.favsService.isFav(data.name)
        },
        height: 'fit-content',
        width: 'fit-content'
      })

      cardRef.afterClosed()
        .pipe(
          take(1)
        ).subscribe(() => {
          if (!this.signalsStoreService.isDialogCardClosedOnGoingToFullPage()) {
            this.toChangePokemonQuery('')
            this.signalsStoreService.isDialogCardClosedOnGoingToFullPage.set(true)
          }
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
