import { Question } from '../../question/shared/question.model';

export class Quiz {
  id: number;
  content: string;
  questions: Question[];
}