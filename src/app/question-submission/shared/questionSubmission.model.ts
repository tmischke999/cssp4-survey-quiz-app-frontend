import { AnswerSubmission } from './answerSubmission.model';
import { QuizSubmission } from '../../quiz-submission/shared/quizSubmission.model';

export class QuestionSubmission {
  id: number;
  content: string;
  quizzes?: QuizSubmission[];
  answers: AnswerSubmission[];
}