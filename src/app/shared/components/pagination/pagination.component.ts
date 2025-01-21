import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, WritableSignal, inject } from '@angular/core';
import { SignalsStoreService } from 'src/app/services/signals-store.service';
import { MatButton } from '@angular/material/button';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
    standalone: true,
    imports: [MatButton, NgClass]
})
export class PaginationComponent implements OnInit, OnChanges{
  @Input() pagesAmount: number;

  @Output() changePage: EventEmitter<number> = new EventEmitter<number>();

  private signalsStoreService = inject(SignalsStoreService)

  pageToOpen: WritableSignal<number> = this.signalsStoreService.pageToBeOpenedOnInit;

  pages: number[] = [];
  currentPage: number = 1;

  totalPages: number = 1;
  minPage: number = 1;
  middlePage: number = 1;

  maxPagesAmount: number = 5;
  halfAmount: number = 2;

  ngOnInit(): void {
    this.range(this.signalsStoreService.pageToBeOpenedOnInit())
  }

  ngOnChanges(changes: SimpleChanges) {
    let pages = changes['pagesAmount'],
        pagesValue = pages?.currentValue

    if (pagesValue < this.maxPagesAmount) {
      this.toAdapt(pagesValue)
    } else {
      this.toAdapt(this.maxPagesAmount)
    }

    this.changePages(this.pageToOpen(), true)
  }

  toAdapt(pages: number): void{
    this.totalPages = pages
    this.minPage = Math.floor(this.totalPages / 2)
    this.middlePage = this.minPage + (this.totalPages % 2 == 0 ? 0 : 1)
  }

  range(start: number): void{
    let arr = [...Array(this.totalPages + 1).keys()].slice(0, this.totalPages)

    this.pages =  arr.map(el => el + start)
  }

  changePages(n: number, doAnyway?: boolean): void {
    if (this.currentPage === n && !doAnyway) return;

    this.changePage.emit(n)

    this.currentPage = n

    if (n === 1 || n - this.minPage <= this.minPage) {
      this.range(1);
    }
    if (n + this.minPage > this.pagesAmount) {
      this.range(n - ((this.minPage - (this.pagesAmount - n)) + this.minPage));
      return
    }
    if(n > this.middlePage){
      this.range(n - this.minPage);
    }
  }

}
