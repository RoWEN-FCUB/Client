import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewWRecordComponent } from './new-wrecord.component';

describe('NewWRecordComponent', () => {
  let component: NewWRecordComponent;
  let fixture: ComponentFixture<NewWRecordComponent>;

  beforeEach(waitForAsync(() => {
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
