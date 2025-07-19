import { useState } from 'react'
import './App.css'
import Button from './components/Button'
import Text from './components/Text'
import Card from './components/Card'
import questionsData from './questions.json'

const DIFFICULTY_SCORES = {
  Easy: 1,
  Medium: 2,
  Hard: 3
} as const

function App() {
  const [score, setScore] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1)

  const currentQuestion = currentQuestionIndex >= 0 ? questionsData[currentQuestionIndex] : null

  const totalPossibleScore = questionsData.reduce(
    (sum, question) => sum + DIFFICULTY_SCORES[question.difficulty_level as keyof typeof DIFFICULTY_SCORES], 
    0
  )

  const handleClick = () => {
    setScore((score) => score + 1)
  }

  const handleStartQuiz = () => {
    setCurrentQuestionIndex(0)
    setScore(0)
  }

  return (
    <>
      <Text variant="heading" level={1}>TDD Trivia</Text>
      <Card>
        <Text>Loaded {questionsData.length} questions</Text>
        <Text>Total possible score: {totalPossibleScore} points</Text>
        {currentQuestionIndex === -1 ? (
          <Button onClick={handleStartQuiz}>
            Start Quiz
          </Button>
        ) : (
          <Button onClick={handleClick}>
            score is {score}
          </Button>
        )}
      </Card>
      {currentQuestion && (
        <Card data-testid="question-card">
          <Text variant="heading" level={3}>
            {currentQuestion.question}
          </Text>
        </Card>
      )}
    </>
  )
}

export default App
