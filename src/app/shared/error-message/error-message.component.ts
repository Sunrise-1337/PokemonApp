import { Component, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ErrorMessageData } from 'src/app/classes/error-message-data';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent {
  public data: ErrorMessageData = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<ErrorMessageComponent>)

  closeDialog(): void{
    this.dialogRef.close()
  }
}
