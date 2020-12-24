import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeeComponent } from './gee.component';

describe('GeeComponent', () => {
  let component: GeeComponent;
  let fixture: ComponentFixture<GeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
