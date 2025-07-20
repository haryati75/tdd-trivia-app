export interface Question {
  id: number;
  question: string;
  options: string[];
  correct_answer: number;
  category: string;
  difficulty_level: 'Easy' | 'Medium' | 'Hard';
}

export interface QuizState {
  score: number;
  currentQuestionIndex: number;
  selectedAnswer: string;
  selectedAnswerIndex: number;
  isAnswerConfirmed: boolean;
  startTime: Date | null;
  endTime: Date | null;
}

export interface ScoreAssessment {
  emoji: string;
  message: string;
}

export interface AnswerFeedback {
  message: string;
  emoji: string;
}
