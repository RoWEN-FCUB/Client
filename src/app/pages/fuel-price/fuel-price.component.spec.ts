import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelPriceComponent } from './fuel-price.component';

describe('FuelPriceComponent', () => {
  let component: FuelPriceComponent;
  let fixture: ComponentFixture<FuelPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuelPriceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuelPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
