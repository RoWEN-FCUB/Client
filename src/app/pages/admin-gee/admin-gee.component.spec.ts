import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGeeComponent } from './admin-gee.component';

describe('AdminGeeComponent', () => {
  let component: AdminGeeComponent;
  let fixture: ComponentFixture<AdminGeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
