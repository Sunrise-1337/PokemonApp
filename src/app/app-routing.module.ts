import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: "", component: HomeComponent
  },  
  
  {
    path: "pokedex/:id", 
      loadComponent: 
        () => import('./pokedex/pokedex.component')
          .then(arg => arg.PokedexComponent)
  },

  {
    path: "pokemon/:id", 
      loadComponent: 
        () => import('./single-pokemon/single-pokemon.component')
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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
