import { TestBed } from '@angular/core/testing';

import { NgFeaturesService } from './ng-features.service';

describe('NgFeaturesService', () => {
  let service: NgFeaturesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgFeaturesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
