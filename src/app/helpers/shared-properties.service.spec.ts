import { TestBed } from '@angular/core/testing';

import { SharedPropertiesService } from './shared-properties.service';

describe('SharedPropertiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedPropertiesService = TestBed.get(SharedPropertiesService);
    expect(service).toBeTruthy();
  });
});
