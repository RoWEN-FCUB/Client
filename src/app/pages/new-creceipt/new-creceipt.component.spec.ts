import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCreceiptComponent } from './new-creceipt.component';

describe('NewCreceiptComponent', () => {
  let component: NewCreceiptComponent;
  let fixture: ComponentFixture<NewCreceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCreceiptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCreceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
