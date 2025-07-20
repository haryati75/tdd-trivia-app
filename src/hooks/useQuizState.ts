import { useState, useCallback } from 'react';
import type { QuizState, Question } from '../types/quiz';
import { DIFFICULTY_SCORES } from '../constants/quiz';

const initialQuizState: QuizState = {
  score: 0,
  currentQuestionIndex: -1,
  selectedAnswer: '',
  selectedAnswerIndex: -1,
  isAnswerConfirmed: false,
  startTime: null,
  endTime: null
};

export const useQuizState = (questions: Question[]) => {
  const [state, setState] = useState<QuizState>(initialQuizState);

  const currentQuestion = state.currentQuestionIndex >= 0 ? questions[state.currentQuestionIndex] : null;
  const isQuizComplete = state.currentQuestionIndex >= questions.length;
  const isQuizStarted = state.currentQuestionIndex >= 0;

  const startQuiz = useCallback(() => {
    setState({
      ...initialQuizState,
      currentQuestionIndex: 0,
      startTime: new Date()
    });
  }, []);

  const endQuiz = useCallback(() => {
    setState(initialQuizState);
  }, []);

  const selectAnswer = useCallback((answer: string, index: number) => {
    setState(prev => ({
      ...prev,
      selectedAnswer: answer,
      selectedAnswerIndex: index
    }));
  }, []);

  const confirmAnswer = useCallback(() => {
    setState(prev => {
      const newState = { ...prev, isAnswerConfirmed: true };
      
      // Update score if answer is correct
      if (currentQuestion && prev.selectedAnswerIndex === currentQuestion.correct_answer) {
        newState.score = prev.score + DIFFICULTY_SCORES[currentQuestion.difficulty_level];
      }
      
      return newState;
    });
  }, [currentQuestion]);

  const nextQuestion = useCallback(() => {
    setState(prev => {
      const nextIndex = prev.currentQuestionIndex + 1;
      return {
        ...prev,
        currentQuestionIndex: nextIndex,
        selectedAnswer: '',
        selectedAnswerIndex: -1,
        isAnswerConfirmed: false,
        endTime: nextIndex >= questions.length ? new Date() : null
      };
    });
  }, [questions.length]);

  return {
    state,
    currentQuestion,
    isQuizComplete,
    isQuizStarted,
    startQuiz,
    endQuiz,
    selectAnswer,
    confirmAnswer,
    nextQuestion
  };
};
