import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FavStatusSnackbarComponent } from './shared/fav-status-snackbar/fav-status-snackbar.component';
import { TitleCasePipe } from '@angular/common';

import { provideRouter, withComponentInputBinding } from '@angular/router';
import { AppRoutingModule, routes } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoaderComponent } from './shared/loader/loader.component';

import { SharedModule } from './shared/shared/shared.module';

import { LoaderInterceptorService } from './interceptors/loader-interceptor.service';
import { FavouritesService } from './services/favourites.service';
import { SnackbarService } from './services/snackbar.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoaderComponent,
    FavStatusSnackbarComponent
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
      provide: HTTP_INTERCEPTORS, 
      useClass: LoaderInterceptorService, 
      multi: true
    },
    TitleCasePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
