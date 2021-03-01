import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCproviderComponent } from './new-cprovider.component';

describe('NewCproviderComponent', () => {
  let component: NewCproviderComponent;
  let fixture: ComponentFixture<NewCproviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCproviderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCproviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
