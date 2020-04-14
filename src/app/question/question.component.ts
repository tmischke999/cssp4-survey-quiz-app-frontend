import { Component, OnInit } from "@angular/core";
import { Question } from "./shared/question.model";
import { Answer } from "./shared/answer.model";
import { QuestionService } from "./shared/question.service";
import { FormBuilder, FormGroup, FormArray, FormControl } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: "app-question",
  templateUrl: "./question.component.html",
  styleUrls: ["./question.component.css"]
})
export class QuestionComponent implements OnInit {
  question: Question = new Question();
  questions: Question[];
  questionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionService // <-- Need to fix url in question service before continuing
  ) {
    this.questionForm = this.fb.group({
      content: "",
      answers: this.fb.array([])
    });
  }

  get answers(): FormArray {
    return this.questionForm.get("answers") as FormArray;
  }

  get content() {
    return this.questionForm.get("content");
  }

  newAnswer(): FormGroup {
    return this.fb.group({
      content: "",
      isCorrect: false
    });
  }

  addAnswers() {
    this.answers.push(this.newAnswer());
  }

  submitQuestion() {
    this.question.content = this.questionForm.value.content;
    console.log(this.question.content);
    this.question.answers = this.questionForm.value.answers;
    console.log(this.question.answers);

    this.questionService.addQuestion(this.question).subscribe(response => {
      console.log("Question submitted! " + response);
    });

    this.answers.clear();
    this.questionForm.reset();
  }

  ngOnInit() {
    // this.bikeService.getBikes().subscribe(bikes => (this.bikes = bikes));
    this.questionService
      .getQuestions()
      .subscribe(questions => (this.questions = questions));
  }
}
