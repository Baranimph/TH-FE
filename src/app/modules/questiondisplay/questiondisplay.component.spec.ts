import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestiondisplayComponent } from './questiondisplay.component';

describe('QuestiondisplayComponent', () => {
  let component: QuestiondisplayComponent;
  let fixture: ComponentFixture<QuestiondisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestiondisplayComponent]
    });
    fixture = TestBed.createComponent(QuestiondisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
