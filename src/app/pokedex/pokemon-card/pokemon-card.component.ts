import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, Signal } from '@angular/core';
import { OnePokemonResponse } from 'src/app/interfaces/one-pokemon-response.interface'
import { SharedModule } from 'src/app/shared/shared-module/shared.module';
import { GetTypesStringPipe } from '../pipes/getTypesString.pipe';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    GetTypesStringPipe
  ]
})
export class PokemonCardComponent{
  @Input() pokemonModel: OnePokemonResponse;
  @Input() isFavorite: boolean;
  @Output() favWasToggled: EventEmitter<boolean> = new EventEmitter()
  @Output() isGoneToFullPage: EventEmitter<boolean> = new EventEmitter()

  isShiny: boolean = false;

  
  onGoneToFullPage(): void{
    this.isGoneToFullPage.emit(true)
  }

  toggleShiny(): void{
    this.isShiny = !this.isShiny
  }

  toggleFav(): void{
    this.favWasToggled.emit(!this.isFavorite)
  }

}
