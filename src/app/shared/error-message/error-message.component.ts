import { Component, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ErrorMessageData } from 'src/app/classes/error-message-data';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-error-message',
    templateUrl: './error-message.component.html',
    styleUrls: ['./error-message.component.scss'],
    standalone: true,
    imports: [MatButton]
})
export class ErrorMessageComponent {
  public data: ErrorMessageData = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<ErrorMessageComponent>)

  closeDialog(): void{
    this.dialogRef.close()
  }
}
