import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RoutesMetaDataConstants } from './constants/routes-meta-data.constants';

export const routes: Routes = [
  {
    path: "",  
    loadComponent: 
      () => import('./pages/home/home.component')
        .then(arg => arg.HomeComponent),
    data: RoutesMetaDataConstants.home
  },  
  
  {
    path: "pokedex/:id", 
    loadComponent: 
      () => import('./pages/pokedex/pokedex.component')
        .then(arg => arg.PokedexComponent),
    data: RoutesMetaDataConstants.pokedex
  },

  {
    path: "pokemon/:id", 
    loadComponent: 
      () => import('./pages/single-pokemon/single-pokemon.component')
        .then(arg => arg.SinglePokemonComponent)
  },

  
  
  {
    path: "pokedex", redirectTo: "pokedex/1"
  },

  {
    path: "pokemon", redirectTo: "pokemon/1"
  },

  {
    path: "**", component: HomeComponent
  }
];