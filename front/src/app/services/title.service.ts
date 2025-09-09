import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  private titleService = inject(Title);
  
  toSetPokedexPageTitle(page: number = 1): void{
    this.titleService.setTitle(`Page ${page} | Pokedex`)
  }

  toSetAppNameTitle(): void{
    this.titleService.setTitle('PokeApp')
  }
  
  toSetPokemonNameTitle(pokemon: string): void{
    this.titleService.setTitle(`${pokemon} | PokeApp`)
  }
}
