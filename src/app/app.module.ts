import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FavStatusSnackbarComponent } from './shared/fav-status-snackbar/fav-status-snackbar.component';
import { TitleCasePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { provideRouter, withComponentInputBinding } from '@angular/router';
import { AppRoutingModule, routes } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { SharedModule } from './shared/shared-module/shared.module';

import { LoaderInterceptorService } from './interceptors/loader-interceptor.service';
import { ErrorHandlingInterceptorService } from './interceptors/error-handling-interceptor.service';
import { ErrorMessageComponent } from './shared/error-message/error-message.component';
import { FavouritesService } from './services/favourites.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoaderComponent,
    FavStatusSnackbarComponent,
    ErrorMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    TitleCasePipe
  ],
  providers: [
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
    TitleCasePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
