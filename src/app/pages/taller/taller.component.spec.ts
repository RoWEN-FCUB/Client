import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TallerComponent } from './taller.component';

describe('TallerComponent', () => {
  let component: TallerComponent;
  let fixture: ComponentFixture<TallerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TallerComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TallerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
