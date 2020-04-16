import { Component, OnInit } from "@angular/core";
import { QuizService } from "../quiz/shared/quiz.service";
import { Quiz } from "../quiz/shared/quiz.model";
import { Question } from "../question/shared/question.model";
import { QuestionService } from "../question/shared/question.service";
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { QuizSubmission } from '../quiz-submission/shared/quizSubmission.model';
import { QuestionSubmission } from '../question-submission/shared/questionSubmission.model';
import { QuizSubmissionService } from '../quiz-submission/shared/quiz-submission.service';

@Component({
  selector: 'app-take-quiz',
  templateUrl: './take-quiz.component.html',
  styleUrls: ['./take-quiz.component.css']
})
export class TakeQuizComponent implements OnInit {
  quizzes: Quiz[];
  quiz: Quiz;
  questions: Question[];
  questionSubmissions: QuestionSubmission[];
  quizSubmissionForm: FormGroup;
  quizSubmission: QuizSubmission;

  constructor(
    private quizSubmissionService: QuizSubmissionService,
    private quizService: QuizService,
    private questionService: QuestionService,
    private fb: FormBuilder
  ) {
    this.quizSubmissionForm = this.fb.group({
      questionSubmissions: this.fb.array([])
    });
  }

  submitQuizSubmission() {
    this.quizSubmission.content = this.quizService.getCurrentQuiz().content;
    this.quizSubmission.questionSubmissions = this.quizSubmissionForm.value.questionSubmissions;

    this.quizSubmissionService.addQuizSubmission(this.quizSubmission).subscribe(response => {
      console.log("Quiz submitted! " + response);
    });

    this.quizSubmissionForm.reset();
  }

  ngOnInit() {
    this.quizService
      .getQuizzes()
      .subscribe(quizzes => (this.quizzes = quizzes));
    this.questionService
      .getQuestions()
      .subscribe(questions => (this.questions = questions));
    this.quiz = this.quizService.getCurrentQuiz();
  }
}
