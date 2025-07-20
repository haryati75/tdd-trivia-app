import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import QuestionCard from './QuestionCard';
import type { Question } from '../types/quiz';

const mockQuestion: Question = {
  id: 1,
  question: 'What is TDD?',
  options: ['Test Driven Development', 'Test Data Design', 'Technical Design Document'],
  correct_answer: 0,
  category: 'TDD Basics',
  difficulty_level: 'Easy'
};

describe('QuestionCard', () => {
  const mockOnAnswerSelection = vi.fn();
  const mockOnConfirmAnswer = vi.fn();

  beforeEach(() => {
    mockOnAnswerSelection.mockClear();
    mockOnConfirmAnswer.mockClear();
  });

  it('renders question information correctly', () => {
    render(
      <QuestionCard
        question={mockQuestion}
        selectedAnswer=""
        isAnswerConfirmed={false}
        onAnswerSelection={mockOnAnswerSelection}
        onConfirmAnswer={mockOnConfirmAnswer}
      />
    );

    expect(screen.getByText('Question 1: What is TDD?')).toBeInTheDocument();
    expect(screen.getByText('📂 TDD Basics • 🟢 Easy')).toBeInTheDocument();
  });

  it('shows confirm button when answer is selected but not confirmed', () => {
    render(
      <QuestionCard
        question={mockQuestion}
        selectedAnswer="Test Driven Development"
        isAnswerConfirmed={false}
        onAnswerSelection={mockOnAnswerSelection}
        onConfirmAnswer={mockOnConfirmAnswer}
      />
    );

    const confirmButton = screen.getByText('Confirm Answer');
    expect(confirmButton).toBeInTheDocument();
  });

  it('does not show confirm button when no answer is selected', () => {
    render(
      <QuestionCard
        question={mockQuestion}
        selectedAnswer=""
        isAnswerConfirmed={false}
        onAnswerSelection={mockOnAnswerSelection}
        onConfirmAnswer={mockOnConfirmAnswer}
      />
    );

    expect(screen.queryByText('Confirm Answer')).not.toBeInTheDocument();
  });

  it('does not show confirm button when answer is already confirmed', () => {
    render(
      <QuestionCard
        question={mockQuestion}
        selectedAnswer="Test Driven Development"
        isAnswerConfirmed={true}
        onAnswerSelection={mockOnAnswerSelection}
        onConfirmAnswer={mockOnConfirmAnswer}
      />
    );

    expect(screen.queryByText('Confirm Answer')).not.toBeInTheDocument();
  });

  it('calls onConfirmAnswer when confirm button is clicked', () => {
    render(
      <QuestionCard
        question={mockQuestion}
        selectedAnswer="Test Driven Development"
        isAnswerConfirmed={false}
        onAnswerSelection={mockOnAnswerSelection}
        onConfirmAnswer={mockOnConfirmAnswer}
      />
    );

    const confirmButton = screen.getByText('Confirm Answer');
    fireEvent.click(confirmButton);

    expect(mockOnConfirmAnswer).toHaveBeenCalledTimes(1);
  });
});
