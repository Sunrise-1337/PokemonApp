import { Component, OnInit, inject } from '@angular/core';

import { HomeCard } from '../interfaces/home-card.interface';
import { TitleService } from '../services/title.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private titleService = inject(TitleService);

  ngOnInit() {
    this.titleService.toSetAppNameTitle()
  }


  cards: HomeCard[] = [
    {
      name: "Pokedex",
      img: "../../assets/images/pokedex.jpg",
      url: "/pokedex/1",
    },
    {
      name: "Berries",
      img: "../../assets/images/berries.jpg",
      url: "/berries/1",
    },
    {
      name: "Games",
      img: "../../assets/images/games.jpg",
      url: "/games/1",
    }
  ]

}
