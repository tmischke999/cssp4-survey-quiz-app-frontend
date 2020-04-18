import { QuestionSubmission } from "./questionSubmission.model";
import { Answer } from "src/app/question/shared/answer.model";

export class AnswerSubmission {
  id: number;
  content: string;
  isCorrect: boolean;
  isSelected: boolean;
  question?: QuestionSubmission;
  question_id?: number;

  constructor(
    id: number,
    content: string,
    isCorrect: boolean,
    isSelected: boolean
  ) {
    this.id = id;
    this.content = content;
    this.isCorrect = isCorrect;
    this.isSelected = isSelected;
  }

  static convertAnswerToAnswerSubmission(answer: Answer): AnswerSubmission {
    let a: AnswerSubmission = new AnswerSubmission(
      answer.id,
      answer.content,
      answer.isCorrect,
      false
    );
    return a;
  }
}

export class AnswerSubmissionApiResponse {
  answers: AnswerSubmission[];
}
