import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Quiz } from './quiz.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class QuizService {
  private API = 'http://localhost:8080/quizApp/';
  private quizzes: Subject<Quiz[]> = new Subject();
  private quiz: Subject<Quiz> = new Subject();
  private currentQuiz: Quiz;

  constructor(private http: HttpClient) { }

  getQuizzes(): Observable<Quiz[]> {
    this.http.get<Quiz[]>(this.API + "quizzes").subscribe(
      resp => {
        this.quizzes.next(resp);
      },
      error => {
        console.log(error.statusText, error.status, error.message);
      }
    );
    return this.quizzes;
  }

  addQuiz(question: Quiz): Observable<Quiz> {
    console.log("Attempting to add to database");
    return this.http.post<Quiz>(this.API + "addQuiz", question);
  }

  getQuiz(quiz: Quiz): Observable<Quiz> {
    this.http.get<Quiz>(this.API + "quiz/" + quiz.id).subscribe(
      resp => {
        this.quiz.next(resp);
      },
      error => {
        console.log(error.statusText, error.status, error.message);
      }
    );
    return this.quiz;
  }

  getQuizById(id: string): Observable<Quiz> {
    this.http.get<Quiz>(this.API + "quiz/" + id).subscribe(
      resp => {
        this.quiz.next(resp);
      },
      error => {
        console.log(error.statusText, error.status, error.message);
      }
    );
    return this.quiz;
  }

  setQuiz(quiz: Quiz) {
    this.currentQuiz = quiz;
  }

  getCurrentQuiz(): Quiz {
    return this.currentQuiz;
  }
}

