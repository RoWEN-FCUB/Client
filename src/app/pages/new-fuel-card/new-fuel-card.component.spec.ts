import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFuelCardComponent } from './new-fuel-card.component';

describe('NewFuelCardComponent', () => {
  let component: NewFuelCardComponent;
  let fixture: ComponentFixture<NewFuelCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewFuelCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFuelCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
