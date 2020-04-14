import { Injectable } from '@angular/core';
import { QuestionApiResponse, Question } from './question.model';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class QuestionService {
  private API = 'http://localhost:8080/quizApp/';
  private questions: Subject<Question[]> = new Subject();

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<Question[]> {
    this.http.get<QuestionApiResponse>(this.API + "questions").subscribe(
      resp => {
        this.questions.next(resp.questions);
      },
      error => {
        console.log(error.statusText, error.status, error.message);
      }
    );
    return this.questions;
  }

  addQuestion(question: Question): Observable<Question> {
    console.log("Attempting to add to database");
    return this.http.post<Question>(this.API + "addQuestion", question);
  }
}
