import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, Signal } from '@angular/core';
import { OnePokemonResponse } from 'src/app/interfaces/one-pokemon-response.interface'

import { GetTypesStringPipe } from '../../pipes/getTypesString.pipe';
import { RouterModule } from '@angular/router';
import { MatCard, MatCardActions, MatCardContent, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
    MatCard,
    MatIcon,
    MatCardTitle,
    MatCardSubtitle,
    MatCardActions,
    MatCardContent,
    MatButton,
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
