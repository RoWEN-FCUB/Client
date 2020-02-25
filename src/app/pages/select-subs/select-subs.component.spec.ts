import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSubsComponent } from './select-subs.component';

describe('SelectSubsComponent', () => {
  let component: SelectSubsComponent;
  let fixture: ComponentFixture<SelectSubsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSubsComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
