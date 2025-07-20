import { getRandomFeedback } from '../utils/quiz';
import type { Question } from '../types/quiz';
import Text from './Text';

interface AnswerFeedbackProps {
  isAnswerConfirmed: boolean;
  selectedAnswerIndex: number;
  currentQuestion: Question | null;
}

export default function AnswerFeedback({
  isAnswerConfirmed,
  selectedAnswerIndex,
  currentQuestion
}: AnswerFeedbackProps) {
  if (!isAnswerConfirmed || !currentQuestion || selectedAnswerIndex === -1) {
    return null;
  }
  
  const isCorrect = selectedAnswerIndex === currentQuestion.correct_answer;
  const feedback = getRandomFeedback(isCorrect);
  
  return (
    <div data-testid="answer-feedback">
      <Text>
        {`${feedback.emoji} ${feedback.message}`}
      </Text>
      {!isCorrect && (
        <Text data-testid="correct-answer-reveal">
          ✅ Correct answer: {currentQuestion.options[currentQuestion.correct_answer]}
        </Text>
      )}
    </div>
  );
}
