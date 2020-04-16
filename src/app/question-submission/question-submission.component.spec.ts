import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionSubmissionComponent } from './question-submission.component';

describe('QuestionSubmissionComponent', () => {
  let component: QuestionSubmissionComponent;
  let fixture: ComponentFixture<QuestionSubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionSubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
