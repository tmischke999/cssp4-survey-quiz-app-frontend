import { QuestionSubmission } from '../../question-submission/shared/questionSubmission.model';

export class QuizSubmission {
  id: number;
  content: string;
  questionSubmissions: QuestionSubmission[];
}