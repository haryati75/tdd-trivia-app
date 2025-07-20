import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useQuizState } from './useQuizState';
import type { Question } from '../types/quiz';

const mockQuestions: Question[] = [
  {
    id: 1,
    question: 'Test Question 1',
    options: ['Option A', 'Option B', 'Option C'],
    correct_answer: 1,
    category: 'Test Category',
    difficulty_level: 'Easy'
  },
  {
    id: 2,
    question: 'Test Question 2',
    options: ['Option A', 'Option B', 'Option C'],
    correct_answer: 0,
    category: 'Test Category',
    difficulty_level: 'Hard'
  }
];

describe('useQuizState', () => {

  describe('initial state', () => {
    it('starts with quiz not started', () => {
      const { result } = renderHook(() => useQuizState(mockQuestions));
      
      expect(result.current.isQuizStarted).toBe(false);
      expect(result.current.isQuizComplete).toBe(false);
      expect(result.current.currentQuestion).toBe(null);
      expect(result.current.state.score).toBe(0);
    });
  });

  describe('quiz lifecycle', () => {
    it('starts quiz correctly', () => {
      const { result } = renderHook(() => useQuizState(mockQuestions));
      
      act(() => {
        result.current.startQuiz();
      });
      
      expect(result.current.isQuizStarted).toBe(true);
      expect(result.current.state.currentQuestionIndex).toBe(0);
      expect(result.current.currentQuestion).toEqual(mockQuestions[0]);
      expect(result.current.state.startTime).toBeInstanceOf(Date);
    });

    it('ends quiz correctly', () => {
      const { result } = renderHook(() => useQuizState(mockQuestions));
      
      act(() => {
        result.current.startQuiz();
      });
      
      act(() => {
        result.current.endQuiz();
      });
      
      expect(result.current.isQuizStarted).toBe(false);
      expect(result.current.isQuizComplete).toBe(false);
      expect(result.current.state.currentQuestionIndex).toBe(-1);
      expect(result.current.state.score).toBe(0);
    });
  });

  describe('answer selection and confirmation', () => {
    it('selects answer correctly', () => {
      const { result } = renderHook(() => useQuizState(mockQuestions));
      
      act(() => {
        result.current.startQuiz();
      });
      
      act(() => {
        result.current.selectAnswer('Option B', 1);
      });
      
      expect(result.current.state.selectedAnswer).toBe('Option B');
      expect(result.current.state.selectedAnswerIndex).toBe(1);
      expect(result.current.state.isAnswerConfirmed).toBe(false);
    });

    it('confirms correct answer and updates score', () => {
      const { result } = renderHook(() => useQuizState(mockQuestions));
      
      act(() => {
        result.current.startQuiz();
      });
      
      act(() => {
        result.current.selectAnswer('Option B', 1); // Correct answer for first question
      });
      
      act(() => {
        result.current.confirmAnswer();
      });
      
      expect(result.current.state.isAnswerConfirmed).toBe(true);
      expect(result.current.state.score).toBe(1); // Easy question = 1 point
    });

    it('confirms incorrect answer without updating score', () => {
      const { result } = renderHook(() => useQuizState(mockQuestions));
      
      act(() => {
        result.current.startQuiz();
      });
      
      act(() => {
        result.current.selectAnswer('Option A', 0); // Incorrect answer
      });
      
      act(() => {
        result.current.confirmAnswer();
      });
      
      expect(result.current.state.isAnswerConfirmed).toBe(true);
      expect(result.current.state.score).toBe(0);
    });
  });

  describe('question navigation', () => {
    it('moves to next question correctly', () => {
      const { result } = renderHook(() => useQuizState(mockQuestions));
      
      act(() => {
        result.current.startQuiz();
      });
      
      act(() => {
        result.current.nextQuestion();
      });
      
      expect(result.current.state.currentQuestionIndex).toBe(1);
      expect(result.current.currentQuestion).toEqual(mockQuestions[1]);
      expect(result.current.state.selectedAnswer).toBe('');
      expect(result.current.state.selectedAnswerIndex).toBe(-1);
      expect(result.current.state.isAnswerConfirmed).toBe(false);
    });

    it('completes quiz when reaching the end', () => {
      const { result } = renderHook(() => useQuizState(mockQuestions));
      
      act(() => {
        result.current.startQuiz();
      });
      
      // Move through all questions
      act(() => {
        result.current.nextQuestion(); // Question 2
      });
      
      act(() => {
        result.current.nextQuestion(); // Beyond last question
      });
      
      expect(result.current.isQuizComplete).toBe(true);
      expect(result.current.state.endTime).toBeInstanceOf(Date);
    });
  });

  describe('scoring system', () => {
    it('calculates score correctly for different difficulty levels', () => {
      const { result } = renderHook(() => useQuizState(mockQuestions));
      
      act(() => {
        result.current.startQuiz();
      });
      
      // Answer first question correctly (Easy = 1 point)
      act(() => {
        result.current.selectAnswer('Option B', 1);
        result.current.confirmAnswer();
        result.current.nextQuestion();
      });
      
      // Answer second question correctly (Hard = 3 points)
      act(() => {
        result.current.selectAnswer('Option A', 0);
        result.current.confirmAnswer();
      });
      
      expect(result.current.state.score).toBe(4); // 1 + 3 = 4
    });
  });
});
