import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdtWRecordComponent } from './updt-wrecord.component';

describe('UpdtWRecordComponent', () => {
  let component: UpdtWRecordComponent;
  let fixture: ComponentFixture<UpdtWRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdtWRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdtWRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
