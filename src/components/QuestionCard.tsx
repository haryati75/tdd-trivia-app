import type { Question } from '../types/quiz';
import { formatCategoryAndDifficulty } from '../utils/quiz';
import Card from './Card';
import Text from './Text';
import RadioButtonGroup from './RadioButtonGroup';
import Button from './Button';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: string;
  isAnswerConfirmed: boolean;
  onAnswerSelection: (value: string, index: number) => void;
  onConfirmAnswer: () => void;
}

export default function QuestionCard({
  question,
  selectedAnswer,
  isAnswerConfirmed,
  onAnswerSelection,
  onConfirmAnswer
}: QuestionCardProps) {
  return (
    <Card data-testid="question-card">
      <Text data-testid="question-category-difficulty">
        {formatCategoryAndDifficulty(question.category, question.difficulty_level)}
      </Text>
      <Text variant="heading" level={3} data-testid="question-text">
        Question {question.id}: {question.question}
      </Text>
      <RadioButtonGroup 
        options={question.options}
        onSelectionChange={onAnswerSelection}
        name={`question-${question.id}`}
        disabled={isAnswerConfirmed}
        selectedValue={selectedAnswer}
      />
      {selectedAnswer && !isAnswerConfirmed && (
        <Button data-testid="confirm-answer-button" onClick={onConfirmAnswer}>
          Confirm Answer
        </Button>
      )}
    </Card>
  );
}
