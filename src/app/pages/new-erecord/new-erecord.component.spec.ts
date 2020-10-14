import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewErecordComponent } from './new-erecord.component';

describe('NewErecordComponent', () => {
  let component: NewErecordComponent;
  let fixture: ComponentFixture<NewErecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewErecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewErecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
