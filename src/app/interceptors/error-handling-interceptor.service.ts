import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { ApplicationRef, Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ErrorMessageService } from '../services/error-message.service';
import { LoaderService } from 'src/app/services/loader.service'
import { SubjectsService } from '../services/subjects.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingInterceptorService implements HttpInterceptor {

  private errorService = inject(ErrorMessageService)
  private loaderService = inject(LoaderService)
  private subjectsService = inject(SubjectsService)
  private appRef = inject(ApplicationRef)

  // Error
  // http://localhost:4200/pokemon/10115

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError((res) => {
          this.loaderService.toHideLoader()
          // TODO
          // Check Change Detection
          // this.subjectsService.updateViewNotificationSignal.next(true)
          this.appRef.tick()
          this.errorService.toShowErrorMessage(res.error, res.message)

          return throwError(() => res)
        })
      )
  }
}
