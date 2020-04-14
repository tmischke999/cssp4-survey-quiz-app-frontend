import { Component, OnInit } from "@angular/core";
import { QuizService } from "../quiz/shared/quiz.service";
import { Quiz } from "../quiz/shared/quiz.model";
import { QuestionService } from "../question/shared/question.service";
import { Question } from "../question/shared/question.model";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"]
})
export class HomePageComponent implements OnInit {
  quizzes: Quiz[];
  questions: Question[];

  constructor(
    private quizService: QuizService,
    private questionService: QuestionService
  ) {}

  ngOnInit() {
    this.quizService
      .getQuizzes()
      .subscribe(quizzes => (this.quizzes = quizzes));
    this.questionService
      .getQuestions()
      .subscribe(questions => (this.questions = questions));
  }

  quizSelect(quiz: Quiz) {
    this.quizService.setQuiz(quiz);
  }
}
