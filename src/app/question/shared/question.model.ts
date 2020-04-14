import { Answer } from './answer.model';
import { Quiz } from '../../quiz/shared/quiz.model';

export class Question {
  id: number;
  content: string;
  quizzes?: Quiz[];
  answers: Answer[];
}