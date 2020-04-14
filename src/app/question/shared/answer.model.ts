import { Question } from "./question.model";

export class Answer {
  id: number;
  content: string;
  isCorrect: boolean;
  question?: Question;
  question_id?: number;
}

export class AnswerApiResponse {
  answers: Answer[];
}
