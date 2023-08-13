import { Component, OnInit, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-fav-status-snackbar',
  templateUrl: './fav-status-snackbar.component.html',
  styleUrls: ['./fav-status-snackbar.component.scss']
})
export class FavStatusSnackbarComponent implements OnInit{
  message: string;

  private data: {message: string} = inject(MAT_SNACK_BAR_DATA)
  private thisSnackbar = inject(MatSnackBarRef<FavStatusSnackbarComponent>)

  ngOnInit(): void{
    this.message = this.data.message
  }

  toClose(): void{
    this.thisSnackbar.dismiss()
  }

  toUndo(): void{
    this.thisSnackbar.dismissWithAction()
  }
}
