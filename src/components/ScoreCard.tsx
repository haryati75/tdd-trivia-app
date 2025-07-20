import { 
  calculateTotalPossibleScore, 
  calculateProgress, 
  getPerformanceEmoji, 
  getScoreAssessment,
  formatCompletionTime 
} from '../utils/quiz';
import type { Question } from '../types/quiz';
import Card from './Card';
import Text from './Text';
import Button from './Button';

interface ScoreCardProps {
  questions: Question[];
  score: number;
  currentQuestionIndex: number;
  isAnswerConfirmed: boolean;
  startTime: Date | null;
  endTime: Date | null;
  onStartQuiz: () => void;
  onEndQuiz: () => void;
  onNextQuestion: () => void;
}

export default function ScoreCard({
  questions,
  score,
  currentQuestionIndex,
  isAnswerConfirmed,
  startTime,
  endTime,
  onStartQuiz,
  onEndQuiz,
  onNextQuestion
}: ScoreCardProps) {
  const totalPossibleScore = calculateTotalPossibleScore(questions);
  const isQuizStarted = currentQuestionIndex >= 0;
  const isQuizComplete = currentQuestionIndex >= questions.length;

  const renderContent = () => {
    // Before quiz starts
    if (!isQuizStarted) {
      return (
        <Button data-testid="start-quiz-button" onClick={onStartQuiz}>
          Start Quiz
        </Button>
      );
    }

    // Quiz completed
    if (isQuizComplete) {
      const assessment = getScoreAssessment(score, totalPossibleScore);
      const completionTime = formatCompletionTime(startTime, endTime);
      
      return (
        <>
          <Text data-testid="final-assessment">{assessment.emoji} {assessment.message}</Text>
          {completionTime && <Text data-testid="completion-time">{completionTime}</Text>}
          <Button data-testid="back-to-start-button" onClick={onEndQuiz}>
            Back to Start
          </Button>
        </>
      );
    }

    // Quiz in progress
    return (
      <>
        {!isAnswerConfirmed && (
          <Text data-testid="instruction-text">
            👆 Select one of the options above to continue
          </Text>
        )}
        <Text data-testid="score-display">
          {getPerformanceEmoji(score, totalPossibleScore)} Score: {score}/{totalPossibleScore} points
          {` • Progress: ${calculateProgress(currentQuestionIndex, questions.length)}%`}
        </Text>
        <Button 
          data-testid="next-question-button"
          onClick={onNextQuestion}
          disabled={!isAnswerConfirmed}
        >
          {currentQuestionIndex === questions.length - 1 ? 'End of Quiz' : 'Next Question'}
        </Button>
      </>
    );
  };

  return <Card data-testid="score-card">{renderContent()}</Card>;
}
