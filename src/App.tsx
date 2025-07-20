import './App.scss';
import { Text, QuestionCard, AnswerFeedback, ScoreCard, Footer } from './components';
import { useQuizState } from './hooks';
import questionsData from './questions.json';
import type { Question } from './types/quiz';

function App() {
  const questions = questionsData as Question[];
  const {
    state,
    currentQuestion,
    isQuizComplete,
    isQuizStarted,
    startQuiz,
    endQuiz,
    selectAnswer,
    confirmAnswer,
    nextQuestion
  } = useQuizState(questions);

  const handleAnswerSelection = (value: string, index: number) => {
    selectAnswer(value, index);
    console.log(`Selected: ${value} (option ${index + 1})`);
  };

  return (
    <div className="app-container">
      <div className="main-content">
        <Text variant="heading" level={1}>TDD Trivia</Text>
        
        {currentQuestion && (
          <>
            <QuestionCard
              question={currentQuestion}
              selectedAnswer={state.selectedAnswer}
              isAnswerConfirmed={state.isAnswerConfirmed}
              onAnswerSelection={handleAnswerSelection}
              onConfirmAnswer={confirmAnswer}
            />
            <AnswerFeedback
              isAnswerConfirmed={state.isAnswerConfirmed}
              selectedAnswerIndex={state.selectedAnswerIndex}
              currentQuestion={currentQuestion}
            />
          </>
        )}

        <ScoreCard
          questions={questions}
          score={state.score}
          currentQuestionIndex={state.currentQuestionIndex}
          isAnswerConfirmed={state.isAnswerConfirmed}
          startTime={state.startTime}
          endTime={state.endTime}
          onStartQuiz={startQuiz}
          onEndQuiz={endQuiz}
          onNextQuestion={nextQuestion}
        />
      </div>
      {(!isQuizStarted || isQuizComplete) && <Footer />}
    </div>
  );
}

export default App
