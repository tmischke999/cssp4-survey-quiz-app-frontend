import { Answer } from './answer.model';
import { Quiz } from './quiz.model';

export class Question {
  id: number;
  content: string;
  quizzes: Quiz[];
  answers: Answer[];
}

export class QuestionApiResponse {
  questions: [{
    id: number;
    content: string;
    quizzes: Quiz[];
    answers: Answer[];
  }]
}