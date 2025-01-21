import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { OnePokemonResponse } from '../interfaces/one-pokemon-response.interface';
import { Result } from '../models/result';
import { ResponseToUnit } from '../models/responseToUnit';
import { SnackbarService } from './snackbar.service';
import { map, take } from 'rxjs';
import { AllResultsResponse } from '../models/all-results-response';
import { SubjectsNotificationService } from './signals-notification.service';
import { isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {
  favouritesList: Result[] = [];
  storageKey = 'favouritesList';

  private snackbarService = inject(SnackbarService)
  private subjectsNotificationService = inject(SubjectsNotificationService)
  private platformId = inject(PLATFORM_ID)

  toInitList(): void{
    if (isPlatformServer(this.platformId)) return

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
      
          this.subjectsNotificationService.updateViewNotificationSubject.next(true)
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

  getFavsList(amount: number = 0, page: number = 0): AllResultsResponse{
    const offset = amount * page,
          realCount = this.favouritesList.length;

    let limit = (offset + amount) > realCount ? realCount : amount;

    console.log(offset, limit)
    console.log(new AllResultsResponse(realCount, limit ? this.favouritesList.slice(offset, limit) : this.favouritesList))

    return new AllResultsResponse(realCount, limit ? this.favouritesList.slice(offset, limit) : this.favouritesList)
  }

  isFav(unitName: string): boolean{
    return !!this.favouritesList.find(res => res.name === unitName)
  }
}
