import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexFiltersComponent } from './pokedex-filters.component';

describe('PokedexFiltersComponent', () => {
  let component: PokedexFiltersComponent;
  let fixture: ComponentFixture<PokedexFiltersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokedexFiltersComponent]
    });
    fixture = TestBed.createComponent(PokedexFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
