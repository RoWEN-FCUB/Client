import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCproductComponent } from './new-cproduct.component';

describe('NewCproductComponent', () => {
  let component: NewCproductComponent;
  let fixture: ComponentFixture<NewCproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCproductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
