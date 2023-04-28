import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrePlanDatesComponent } from './pre-plan-dates.component';

describe('PrePlanDatesComponent', () => {
  let component: PrePlanDatesComponent;
  let fixture: ComponentFixture<PrePlanDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrePlanDatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrePlanDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
