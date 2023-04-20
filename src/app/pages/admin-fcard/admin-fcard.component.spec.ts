import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFcardComponent } from './admin-fcard.component';

describe('AdminFcardComponent', () => {
  let component: AdminFcardComponent;
  let fixture: ComponentFixture<AdminFcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFcardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
