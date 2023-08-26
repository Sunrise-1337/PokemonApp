import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  updateViewNotificationSignal: Subject<boolean> = new Subject<boolean>()

  constructor() { }
}
