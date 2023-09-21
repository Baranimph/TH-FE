import { TestBed } from '@angular/core/testing';

import { ManagernameService } from './managername.service';

describe('ManagernameService', () => {
  let service: ManagernameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagernameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
