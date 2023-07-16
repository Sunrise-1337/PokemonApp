import { Component } from '@angular/core';

import { HomeCard } from '../interfaces/home-card';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  cards: HomeCard[] = [
    {
      name: "Pokedex",
      img: "../../assets/images/pokedex.jpg",
      url: "/pokedex",
    },
    {
      name: "Berries",
      img: "../../assets/images/berries.jpg",
      url: "/berries",
    },
    {
      name: "Games",
      img: "../../assets/images/games.jpg",
      url: "/games",
    }
  ]

}
