import { Component, OnInit, inject } from '@angular/core';
import { FavouritesService } from './services/favourites.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'pokemonApp';

  favsService = inject(FavouritesService)

  ngOnInit(): void{
    this.favsService.toInitList()
  }
}
