import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorMessageComponent } from '../shared/components/error-message/error-message.component';
import { ErrorMessageDataModel } from '../models/error-message-data.model';

@Injectable({
  providedIn: 'root'
})

export class ErrorMessageService {
  private dialog = inject(MatDialog)

  constructor() { }

  toShowErrorMessage(error: string, message: string): void{
    this.dialog.open(ErrorMessageComponent, {
      data: new ErrorMessageDataModel(error, message),
      height: 'fit-content',
      width: 'fit-content'
    })
  }
}