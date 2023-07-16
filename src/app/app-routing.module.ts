import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PokedexComponent } from './pokedex/pokedex.component';

const routes: Routes = [
  // {path: "/:id", component: }
  {path: "", component: HomeComponent},
  {path: "pokedex", component: PokedexComponent},
  {path: "pokedex/:id", component: PokedexComponent},
  // {path: "pokemon/:id", component: PokemonComponent},
  // {path: }
  {path: "**", component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
