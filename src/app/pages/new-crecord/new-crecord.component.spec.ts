import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCrecordComponent } from './new-crecord.component';

describe('NewCrecordComponent', () => {
  let component: NewCrecordComponent;
  let fixture: ComponentFixture<NewCrecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCrecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCrecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
