import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoPlaceComponent } from './auto-place.component';

describe('AutoPlaceComponent', () => {
  let component: AutoPlaceComponent;
  let fixture: ComponentFixture<AutoPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoPlaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
