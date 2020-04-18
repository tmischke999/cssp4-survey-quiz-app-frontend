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
import { Answer } from "../question/shared/answer.model";

@Component({
  selector: "app-take-quiz",
  templateUrl: "./take-quiz.component.html",
  styleUrls: ["./take-quiz.component.css"],
})
export class TakeQuizComponent implements OnInit {
  quizzes: Quiz[];
  quiz: Quiz;
  // questions: Question[];
  // questionSubmissions: QuestionSubmission[];
  quizSubmissionForm: FormGroup;
  quizSubmission: QuizSubmission;

  constructor(
    private quizSubmissionService: QuizSubmissionService,
    private quizService: QuizService,
    private questionService: QuestionService,
    private fb: FormBuilder
  ) {
    this.quizSubmission = this.convertQuizToQuizSubmission(
      this.quizService.getCurrentQuiz()
    );

    console.log("******** the plan is to loop like this:");
    console.log("For quiz: " + this.quizSubmission.content);

    this.quizSubmission.questionSubmissions.forEach((question) => {
      console.log(question.content);
      question.answers.forEach((answer) => {
        console.log(`\t${answer.content}`);
      });
    });

    console.log("@@@@@ end of plan debuggin output");

    this.quizSubmissionForm = this.fb.group({
      content: this.quizSubmission.content,
      questions: this.fb.array([]),
    });

    this.quizSubmission.questionSubmissions.forEach((question) => {
      console.log("Expected question content: " + question.content)
      this.questions.push(this.fb.group({ content: question.content }));
    });

    /* ------------------------------------------------------

    this.quizSubmissionForm = this.fb.group({
      questionSubmissions: this.fb.array([
        this.fb.group({
          content: "",
          answers: this.fb.array(
            this.quizSubmission.questionSubmissions.map((q) => q.answers)
          ),
        }),
      ]),
    });
    
    --------------------------------------------------------*/
  }

  get answers(): FormArray {
    return this.quizSubmissionForm.get("answers") as FormArray;
  }

  get questions(): FormArray {
    return this.quizSubmissionForm.get("questions") as FormArray;
  }

  convertQuizToQuizSubmission(quiz: Quiz): QuizSubmission {
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

  submitQuizSubmission() {
    console.log(this.quizService.getCurrentQuiz().content);
    console.log(this.quizSubmissionForm.value.questionSubmissions);

    this.quizSubmission.content = this.quizService.getCurrentQuiz().content;

    console.log(this.quizSubmission.content);
    this.quizSubmission.questionSubmissions = this.quizSubmissionForm.value.questionSubmissions;
    console.log(this.quizSubmission.questionSubmissions);

    this.quizSubmissionService
      .addQuizSubmission(this.quizSubmission)
      .subscribe((response) => {
        console.log("Quiz submitted! " + response);
      });

    this.quizSubmissionForm.reset();
  }

  ngOnInit() {
    this.quizService
      .getQuizzes()
      .subscribe((quizzes) => (this.quizzes = quizzes));
    // this.questionService
    //   .getQuestions()
    //   .subscribe((questions) => (this.questions = questions));
    this.quiz = this.quizService.getCurrentQuiz();
  }
}
