import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorMessageComponent } from '../shared/error-message/error-message.component';

@Injectable({
  providedIn: 'root'
})

export class ErrorMessageService {
  private dialog = inject(MatDialog)

  constructor() { }

  toShowErrorMessage(error: string, message: string): void{
    this.dialog.open(ErrorMessageComponent, {
      data: {error, message},
      height: 'fit-content',
      width: 'fit-content'
    })
  }
}