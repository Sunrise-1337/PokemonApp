import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: "", component: HomeComponent
  },  
  
  {
    path: "pokedex/:id", 
      loadComponent: 
        () => import('./pages/pokedex/pokedex.component')
          .then(arg => arg.PokedexComponent)
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