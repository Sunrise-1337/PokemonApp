import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OnePokemonResponse } from 'src/app/interfaces/one-pokemon-response';
import { PokemonCardComponent } from 'src/app/pokedex/pokemon-card/pokemon-card.component';
import { FavouritesService } from 'src/app/services/favourites.service';

@Component({
  standalone: true,
  selector: 'app-pokemon-dialog-wrapper',
  templateUrl: './pokemon-dialog-wrapper.component.html',
  styleUrls: ['./pokemon-dialog-wrapper.component.scss'],
  imports: [
    CommonModule,
    PokemonCardComponent
  ]
})
export class PokemonDialogWrapperComponent{
  data: {model: OnePokemonResponse, isFav: boolean} = inject(MAT_DIALOG_DATA);
  favsService = inject(FavouritesService)

  handleFavToggle(arg: boolean): void{
    this.favsService.toggleFavsByResponse(this.data.model)
  }

  isFav(name: string): boolean{
    return this.favsService.isFav(name)
  }
}
