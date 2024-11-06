import { TestBed } from '@angular/core/testing';

import { LaborerService } from './laborer.service';

describe('LaborerService', () => {
  let service: LaborerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaborerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
