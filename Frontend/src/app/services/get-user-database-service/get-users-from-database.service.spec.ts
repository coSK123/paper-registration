import { TestBed } from '@angular/core/testing';
import { GetUsersFromDatabaseService } from './get-users-from-database.service';



describe('GetUsersFromDatabaseService', () => {
  let service: GetUsersFromDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetUsersFromDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
