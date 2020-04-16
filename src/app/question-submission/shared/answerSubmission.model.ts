import { QuestionSubmission } from "./questionSubmission.model";

export class AnswerSubmission {
  id: number;
  content: string;
  isCorrect: boolean;
  isSelected: boolean;
  question?: QuestionSubmission;
  question_id?: number;
}

export class AnswerSubmissionApiResponse {
  answers: AnswerSubmission[];
}
