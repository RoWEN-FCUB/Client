import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWRecordComponent } from './new-wrecord.component';

describe('NewWRecordComponent', () => {
  let component: NewWRecordComponent;
  let fixture: ComponentFixture<NewWRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewWRecordComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewWRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
