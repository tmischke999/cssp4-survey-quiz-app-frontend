import { Component, OnInit } from "@angular/core";
import { QuizService } from "../quiz/shared/quiz.service";
import { Quiz } from "../quiz/shared/quiz.model";
import { Question } from "../question/shared/question.model";
import { QuestionService } from "../question/shared/question.service";
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";
import { QuizSubmission } from "../quiz-submission/shared/quizSubmission.model";
import { QuestionSubmission } from "../question-submission/shared/questionSubmission.model";
import { QuizSubmissionService } from "../quiz-submission/shared/quiz-submission.service";
import { AnswerSubmission } from "../question-submission/shared/answerSubmission.model";
import { Observable } from "rxjs";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "app-take-quiz",
  templateUrl: "./take-quiz.component.html",
  styleUrls: ["./take-quiz.component.css"],
})
export class TakeQuizComponent implements OnInit {
  quiz$: Observable<Quiz>;
  quizSubmission: QuizSubmission;
  quizSubmissionForm: FormGroup;
  quizSubmitted: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private quizSubmissionService: QuizSubmissionService,
    private fb: FormBuilder
  ) {
    this.quizSubmissionForm = this.fb.group({
      content: "",
      questions: this.fb.array([])
    });
  }

  get answers(): FormArray {
    return this.quizSubmissionForm.get("answers") as FormArray;
  }

  get questions(): FormArray {
    return this.quizSubmissionForm.get("questions") as FormArray;
  }

  submitQuizSubmission() {
    console.log("Attempting to submit Quiz Submission.");

    this.quizSubmission.questionSubmissions = this.quizSubmissionForm.value.questions;
    this.quizSubmissionService
      .addQuizSubmission(this.quizSubmission)
      .subscribe((response) => {
        console.log("Quiz submitted! " + response);
      });
      
      this.quizSubmitted = true;
  }

  convertQuizToQuizSubmission(quiz: Quiz): QuizSubmission {
    console.log("=======================================");
    console.log("Running 'convertQuizToQuizSubmission(" + quiz.content + ")'"); // currently, "quiz" is coming back as undefineds
    console.log("Quiz content: " + quiz.content);
    let quizSub: QuizSubmission = new QuizSubmission();
    quizSub.content = quiz.content;
    quizSub.questionSubmissions = quiz.questions.map((q) => {
      // Step 1: make array of answerSubmissions
      let answerSubmission: AnswerSubmission[] = q.answers.map((a) => {
        return AnswerSubmission.convertAnswerToAnswerSubmission(a);
      });

      // Step 2: use array to build questionSubmission
      let questionSubmission: QuestionSubmission = new QuestionSubmission(
        q.id,
        q.content,
        answerSubmission
      );
      return questionSubmission;
    });

    console.log(quizSub);
    return quizSub;
  }

  addQuizToFormBuilder(quiz: QuizSubmission) {
    this.quizSubmissionForm.value.content = quiz.content;

    quiz.questionSubmissions.forEach((question) => {
      console.log("Expected question content: " + question.content);
      this.questions.push(
        this.fb.group({ 
          content: question.content,
          answers: this.setAnswers(question)
        })
       );
    });
  }

  setAnswers(questionSub: QuestionSubmission) {
    let arr = new FormArray([])
    questionSub.answers.forEach(answer => {
      arr.push(this.fb.group({ 
        content: answer.content,
        isCorrect: answer.isCorrect,
        isSelected: false
      }))
    })
    return arr;

  }

  ngOnInit() {
    this.quiz$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.quizService.getQuizById(params.get("id"))
      )
    );
    this.quiz$.subscribe(
      (quiz) => {
        this.quizSubmission = this.convertQuizToQuizSubmission(quiz);
        this.addQuizToFormBuilder(this.quizSubmission);
      }
    );
  }
}
