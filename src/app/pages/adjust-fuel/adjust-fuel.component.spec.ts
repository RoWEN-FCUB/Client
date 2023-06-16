import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjustFuelComponent } from './adjust-fuel.component';

describe('AdjustFuelComponent', () => {
  let component: AdjustFuelComponent;
  let fixture: ComponentFixture<AdjustFuelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdjustFuelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdjustFuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
