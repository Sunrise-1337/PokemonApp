
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OnePokemonResponse } from 'src/app/interfaces/one-pokemon-response.interface';
import { PokemonCardComponent } from 'src/app/pages/pokedex/components/pokemon-card/pokemon-card.component';
import { FavouritesService } from 'src/app/services/favourites.service';
import { SignalsStoreService } from 'src/app/services/signals-store.service';

@Component({
  standalone: true,
  selector: 'app-pokemon-dialog-wrapper',
  templateUrl: './pokemon-dialog-wrapper.component.html',
  styleUrls: ['./pokemon-dialog-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PokemonCardComponent
]
})
export class PokemonDialogWrapperComponent{
  data: {model: OnePokemonResponse, isFav: boolean} = inject(MAT_DIALOG_DATA);
  favsService = inject(FavouritesService)

  private signalsStoreService = inject(SignalsStoreService)

  goneToFullPageHandler(): void{
    this.signalsStoreService.isDialogCardClosedOnGoingToFullPage.set(true)
  }

  handleFavToggle(): void{
    this.favsService.toggleFavsByResponse(this.data.model)
  }

  isFav(name: string): boolean{
    return this.favsService.isFav(name)
  }
}
