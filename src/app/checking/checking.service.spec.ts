import { TestBed } from '@angular/core/testing';

import { CheckingService } from './checking.service';

describe('CheckingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckingService = TestBed.get(CheckingService);
    expect(service).toBeTruthy();
  });
});
