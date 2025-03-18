import { TestBed } from '@angular/core/testing';

import { ActiveSemesterService } from './active-semester.service';

describe('ActiveSemesterService', () => {
  let service: ActiveSemesterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveSemesterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
