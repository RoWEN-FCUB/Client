import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliversComponent } from './delivers.component';

describe('DeliversComponent', () => {
  let component: DeliversComponent;
  let fixture: ComponentFixture<DeliversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliversComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
