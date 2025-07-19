import { useState } from 'react'
import './App.css'
import Button from './components/Button'
import Text from './components/Text'
import Card from './components/Card'
import RadioButtonGroup from './components/RadioButtonGroup'
import questionsData from './questions.json'

const DIFFICULTY_SCORES = {
  Easy: 1,
  Medium: 2,
  Hard: 3
} as const

function App() {
  const [score, setScore] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1)
  const [selectedAnswer, setSelectedAnswer] = useState<string>('')
  const [isAnswerConfirmed, setIsAnswerConfirmed] = useState(false)

  const currentQuestion = currentQuestionIndex >= 0 ? questionsData[currentQuestionIndex] : null

  const totalPossibleScore = questionsData.reduce(
    (sum, question) => sum + DIFFICULTY_SCORES[question.difficulty_level as keyof typeof DIFFICULTY_SCORES], 
    0
  )

  const getDifficultyEmoji = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return '🟢'
      case 'Medium': return '🟡'
      case 'Hard': return '🔴'
      default: return '⚪'
    }
  }

  const formatCategoryAndDifficulty = (category: string, difficulty: string) => {
    const difficultyEmoji = getDifficultyEmoji(difficulty)
    return `📂 ${category} • ${difficultyEmoji} ${difficulty}`
  }

  const handleNextQuestion = () => {
    if (currentQuestion) {
      const currentQuestionScore = DIFFICULTY_SCORES[currentQuestion.difficulty_level as keyof typeof DIFFICULTY_SCORES]
      setScore((score) => score + currentQuestionScore)
    }
    setSelectedAnswer('') // Reset selection for next question
    setIsAnswerConfirmed(false) // Reset confirmation for next question
    setCurrentQuestionIndex((index) => index + 1)
  }

  const handleEndQuiz = () => {
    setCurrentQuestionIndex(-1)
    setSelectedAnswer('')
    setIsAnswerConfirmed(false)
  }

  const handleStartQuiz = () => {
    setCurrentQuestionIndex(0)
    setScore(0)
    setSelectedAnswer('')
    setIsAnswerConfirmed(false)
  }

  const handleAnswerSelection = (value: string, index: number) => {
    setSelectedAnswer(value)
    console.log(`Selected: ${value} (option ${index + 1})`)
  }

  const handleConfirmAnswer = () => {
    setIsAnswerConfirmed(true)
  }

  return (
    <>
      <Text variant="heading" level={1}>TDD Trivia</Text>
      <Card>
        <Text>Loaded {questionsData.length} questions</Text>
        <Text>Total possible score: {totalPossibleScore} points</Text>
        <Text>Current score: {score}</Text>
        {currentQuestionIndex === -1 ? (
          <Button onClick={handleStartQuiz}>
            Start Quiz
          </Button>
        ) : currentQuestionIndex >= questionsData.length ? (
          <Button onClick={handleEndQuiz}>
            End of Quiz
          </Button>
        ) : (
          <Button onClick={handleNextQuestion}>
            Next Question
          </Button>
        )}
      </Card>
      {currentQuestion && (
        <Card data-testid="question-card">
          <Text variant="heading" level={3}>
            {currentQuestion.question}
          </Text>
          <Text>
            {formatCategoryAndDifficulty(currentQuestion.category, currentQuestion.difficulty_level)}
          </Text>
          <RadioButtonGroup 
            options={currentQuestion.options}
            onSelectionChange={handleAnswerSelection}
            name={`question-${currentQuestionIndex}`}
            disabled={isAnswerConfirmed}
          />
          <Button 
            onClick={handleConfirmAnswer}
            disabled={!selectedAnswer || isAnswerConfirmed}
          >
            Confirm Answer
          </Button>
          <Text>
            Selected answer: {selectedAnswer || 'No answer selected'}
          </Text>
        </Card>
      )}
    </>
  )
}

export default App
