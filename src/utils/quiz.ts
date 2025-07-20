import { 
  DIFFICULTY_SCORES, 
  DIFFICULTY_EMOJIS, 
  PERFORMANCE_THRESHOLDS,
  FEEDBACK_MESSAGES,
  FEEDBACK_EMOJIS,
  SCORE_ASSESSMENTS
} from '../constants/quiz';
import type { Question, ScoreAssessment, AnswerFeedback } from '../types/quiz';

export const getDifficultyEmoji = (difficulty: string): string => {
  return DIFFICULTY_EMOJIS[difficulty as keyof typeof DIFFICULTY_EMOJIS] || '⚪';
};

export const formatCategoryAndDifficulty = (category: string, difficulty: string): string => {
  const difficultyEmoji = getDifficultyEmoji(difficulty);
  return `📂 ${category} • ${difficultyEmoji} ${difficulty}`;
};

export const calculateTotalPossibleScore = (questions: Question[]): number => {
  return questions.reduce(
    (sum, question) => sum + DIFFICULTY_SCORES[question.difficulty_level], 
    0
  );
};

export const calculateProgress = (currentIndex: number, totalQuestions: number): number => {
  if (currentIndex >= totalQuestions) {
    return 100;
  }
  return Math.round(((currentIndex + 1) / totalQuestions) * 100);
};

export const getRandomFeedback = (isCorrect: boolean): AnswerFeedback => {
  const messages = isCorrect ? FEEDBACK_MESSAGES.CORRECT : FEEDBACK_MESSAGES.INCORRECT;
  const emojis = isCorrect ? FEEDBACK_EMOJIS.CORRECT : FEEDBACK_EMOJIS.INCORRECT;
  const randomIndex = Math.floor(Math.random() * messages.length);
  
  return {
    message: messages[randomIndex],
    emoji: emojis[randomIndex]
  };
};

export const getScoreAssessment = (score: number, totalPossibleScore: number): ScoreAssessment => {
  const percentage = Math.round((score / totalPossibleScore) * 100);
  
  if (percentage >= PERFORMANCE_THRESHOLDS.CHAMPION) {
    return SCORE_ASSESSMENTS.CHAMPION;
  } else if (percentage >= PERFORMANCE_THRESHOLDS.EXCELLENT) {
    return SCORE_ASSESSMENTS.EXCELLENT;
  } else if (percentage >= PERFORMANCE_THRESHOLDS.GREAT) {
    return SCORE_ASSESSMENTS.GREAT;
  } else if (percentage >= PERFORMANCE_THRESHOLDS.GOOD) {
    return SCORE_ASSESSMENTS.GOOD;
  } else if (percentage >= PERFORMANCE_THRESHOLDS.NOT_BAD) {
    return SCORE_ASSESSMENTS.NOT_BAD;
  } else if (percentage >= PERFORMANCE_THRESHOLDS.KEEP_TRYING) {
    return SCORE_ASSESSMENTS.KEEP_TRYING;
  } else {
    return SCORE_ASSESSMENTS.BEGINNER;
  }
};

export const getPerformanceEmoji = (score: number, totalPossibleScore: number): string => {
  return getScoreAssessment(score, totalPossibleScore).emoji;
};

export const formatCompletionTime = (startTime: Date | null, endTime: Date | null): string => {
  if (!startTime || !endTime) return '';
  
  const durationMs = endTime.getTime() - startTime.getTime();
  const minutes = Math.floor(durationMs / 60000);
  const seconds = Math.floor((durationMs % 60000) / 1000);
  
  if (minutes > 0) {
    return `🕒 Completed in ${minutes}m ${seconds}s`;
  } else {
    return `🕒 Completed in ${seconds}s`;
  }
};
