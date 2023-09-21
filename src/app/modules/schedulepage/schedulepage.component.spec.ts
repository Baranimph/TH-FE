import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulepageComponent } from './schedulepage.component';

describe('SchedulepageComponent', () => {
  let component: SchedulepageComponent;
  let fixture: ComponentFixture<SchedulepageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchedulepageComponent]
    });
    fixture = TestBed.createComponent(SchedulepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
