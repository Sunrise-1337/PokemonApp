import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { Result } from 'src/app/classes/result';
import { FilterData } from 'src/app/classes/filterData';

@Component({
  standalone: true,
  selector: 'app-pokedex-filters',
  templateUrl: './pokedex-filters.component.html',
  styleUrls: ['./pokedex-filters.component.scss'],  
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
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
  
  getTrackForButtons(index: number, item: Result): string{
    return item.url
  }
}
