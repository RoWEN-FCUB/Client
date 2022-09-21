import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGrecordComponent } from './new-grecord.component';

describe('NewGrecordComponent', () => {
  let component: NewGrecordComponent;
  let fixture: ComponentFixture<NewGrecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewGrecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGrecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
