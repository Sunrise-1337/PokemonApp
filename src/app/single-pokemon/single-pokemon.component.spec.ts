import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePokemonComponent } from './single-pokemon.component';

describe('SinglePokemonComponent', () => {
  let component: SinglePokemonComponent;
  let fixture: ComponentFixture<SinglePokemonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SinglePokemonComponent]
    });
    fixture = TestBed.createComponent(SinglePokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
