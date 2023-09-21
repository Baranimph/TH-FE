import { TestBed } from '@angular/core/testing';

import { SchedulePageService } from './schedule-page.service';

describe('SchedulePageService', () => {
  let service: SchedulePageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchedulePageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
