import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PingChildComponent } from './ping-child.component';

describe('PingChildComponent', () => {
  let component: PingChildComponent;
  let fixture: ComponentFixture<PingChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PingChildComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PingChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
