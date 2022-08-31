import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGeeComponent } from './new-gee.component';

describe('NewGeeComponent', () => {
  let component: NewGeeComponent;
  let fixture: ComponentFixture<NewGeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewGeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
