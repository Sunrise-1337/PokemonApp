import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogClose} from '@angular/material/dialog';
import { ErrorMessageDataModel } from 'src/app/models/error-message-data.model';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-error-message',
    templateUrl: './error-message.component.html',
    styleUrls: ['./error-message.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButton, MatDialogClose]
})
export class ErrorMessageComponent {
  public data: ErrorMessageDataModel = inject(MAT_DIALOG_DATA);
}
