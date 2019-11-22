import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskWeekComponent } from './task-week.component';

describe('TaskWeekComponent', () => {
  let component: TaskWeekComponent;
  let fixture: ComponentFixture<TaskWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
