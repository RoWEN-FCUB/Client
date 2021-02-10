import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WpartsComponent } from './wparts.component';

describe('WpartsComponent', () => {
  let component: WpartsComponent;
  let fixture: ComponentFixture<WpartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WpartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WpartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
