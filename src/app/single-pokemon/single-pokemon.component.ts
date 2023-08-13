import { Component, DestroyRef, Injector, OnInit, Signal, inject } from '@angular/core';
import { SignalsService } from '../services/signals.service';
import { ApiService } from '../services/api.service';
import { OnePokemonResponse } from '../interfaces/one-pokemon-response';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared/shared.module';
import { GetTypesStringPipe } from '../pokedex/pipes/getTypesString.pipe';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PokemonCardComponent } from '../pokedex/pokemon-card/pokemon-card.component';
import { EvolutionChain, SingleEvolution } from '../interfaces/evolution-chain';
import { map, switchMap, take } from 'rxjs';
import { Result } from '../interfaces/result';
import { recursiveResultArray } from '../interfaces/types';
import { PokemonDialogWrapperComponent } from '../shared/pokemon-dialog-wrapper/pokemon-dialog-wrapper.component';
import { MatDialog } from '@angular/material/dialog';
import { FavouritesService } from '../services/favourites.service';

@Component({
  standalone: true,
  selector: 'app-single-pokemon',
  templateUrl: './single-pokemon.component.html',
  styleUrls: ['./single-pokemon.component.scss'],
  imports: [    
    CommonModule,
    RouterModule,
    SharedModule,
    GetTypesStringPipe,
    PokemonCardComponent
  ]
})

export class SinglePokemonComponent implements OnInit{
  isShiny: boolean = false;

  private signalsService = inject(SignalsService)
  private api = inject(ApiService)
  public favsService = inject(FavouritesService)

  private injector = inject(Injector)
  private dialogRef = inject(MatDialog)
  private actRoute = inject(ActivatedRoute)
  private destroyRef = inject(DestroyRef)


  pokemonModel: Signal<OnePokemonResponse | undefined> = this.signalsService.pokemonSignal;
  evolutionArray: Signal<Result[] | undefined>;
  id: string;

  ngOnInit(): void {
    this.actRoute.params
      .pipe(
        map(res => res['id']),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(res => {
        this.id = res

        this.toInitPage()

        this.dialogRef.closeAll()
      })
  }

  toInitPage(): void{
    if (this.pokemonModel()?.id !== +this.id) {
      this.pokemonModel = toSignal(this.api.getOnePokemon(+this.id), {
        initialValue: undefined,
        injector: this.injector,
      })
    }
    
    this.evolutionArray = toSignal(
      this.api.getSpeciesInfo(this.id)
        .pipe(
          switchMap(res => { 
            return this.api.getEvolutionChainByUrl(res.evolution_chain.url)
          }),
          map((res: EvolutionChain) => {
              return (
                res?.chain
                    ? this.getRecursiveEvolutionValue([res.chain]) as Result[]
                    : []
              )
          })
        ), {
          initialValue: undefined,
          injector: this.injector,
        }
    )
  }

  // We pass the first argument obligatory to start the recursion,
  // the second argument is for the container in which the results of each call will fit in

  // Complexity of this method is needed to display properly evolution chains which don't fit common pattern
  // For instance http://localhost:4200/pokemon/133; http://localhost:4200/pokemon/265
  getRecursiveEvolutionValue(evolution: SingleEvolution[], array?: recursiveResultArray): recursiveResultArray | void{
    if (!evolution) return

    // If it is the first call we will assign the value of the first argument
    // If it's not then we will assign the value of second argument, which contains 
    // results of the previous calls
    let resultsArray: recursiveResultArray = [];

    if (array) {
      resultsArray = array
    }

    // If on this level of evolution we only have one form we will push it to the resultsArray
    // Otherwise we will push the array of forms to which current form of pokemon can proceed
    if (evolution.length > 1) {
      let sameLevelForms: Result[] = evolution.reduce((acc: Result[], res) => {
        return [...acc, res.species]
      }, [])
      
      resultsArray.push(sameLevelForms)
    } else {
      evolution.forEach(res => {
        resultsArray.push(res.species)
      })
    }

    // Here we check if the evolution has next form
    // If we have more than 1 element in the array and there are next forms we will add 
    // to this array more arrays (1 for each form)

    // I check only if the first element has next evolutions since all evolution chains
    // have the same length the forms since 
    if (evolution[0]?.evolves_to) {
      let evolutionArray: SingleEvolution[] = [];

      if (evolution.length > 1) {
        // let sameLevelForms: Result[] = evolution.reduce((acc: Result[], res) => {
        //   return [...acc, res.species]
        // }, [])

        // sameLevelForms.forEach(res => {
        //   return this.getRecursiveEvolutionValue(evolution, sameLevelForms)
        // })
        
        // resultsArray.push(sameLevelForms)
        evolution.forEach(res => {
          evolutionArray = evolutionArray.concat(res.evolves_to as SingleEvolution[])
        })
      } else {
        if (this.isArray(evolution[0].evolves_to)) {
          evolutionArray = evolutionArray.concat(evolution[0].evolves_to)
        }
      }

      return this.getRecursiveEvolutionValue(evolutionArray, resultsArray)
    }

    return resultsArray
  }

  onPokemonClick(url: string): void{
    this.api.getOnePokemonBySpeciesUrl(url)
      .pipe(
        take(1)
      )
      .subscribe(res => {
        this.dialogRef.open(PokemonDialogWrapperComponent, {
          data: {
            model: res
          },
          height: 'fit-content',
          width: 'fit-content'
        });
      })
  }

  isArray(arg: any): boolean{
    return Array.isArray(arg)
  }
  
  toggleShiny(): void{
    this.isShiny = !this.isShiny
  }
  
  toggleFav(): void {
    this.favsService.toggleFavsByResponse(this.pokemonModel() as OnePokemonResponse)
  }

  isFav(name:string): boolean{
    return this.favsService.isFav(name)
  }

}