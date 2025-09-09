import {inject, Pipe, PipeTransform} from '@angular/core';
import {FavouritesService} from "../../services/favourites.service";

@Pipe({
  name: 'isPokemonFavourite',
  standalone: true
})
export class IsPokemonFavouritePipe implements PipeTransform {
  public favsService = inject(FavouritesService);

  transform(name: string): boolean {
    return this.favsService.isFav(name)
  }
}
