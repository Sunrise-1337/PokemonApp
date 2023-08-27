import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  private titleService = inject(Title);
  
  toChangePokedexPageTitle(page: number): void{
    this.titleService.setTitle(`Page ${page} | Pokedex`)
  }
}
