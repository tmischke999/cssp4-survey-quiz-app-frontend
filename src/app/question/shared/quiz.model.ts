import { Question } from './question.model';

export class Quiz {
  id: number;
  name: string;
  questions: Question[];
}

export class QuizApiResponse {
  _embedded: {
    quizes: Quiz[];
  };
}