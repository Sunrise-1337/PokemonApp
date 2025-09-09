import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectsNotificationService {
  updateViewNotificationSubject: Subject<boolean> = new Subject()
  updateLoaderNotificationSubject: Subject<boolean> = new Subject()
}
