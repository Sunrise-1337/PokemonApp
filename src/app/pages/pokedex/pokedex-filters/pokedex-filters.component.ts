import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ResultModel } from 'src/app/models/result.model';
import { FilterDataModel } from 'src/app/models/filterData.model';

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
  @Input() regionsArray: ResultModel[];
  @Input() typesArray: ResultModel[];

  @Input() initialFilter: string = 'all';

  @Output() newFilterApplied: EventEmitter<FilterDataModel> = new EventEmitter()

  activeFilter: string = '';

  ngOnInit(): void {
    this.activeFilter = this.initialFilter
  }

  handleNewFilterValue(sector: string, unit: ResultModel = new ResultModel(sector, '')): void{
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
