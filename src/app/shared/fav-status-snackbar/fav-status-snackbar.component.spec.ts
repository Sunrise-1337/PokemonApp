import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavStatusSnackbarComponent } from './fav-status-snackbar.component';

describe('FavStatusSnackbarComponent', () => {
  let component: FavStatusSnackbarComponent;
  let fixture: ComponentFixture<FavStatusSnackbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavStatusSnackbarComponent]
    });
    fixture = TestBed.createComponent(FavStatusSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
