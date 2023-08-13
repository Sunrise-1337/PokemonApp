import { ApplicationRef, Injectable, inject } from '@angular/core';
import { OnePokemonResponse } from '../interfaces/one-pokemon-response';
import { Result } from '../interfaces/result';
import { ResponseToUnit } from '../classes/responseToUnit';
import { SnackbarService } from './snackbar.service';
import { Observable, map, of, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {
  favouritesList: Result[] = [];
  storageKey = 'favouritesList';

  private snackbarService = inject(SnackbarService)
  private appRef = inject(ApplicationRef)

  toInitList(): void{
    const storageData: Result[] = JSON.parse(localStorage.getItem(this.storageKey) as string)

    if (storageData) {
      this.favouritesList = storageData;
    }
  }

  toggleFavs(unit: Result): void{
    let toAdd = this.toggleLogic(unit)

    this.snackbarService.toOpenFavStatus(unit, toAdd)
      .pipe(
        map(res => res.dismissedByAction),
        take(1)
      )
      .subscribe(res => {
        if (res) {
          this.toggleLogic(unit)
          this.appRef.tick()
        }
      })
  }

  toggleLogic(unit: Result): boolean{
    let toAdd;

    if (this.isFav(unit.name)) {
      this.favouritesList = this.favouritesList.filter(res => res.name !== unit.name)
      toAdd = false 
    } else {
      this.favouritesList.push(unit)
      toAdd = true
    }

    localStorage.setItem(this.storageKey, JSON.stringify(this.favouritesList))

    return toAdd
  }

  toggleFavsByResponse(unit: OnePokemonResponse): void{
    this.toggleFavs(new ResponseToUnit(unit))
  }

  getFavsList(): Result[]{
    return this.favouritesList
  }

  isFav(unitName: string): boolean{
    return !!this.favouritesList.find(res => res.name === unitName)
  }
}
