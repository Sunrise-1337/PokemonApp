import { Component, OnInit, inject } from '@angular/core';

import { HomeCard } from '../../interfaces/home-card.interface';
import { TitleService } from '../../services/title.service';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCard, MatCardImage, MatCardContent } from '@angular/material/card';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [NgTemplateOutlet, RouterLink, MatCard, MatCardImage, MatCardContent]
})
export class HomeComponent implements OnInit {
  private titleService = inject(TitleService);

  ngOnInit() {
    this.titleService.toSetAppNameTitle()
  }


  cards: HomeCard[] = [
    {
      name: "Pokedex",
      img: "../../assets/images/pokedex.webp",
      url: "/pokedex/1",
    },
    {
      name: "Berries",
      img: "../../assets/images/berries.webp",
      url: "/berries/1",
    },
    {
      name: "Games",
      img: "../../assets/images/games.webp",
      url: "/games/1",
    }
  ]

}
