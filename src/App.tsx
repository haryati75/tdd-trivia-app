import { useState } from 'react'
import './App.scss'
import Button from './components/Button'
import Text from './components/Text'
import Card from './components/Card'
import RadioButtonGroup from './components/RadioButtonGroup'
import Footer from './components/Footer'
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
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number>(-1)
  const [isAnswerConfirmed, setIsAnswerConfirmed] = useState(false)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [endTime, setEndTime] = useState<Date | null>(null)

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
    setSelectedAnswer('') // Reset selection for next question
    setSelectedAnswerIndex(-1) // Reset answer index for next question
    setIsAnswerConfirmed(false) // Reset confirmation for next question
    const nextIndex = currentQuestionIndex + 1
    setCurrentQuestionIndex(nextIndex)
    
    // Set end time when quiz is completed
    if (nextIndex >= questionsData.length) {
      setEndTime(new Date())
    }
  }

  const handleEndQuiz = () => {
    setCurrentQuestionIndex(-1)
    setSelectedAnswer('')
    setSelectedAnswerIndex(-1)
    setIsAnswerConfirmed(false)
    setStartTime(null)
    setEndTime(null)
  }

  const handleStartQuiz = () => {
    setCurrentQuestionIndex(0)
    setScore(0)
    setSelectedAnswer('')
    setSelectedAnswerIndex(-1)
    setIsAnswerConfirmed(false)
    setStartTime(new Date())
    setEndTime(null)
  }

  const handleAnswerSelection = (value: string, index: number) => {
    setSelectedAnswer(value)
    setSelectedAnswerIndex(index)
    console.log(`Selected: ${value} (option ${index + 1})`)
  }

  const handleConfirmAnswer = () => {
    setIsAnswerConfirmed(true)
    
    // Update score immediately when confirming answer
    if (currentQuestion && selectedAnswerIndex === currentQuestion.correct_answer) {
      const currentQuestionScore = DIFFICULTY_SCORES[currentQuestion.difficulty_level as keyof typeof DIFFICULTY_SCORES]
      setScore((score) => score + currentQuestionScore)
    }
  }

  const calculateProgress = () => {
    if (currentQuestionIndex >= questionsData.length) {
      return 100
    }
    return Math.round(((currentQuestionIndex + 1) / questionsData.length) * 100)
  }

  const getAnswerFeedback = () => {
    if (!isAnswerConfirmed || !currentQuestion || selectedAnswerIndex === -1) {
      return { message: '', emoji: '' }
    }
    
    const isCorrect = selectedAnswerIndex === currentQuestion.correct_answer
    if (isCorrect) {
      const correctMessages = [
        "Awesome! You nailed it!",
        "Fantastic! You're on fire!",
        "Perfect! Keep it up!",
        "Brilliant! You got it right!",
        "Excellent! Well done!",
        "Amazing! You're crushing it!"
      ]
      const correctEmojis = ['🎉', '🚀', '⭐', '🎯', '💯', '🔥']
      const randomIndex = Math.floor(Math.random() * correctMessages.length)
      return {
        message: correctMessages[randomIndex],
        emoji: correctEmojis[randomIndex]
      }
    } else {
      const wrongMessages = [
        "Oops! Better luck next time!",
        "Not quite! Keep trying!",
        "Close, but not quite right!",
        "Don't worry, learning is a journey!",
        "Almost there! You'll get the next one!",
        "No worries, every mistake is a lesson!"
      ]
      const wrongEmojis = ['💪', '🎯', '📚', '🌟', '🚀', '💡']
      const randomIndex = Math.floor(Math.random() * wrongMessages.length)
      return {
        message: wrongMessages[randomIndex],
        emoji: wrongEmojis[randomIndex]
      }
    }
  }

  const getFinalScoreAssessment = () => {
    const percentage = Math.round((score / totalPossibleScore) * 100)
    
    if (percentage >= 90) {
      return { emoji: '🏆', message: 'Outstanding! You\'re a trivia champion!' }
    } else if (percentage >= 80) {
      return { emoji: '🌟', message: 'Excellent work! You really know your stuff!' }
    } else if (percentage >= 70) {
      return { emoji: '👏', message: 'Great job! Well done on that performance!' }
    } else if (percentage >= 60) {
      return { emoji: '👍', message: 'Good effort! You\'re getting there!' }
    } else if (percentage >= 50) {
      return { emoji: '📚', message: 'Not bad! Keep studying and you\'ll improve!' }
    } else if (percentage >= 30) {
      return { emoji: '💪', message: 'Keep trying! Practice makes perfect!' }
    } else {
      return { emoji: '🎯', message: 'Don\'t give up! Every expert was once a beginner!' }
    }
  }

  const getCurrentPerformanceEmoji = () => {
    const percentage = Math.round((score / totalPossibleScore) * 100)
    
    if (percentage >= 90) {
      return '🏆'
    } else if (percentage >= 80) {
      return '🌟'
    } else if (percentage >= 70) {
      return '👏'
    } else if (percentage >= 60) {
      return '👍'
    } else if (percentage >= 50) {
      return '📚'
    } else if (percentage >= 30) {
      return '💪'
    } else {
      return '🎯'
    }
  }

  const formatCompletionTime = () => {
    if (!startTime || !endTime) return ''
    
    const durationMs = endTime.getTime() - startTime.getTime()
    const minutes = Math.floor(durationMs / 60000)
    const seconds = Math.floor((durationMs % 60000) / 1000)
    
    if (minutes > 0) {
      return `🕒 Completed in ${minutes}m ${seconds}s`
    } else {
      return `🕒 Completed in ${seconds}s`
    }
  }

  return (
    <div className="app-container">
      <div className="main-content">
        <Text variant="heading" level={1}>TDD Trivia</Text>
        {currentQuestion && (
        <Card data-testid="question-card">
          <Text>
            {formatCategoryAndDifficulty(currentQuestion.category, currentQuestion.difficulty_level)}
          </Text>
          <Text variant="heading" level={3}>
            Question {currentQuestion.id}: {currentQuestion.question}
          </Text>
          <RadioButtonGroup 
            options={currentQuestion.options}
            onSelectionChange={handleAnswerSelection}
            name={`question-${currentQuestionIndex}`}
            disabled={isAnswerConfirmed}
            selectedValue={selectedAnswer}
          />
          {selectedAnswer && !isAnswerConfirmed && (
            <Button 
              onClick={handleConfirmAnswer}
            >
              Confirm Answer
            </Button>
          )}
          {isAnswerConfirmed && selectedAnswer && (
            <>
              <Text>
                {`${getAnswerFeedback().emoji} ${getAnswerFeedback().message}`}
              </Text>
              {selectedAnswerIndex !== currentQuestion?.correct_answer && (
                <Text>
                  ✅ Correct answer: {currentQuestion?.options[currentQuestion.correct_answer]}
                </Text>
              )}
            </>
          )}
        </Card>
      )}
      <Card>
        {currentQuestionIndex !== -1 && currentQuestionIndex < questionsData.length && !isAnswerConfirmed && (
          <Text>
            👆 Select one of the options above to continue
          </Text>
        )}
        {currentQuestionIndex !== -1 && (
          <Text>
            {getCurrentPerformanceEmoji()} Score: {score}/{totalPossibleScore} points
            {currentQuestionIndex < questionsData.length && ` • Progress: ${calculateProgress()}%`}
          </Text>
        )}
        {currentQuestionIndex >= questionsData.length && (
          <>
            <Text>{getFinalScoreAssessment().emoji} {getFinalScoreAssessment().message}</Text>
            {formatCompletionTime() && (
              <Text>{formatCompletionTime()}</Text>
            )}
          </>
        )}
        {currentQuestionIndex === -1 ? (
          <Button onClick={handleStartQuiz}>
            Start Quiz
          </Button>
        ) : currentQuestionIndex >= questionsData.length ? (
          <Button onClick={handleEndQuiz}>
            Back to Start
          </Button>
        ) : (
          <Button 
            onClick={handleNextQuestion}
            disabled={!isAnswerConfirmed}
          >
            {currentQuestionIndex === questionsData.length - 1 ? 'End of Quiz' : 'Next Question'}
          </Button>
        )}
      </Card>
      </div>
      {(currentQuestionIndex === -1 || currentQuestionIndex >= questionsData.length) && <Footer />}
    </div>
  )
}

export default App
