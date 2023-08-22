import { Component, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent {
  public data: {error: string, message: string} = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<ErrorMessageComponent>)

  closeDialog(): void{
    this.dialogRef.close()
  }
}
