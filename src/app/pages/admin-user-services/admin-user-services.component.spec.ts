import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserServicesComponent } from './admin-user-services.component';

describe('AdminUserServicesComponent', () => {
  let component: AdminUserServicesComponent;
  let fixture: ComponentFixture<AdminUserServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUserServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
