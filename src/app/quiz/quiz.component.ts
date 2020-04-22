import { Component, OnInit } from "@angular/core";
import { QuizService } from "./shared/quiz.service";
import { Quiz } from "./shared/quiz.model";
import { Question } from "../question/shared/question.model";
import { QuestionService } from "../question/shared/question.service";
import { Observable } from "rxjs";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "app-quiz",
  templateUrl: "./quiz.component.html",
  styleUrls: ["./quiz.component.css"],
})
export class QuizComponent implements OnInit {
  quizzes: Quiz[];
  questions: Question[];
  quiz: Quiz;
  quiz$: Observable<Quiz>;

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private questionService: QuestionService
  ) {}

  ngOnInit() {
    this.quizService
      .getQuizzes()
      .subscribe((quizzes) => (this.quizzes = quizzes));
    this.questionService
      .getQuestions()
      .subscribe((questions) => (this.questions = questions));
    this.quiz$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.quizService.getQuizById(params.get("id"))
      )
    );
    this.quiz$.subscribe((quiz) => (this.quiz = quiz));
  }
}
