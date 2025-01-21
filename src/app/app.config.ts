import { provideRouter, withComponentInputBinding } from '@angular/router';
import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TitleCasePipe } from '@angular/common';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { FavouritesService } from './services/favourites.service';
import { ErrorHandlingInterceptorService } from './interceptors/error-handling-interceptor.service';
import { LoaderInterceptorService } from './interceptors/loader-interceptor.service';

export const appConfig: ApplicationConfig = {
    providers: [
        importProvidersFrom(BrowserModule),
        provideRouter(routes, withComponentInputBinding()),
        {
            provide: APP_INITIALIZER,
            useFactory: (favouritesService: FavouritesService) => () => favouritesService.toInitList(),
            deps: [FavouritesService],
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlingInterceptorService,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoaderInterceptorService,
            multi: true
        },
        TitleCasePipe,
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations(), provideClientHydration()
    ]
}