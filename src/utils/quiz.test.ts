import { describe, it, expect, vi } from 'vitest';
import {
  getDifficultyEmoji,
  formatCategoryAndDifficulty,
  calculateTotalPossibleScore,
  calculateProgress,
  getRandomFeedback,
  getScoreAssessment,
  getPerformanceEmoji,
  formatCompletionTime
} from './quiz';
import type { Question } from '../types/quiz';

describe('Quiz Utilities', () => {
  describe('getDifficultyEmoji', () => {
    it('returns correct emoji for Easy difficulty', () => {
      expect(getDifficultyEmoji('Easy')).toBe('🟢');
    });

    it('returns correct emoji for Medium difficulty', () => {
      expect(getDifficultyEmoji('Medium')).toBe('🟡');
    });

    it('returns correct emoji for Hard difficulty', () => {
      expect(getDifficultyEmoji('Hard')).toBe('🔴');
    });

    it('returns default emoji for unknown difficulty', () => {
      expect(getDifficultyEmoji('Unknown')).toBe('⚪');
    });
  });

  describe('formatCategoryAndDifficulty', () => {
    it('formats category and difficulty correctly', () => {
      const result = formatCategoryAndDifficulty('TDD Basics', 'Easy');
      expect(result).toBe('📂 TDD Basics • 🟢 Easy');
    });
  });

  describe('calculateTotalPossibleScore', () => {
    it('calculates total score correctly', () => {
      const questions: Question[] = [
        {
          id: 1,
          question: 'Test 1',
          options: ['A', 'B'],
          correct_answer: 0,
          category: 'Test',
          difficulty_level: 'Easy'
        },
        {
          id: 2,
          question: 'Test 2',
          options: ['A', 'B'],
          correct_answer: 0,
          category: 'Test',
          difficulty_level: 'Hard'
        }
      ];
      
      const total = calculateTotalPossibleScore(questions);
      expect(total).toBe(4); // Easy (1) + Hard (3)
    });
  });

  describe('calculateProgress', () => {
    it('calculates progress correctly', () => {
      expect(calculateProgress(0, 10)).toBe(10);
      expect(calculateProgress(4, 10)).toBe(50);
      expect(calculateProgress(9, 10)).toBe(100);
    });

    it('returns 100 when current index exceeds total', () => {
      expect(calculateProgress(10, 10)).toBe(100);
    });
  });

  describe('getRandomFeedback', () => {
    beforeEach(() => {
      // Mock Math.random to return predictable results
      vi.spyOn(Math, 'random').mockReturnValue(0);
    });

    it('returns correct feedback for correct answer', () => {
      const feedback = getRandomFeedback(true);
      expect(feedback.message).toBe("Awesome! You nailed it!");
      expect(feedback.emoji).toBe('🎉');
    });

    it('returns incorrect feedback for wrong answer', () => {
      const feedback = getRandomFeedback(false);
      expect(feedback.message).toBe("Oops! Better luck next time!");
      expect(feedback.emoji).toBe('💪');
    });
  });

  describe('getScoreAssessment', () => {
    it('returns champion assessment for 90%+ score', () => {
      const assessment = getScoreAssessment(9, 10);
      expect(assessment.emoji).toBe('🏆');
      expect(assessment.message).toBe('Outstanding! You\'re a trivia champion!');
    });

    it('returns excellent assessment for 80-89% score', () => {
      const assessment = getScoreAssessment(8, 10);
      expect(assessment.emoji).toBe('🌟');
      expect(assessment.message).toBe('Excellent work! You really know your stuff!');
    });

    it('returns beginner assessment for low scores', () => {
      const assessment = getScoreAssessment(1, 10);
      expect(assessment.emoji).toBe('🎯');
      expect(assessment.message).toBe('Don\'t give up! Every expert was once a beginner!');
    });
  });

  describe('getPerformanceEmoji', () => {
    it('returns correct emoji based on score', () => {
      expect(getPerformanceEmoji(9, 10)).toBe('🏆');
      expect(getPerformanceEmoji(8, 10)).toBe('🌟');
      expect(getPerformanceEmoji(1, 10)).toBe('🎯');
    });
  });

  describe('formatCompletionTime', () => {
    it('formats time correctly for minutes and seconds', () => {
      const start = new Date('2023-01-01T10:00:00');
      const end = new Date('2023-01-01T10:02:30');
      
      const result = formatCompletionTime(start, end);
      expect(result).toBe('🕒 Completed in 2m 30s');
    });

    it('formats time correctly for seconds only', () => {
      const start = new Date('2023-01-01T10:00:00');
      const end = new Date('2023-01-01T10:00:45');
      
      const result = formatCompletionTime(start, end);
      expect(result).toBe('🕒 Completed in 45s');
    });

    it('returns empty string when dates are null', () => {
      expect(formatCompletionTime(null, null)).toBe('');
      expect(formatCompletionTime(new Date(), null)).toBe('');
      expect(formatCompletionTime(null, new Date())).toBe('');
    });
  });
});
