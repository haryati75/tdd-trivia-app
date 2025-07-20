import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import AnswerFeedback from './AnswerFeedback';
import type { Question } from '../types/quiz';

// Mock the getRandomFeedback function to return predictable results
vi.mock('../utils/quiz', () => ({
  getRandomFeedback: vi.fn((isCorrect: boolean) => ({
    message: isCorrect ? 'Great job!' : 'Try again!',
    emoji: isCorrect ? '🎉' : '💪'
  }))
}));

const mockQuestion: Question = {
  id: 1,
  question: 'What is TDD?',
  options: ['Test Driven Development', 'Test Data Design', 'Technical Design Document'],
  correct_answer: 0,
  category: 'TDD Basics',
  difficulty_level: 'Easy'
};

describe('AnswerFeedback', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders nothing when answer is not confirmed', () => {
    const { container } = render(
      <AnswerFeedback
        isAnswerConfirmed={false}
        selectedAnswerIndex={0}
        currentQuestion={mockQuestion}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when no question is provided', () => {
    const { container } = render(
      <AnswerFeedback
        isAnswerConfirmed={true}
        selectedAnswerIndex={0}
        currentQuestion={null}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when no answer is selected', () => {
    const { container } = render(
      <AnswerFeedback
        isAnswerConfirmed={true}
        selectedAnswerIndex={-1}
        currentQuestion={mockQuestion}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('shows correct answer feedback without showing correct answer', () => {
    render(
      <AnswerFeedback
        isAnswerConfirmed={true}
        selectedAnswerIndex={0} // Correct answer
        currentQuestion={mockQuestion}
      />
    );

    expect(screen.getByText('🎉 Great job!')).toBeInTheDocument();
    expect(screen.queryByText(/Correct answer:/)).not.toBeInTheDocument();
  });

  it('shows incorrect answer feedback and displays correct answer', () => {
    render(
      <AnswerFeedback
        isAnswerConfirmed={true}
        selectedAnswerIndex={1} // Incorrect answer
        currentQuestion={mockQuestion}
      />
    );

    expect(screen.getByText('💪 Try again!')).toBeInTheDocument();
    expect(screen.getByText('✅ Correct answer: Test Driven Development')).toBeInTheDocument();
  });
});
