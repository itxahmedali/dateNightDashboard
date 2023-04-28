import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PingsComponent } from './pings.component';

describe('PingsComponent', () => {
  let component: PingsComponent;
  let fixture: ComponentFixture<PingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
