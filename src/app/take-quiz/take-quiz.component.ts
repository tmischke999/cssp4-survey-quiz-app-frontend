import { Component, OnInit } from "@angular/core";
import { QuizService } from "../quiz/shared/quiz.service";
import { Quiz } from "../quiz/shared/quiz.model";
import { Question } from "../question/shared/question.model";
import { QuestionService } from "../question/shared/question.service";

@Component({
  selector: 'app-take-quiz',
  templateUrl: './take-quiz.component.html',
  styleUrls: ['./take-quiz.component.css']
})
export class TakeQuizComponent implements OnInit {
  quizzes: Quiz[];
  questions: Question[];
  quiz: Quiz;

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
    this.quiz = this.quizService.getCurrentQuiz();
  }
}
