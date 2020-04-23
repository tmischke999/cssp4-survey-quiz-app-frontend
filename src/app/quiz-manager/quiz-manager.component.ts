import {Component, OnInit, SecurityContext} from '@angular/core';
import {Quiz} from '../quiz/shared/quiz.model';
import {QuizService} from '../quiz/shared/quiz.service';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {Form, FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Question} from '../question/shared/question.model';
import {Answer} from '../question/shared/answer.model';

@Component({
  selector: 'app-quiz-manager',
  templateUrl: './quiz-manager.component.html',
  styleUrls: ['./quiz-manager.component.css']
})
export class QuizManagerComponent implements OnInit {
  quizForm: FormGroup;
  isEditing: boolean;
  quiz: Quiz;
  tempQuiz: Quiz;
  data: SafeHtml;

  constructor(private quizService: QuizService, private fb: FormBuilder) {
    // this.quizForm = this.fb.group({
    //   content: '',
    //   questions: this.fb.array([
    //     this.fb.group({
    //       content: '',
    //       answers: this.fb.array([
    //         this.fb.group({
    //           content: '',
    //           isCorrect: false
    //         })
    //       ])
    //     })
    //   ])
    // });

    this.quizForm = this.fb.group({
      content: '',
      questions: this.createQuestions(this.quizService.getCurrentQuiz().questions)
    });
  }


  get content() {
    return this.quizForm.get('content');
  }

  get questions(): FormArray {
    return this.quizForm.get('questions') as FormArray;
  }

  get answers(): FormArray {
    return this.quizForm.get('answers') as FormArray;
  }




  ngOnInit() {
    this.quiz = this.quizService.getCurrentQuiz();
    this.tempQuiz = this.quizService.getCurrentQuiz();
    this.isEditing = false;

  }

  createQuestions(questions: Question[]): FormArray {
    const formQuestionArray: FormArray = this.fb.array([]);
    questions.forEach(question => {
      formQuestionArray.push(this.fb.group({
        content: question.content,
        answers: this.createAnswers(question.answers)
      }));
    });
    console.log(formQuestionArray.value);
    return formQuestionArray;
  }

  createAnswers(answers: Answer[]): FormArray {
    const formArray: FormArray = this.fb.array([]);
    answers.forEach(answer => {
      formArray.push(this.fb.group({
        content: answer.content,
        isCorrect: answer.isCorrect
      }));
    });
    return formArray;
  }

  assignValues() {
    //this.quizForm = this.fb.group(this.quiz);
    //this.questions.push(this.createQuestions(this.quiz.questions));
  }

  switchOperation() {
    this.assignValues();
    this.isEditing = !this.isEditing;
  }


  updateQuiz() {
    this.tempQuiz.content = this.quizForm.value.content;
    console.log(this.tempQuiz.content);
    this.tempQuiz.questions = this.quizForm.value.questions;
    console.log(this.tempQuiz.questions[0].content);
    // this.question.quizzes = this.questionForm.value.quizzes;
    // console.log(this.question.quizzes);

    this.quizService.updateQuiz(this.tempQuiz).subscribe(response => {
      console.log('Quiz Updated! ' + response);
    });

    // this.answers.clear();
    // this.questionForm.reset();
  }


}
