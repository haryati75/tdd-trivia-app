import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ScoreCard from './ScoreCard';
import type { Question } from '../types/quiz';

// Mock the utility functions
vi.mock('../utils/quiz', () => ({
  calculateTotalPossibleScore: vi.fn(() => 10),
  calculateProgress: vi.fn((current, total) => Math.round(((current + 1) / total) * 100)),
  getPerformanceEmoji: vi.fn(() => '🎯'),
  getScoreAssessment: vi.fn(() => ({ emoji: '🏆', message: 'Outstanding!' })),
  formatCompletionTime: vi.fn(() => '🕒 Completed in 2m 30s')
}));

const mockQuestions: Question[] = [
  {
    id: 1,
    question: 'Test Question 1',
    options: ['A', 'B', 'C'],
    correct_answer: 0,
    category: 'Test',
    difficulty_level: 'Easy'
  },
  {
    id: 2,
    question: 'Test Question 2',
    options: ['A', 'B', 'C'],
    correct_answer: 1,
    category: 'Test',
    difficulty_level: 'Medium'
  }
];

describe('ScoreCard', () => {
  const mockOnStartQuiz = vi.fn();
  const mockOnEndQuiz = vi.fn();
  const mockOnNextQuestion = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('before quiz starts', () => {
    it('shows start quiz button', () => {
      render(
        <ScoreCard
          questions={mockQuestions}
          score={0}
          currentQuestionIndex={-1}
          isAnswerConfirmed={false}
          startTime={null}
          endTime={null}
          onStartQuiz={mockOnStartQuiz}
          onEndQuiz={mockOnEndQuiz}
          onNextQuestion={mockOnNextQuestion}
        />
      );

      const startButton = screen.getByText('Start Quiz');
      expect(startButton).toBeInTheDocument();
    });

    it('calls onStartQuiz when start button is clicked', () => {
      render(
        <ScoreCard
          questions={mockQuestions}
          score={0}
          currentQuestionIndex={-1}
          isAnswerConfirmed={false}
          startTime={null}
          endTime={null}
          onStartQuiz={mockOnStartQuiz}
          onEndQuiz={mockOnEndQuiz}
          onNextQuestion={mockOnNextQuestion}
        />
      );

      const startButton = screen.getByText('Start Quiz');
      fireEvent.click(startButton);

      expect(mockOnStartQuiz).toHaveBeenCalledTimes(1);
    });
  });

  describe('during quiz', () => {
    it('shows progress and score information', () => {
      render(
        <ScoreCard
          questions={mockQuestions}
          score={5}
          currentQuestionIndex={0}
          isAnswerConfirmed={true}
          startTime={new Date()}
          endTime={null}
          onStartQuiz={mockOnStartQuiz}
          onEndQuiz={mockOnEndQuiz}
          onNextQuestion={mockOnNextQuestion}
        />
      );

      expect(screen.getByText('🎯 Score: 5/10 points • Progress: 50%')).toBeInTheDocument();
    });

    it('shows guidance text when answer is not confirmed', () => {
      render(
        <ScoreCard
          questions={mockQuestions}
          score={0}
          currentQuestionIndex={0}
          isAnswerConfirmed={false}
          startTime={new Date()}
          endTime={null}
          onStartQuiz={mockOnStartQuiz}
          onEndQuiz={mockOnEndQuiz}
          onNextQuestion={mockOnNextQuestion}
        />
      );

      expect(screen.getByText('👆 Select one of the options above to continue')).toBeInTheDocument();
    });

    it('shows Next Question button when answer is confirmed', () => {
      render(
        <ScoreCard
          questions={mockQuestions}
          score={0}
          currentQuestionIndex={0}
          isAnswerConfirmed={true}
          startTime={new Date()}
          endTime={null}
          onStartQuiz={mockOnStartQuiz}
          onEndQuiz={mockOnEndQuiz}
          onNextQuestion={mockOnNextQuestion}
        />
      );

      expect(screen.getByText('Next Question')).toBeInTheDocument();
      expect(screen.getByText('Next Question')).not.toBeDisabled();
    });

    it('disables Next Question button when answer is not confirmed', () => {
      render(
        <ScoreCard
          questions={mockQuestions}
          score={0}
          currentQuestionIndex={0}
          isAnswerConfirmed={false}
          startTime={new Date()}
          endTime={null}
          onStartQuiz={mockOnStartQuiz}
          onEndQuiz={mockOnEndQuiz}
          onNextQuestion={mockOnNextQuestion}
        />
      );

      expect(screen.getByText('Next Question')).toBeDisabled();
    });

    it('shows End of Quiz button on last question', () => {
      render(
        <ScoreCard
          questions={mockQuestions}
          score={0}
          currentQuestionIndex={1} // Last question (index 1 for 2 questions)
          isAnswerConfirmed={true}
          startTime={new Date()}
          endTime={null}
          onStartQuiz={mockOnStartQuiz}
          onEndQuiz={mockOnEndQuiz}
          onNextQuestion={mockOnNextQuestion}
        />
      );

      expect(screen.getByText('End of Quiz')).toBeInTheDocument();
    });
  });

  describe('after quiz completion', () => {
    it('shows final assessment and completion time', () => {
      render(
        <ScoreCard
          questions={mockQuestions}
          score={8}
          currentQuestionIndex={2} // Beyond last question
          isAnswerConfirmed={true}
          startTime={new Date('2023-01-01T10:00:00')}
          endTime={new Date('2023-01-01T10:02:30')}
          onStartQuiz={mockOnStartQuiz}
          onEndQuiz={mockOnEndQuiz}
          onNextQuestion={mockOnNextQuestion}
        />
      );

      expect(screen.getByText('🏆 Outstanding!')).toBeInTheDocument();
      expect(screen.getByText('🕒 Completed in 2m 30s')).toBeInTheDocument();
      expect(screen.getByText('Back to Start')).toBeInTheDocument();
    });

    it('calls onEndQuiz when Back to Start button is clicked', () => {
      render(
        <ScoreCard
          questions={mockQuestions}
          score={8}
          currentQuestionIndex={2}
          isAnswerConfirmed={true}
          startTime={new Date()}
          endTime={new Date()}
          onStartQuiz={mockOnStartQuiz}
          onEndQuiz={mockOnEndQuiz}
          onNextQuestion={mockOnNextQuestion}
        />
      );

      const backButton = screen.getByText('Back to Start');
      fireEvent.click(backButton);

      expect(mockOnEndQuiz).toHaveBeenCalledTimes(1);
    });
  });

  it('calls onNextQuestion when Next Question button is clicked', () => {
    render(
      <ScoreCard
        questions={mockQuestions}
        score={0}
        currentQuestionIndex={0}
        isAnswerConfirmed={true}
        startTime={new Date()}
        endTime={null}
        onStartQuiz={mockOnStartQuiz}
        onEndQuiz={mockOnEndQuiz}
        onNextQuestion={mockOnNextQuestion}
      />
    );

    const nextButton = screen.getByText('Next Question');
    fireEvent.click(nextButton);

    expect(mockOnNextQuestion).toHaveBeenCalledTimes(1);
  });
});
