import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Result } from 'src/app/models/result';
import { FilterData } from 'src/app/models/filterData';

import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatExpansionModule} from '@angular/material/expansion';


@Component({
  standalone: true,
  selector: 'app-pokedex-filters',
  templateUrl: './pokedex-filters.component.html',
  styleUrls: ['./pokedex-filters.component.scss'],  
  imports: [
    CommonModule,
    RouterModule,
    MatCheckboxModule,
    MatExpansionModule
  ]
})
export class PokedexFiltersComponent implements OnInit{
  @Input() regionsArray: Result[];
  @Input() typesArray: Result[];

  @Input() initialFilter: string = 'all';

  @Output() newFilterApplied: EventEmitter<FilterData> = new EventEmitter()

  activeFilter: string = '';

  ngOnInit(): void {
    this.activeFilter = this.initialFilter
  }

  handleNewFilterValue(sector: string, unit: Result = new Result(sector, '')): void{
    this.activeFilter = unit.name;

    this.newFilterApplied.emit({
      sector,
      unit
    })
  }

  isFilterActive(filter: string): boolean{
    return this.activeFilter === filter
  }
}
