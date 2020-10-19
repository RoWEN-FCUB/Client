import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyPlansComponent } from './energy-plans.component';

describe('EnergyPlansComponent', () => {
  let component: EnergyPlansComponent;
  let fixture: ComponentFixture<EnergyPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnergyPlansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnergyPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
