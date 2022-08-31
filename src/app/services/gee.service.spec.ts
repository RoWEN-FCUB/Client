import { TestBed } from '@angular/core/testing';

import { GeeService } from './gee.service';

describe('GeeService', () => {
  let service: GeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
