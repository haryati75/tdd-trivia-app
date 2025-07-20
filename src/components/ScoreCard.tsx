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
import ConfirmModal from './ConfirmModal';
import { useState } from 'react';

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
  onRestartQuiz: () => void;
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
  onNextQuestion,
  onRestartQuiz
}: ScoreCardProps) {
  const totalPossibleScore = calculateTotalPossibleScore(questions);
  const isQuizStarted = currentQuestionIndex >= 0;
  const isQuizComplete = currentQuestionIndex >= questions.length;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const [showRestartModal, setShowRestartModal] = useState(false);

  const handleRestartQuiz = () => {
    setShowRestartModal(true);
  };

  const handleConfirmRestart = () => {
    setShowRestartModal(false);
    onRestartQuiz();
  };

  const handleCancelRestart = () => {
    setShowRestartModal(false);
  };

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
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <Button 
            data-testid="next-question-button"
            onClick={onNextQuestion}
            disabled={!isAnswerConfirmed}
          >
            {currentQuestionIndex === questions.length - 1 ? 'End of Quiz' : 'Next Question'}
          </Button>
          <Button 
            data-testid="restart-quiz-button"
            onClick={handleRestartQuiz}
            disabled={isLastQuestion}
          >
            Restart
          </Button>
        </div>
      </>
    );
  };

  return (
    <>
      <Card data-testid="score-card">{renderContent()}</Card>
      <ConfirmModal
        isOpen={showRestartModal}
        title="Restart Quiz"
        message="Are you sure you want to restart the quiz? Your current progress will be lost."
        onConfirm={handleConfirmRestart}
        onCancel={handleCancelRestart}
      />
    </>
  );
}
