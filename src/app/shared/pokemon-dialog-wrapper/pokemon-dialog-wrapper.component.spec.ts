import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDialogWrapperComponent } from './pokemon-dialog-wrapper.component';

describe('PokemonDialogWrapperComponent', () => {
  let component: PokemonDialogWrapperComponent;
  let fixture: ComponentFixture<PokemonDialogWrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonDialogWrapperComponent]
    });
    fixture = TestBed.createComponent(PokemonDialogWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
