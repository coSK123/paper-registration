import { TestBed } from '@angular/core/testing';

import { CreatePaperIdeaService } from './create-paper-idea.service';

describe('CreatePaperIdeaService', () => {
  let service: CreatePaperIdeaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatePaperIdeaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
