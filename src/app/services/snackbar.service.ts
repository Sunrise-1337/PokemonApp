import { Injectable, inject } from '@angular/core';
import { FavStatusSnackbarComponent } from '../shared/fav-status-snackbar/fav-status-snackbar.component';
import { MatSnackBar, MatSnackBarDismiss } from '@angular/material/snack-bar';
import { TitleCasePipe } from '@angular/common';
import { Result } from '../interfaces/result';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  
  private snackBar = inject(MatSnackBar)
  private capitalize = inject(TitleCasePipe)

  constructor() { }

  toOpenFavStatus(unit: Result, toAdd: boolean): Observable<MatSnackBarDismiss>{
    this.snackBar.dismiss()

    let snackBarRef = this.snackBar.openFromComponent(
      FavStatusSnackbarComponent , 
      {
        horizontalPosition: 'center', 
        verticalPosition: 'bottom', 
        duration: 3000,
        data: {
          message: `${this.capitalize.transform(unit.name)} has been ${toAdd ? 'added to ' : 'deleted from ' } your favourites`
        }
      }
    )

    return snackBarRef.afterDismissed()
  }
}
