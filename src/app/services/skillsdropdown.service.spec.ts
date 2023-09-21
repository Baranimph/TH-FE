import { TestBed } from '@angular/core/testing';

import { SkillsdropdownService } from './skillsdropdown.service';

describe('SkillsdropdownService', () => {
  let service: SkillsdropdownService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillsdropdownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
