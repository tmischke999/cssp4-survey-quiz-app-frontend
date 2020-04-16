import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { QuizSubmission } from './quizSubmission.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizSubmissionService {
  private API = 'http://localhost:8080/quizApp/';
  private quizSubmission: Subject<QuizSubmission> = new Subject();

  constructor(private http: HttpClient) { }

  addQuizSubmission(quizSubmission: QuizSubmission): Observable<QuizSubmission> {
    console.log("Attempting to add to database");
    return this.http.post<QuizSubmission>(this.API + "addQuizSubmission", quizSubmission);
  }
}
