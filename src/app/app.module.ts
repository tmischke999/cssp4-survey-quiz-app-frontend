import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionComponent } from './question/question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './home-page/home-page.component';
import { QuizComponent } from './quiz/quiz.component';
import { TakeQuizComponent } from './take-quiz/take-quiz.component';
import { QuizSubmissionComponent } from './quiz-submission/quiz-submission.component';
import { QuestionSubmissionComponent } from './question-submission/question-submission.component';
import { AnswerSubmissionComponent } from './answer-submission/answer-submission.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    HomePageComponent,
    QuizComponent,
    TakeQuizComponent,
    QuizSubmissionComponent,
    QuestionSubmissionComponent,
    AnswerSubmissionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
