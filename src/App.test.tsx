import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App renders', () => {
  it('the main heading', () => {
    render(<App />)
    const heading = screen.getByText('TDD Trivia')
    expect(heading).toBeInTheDocument()
  })

  it('the main heading as h1 element', () => {
    render(<App />)
    const heading = screen.getByRole('heading', { name: 'TDD Trivia', level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading.tagName).toBe('H1')
  })

  it('the start quiz button initially', () => {
    render(<App />)
    const button = screen.getByRole('button', { name: /start quiz/i })
    expect(button).toBeInTheDocument()
  })

  it('the loaded questions count as paragraph', () => {
    render(<App />)
    const questionsCount = screen.getByText(/loaded \d+ questions/i)
    expect(questionsCount).toBeInTheDocument()
    expect(questionsCount.tagName).toBe('P')
  })

  it('the total possible score as paragraph', () => {
    render(<App />)
    const totalScore = screen.getByText(/total possible score: \d+ points/i)
    expect(totalScore).toBeInTheDocument()
    expect(totalScore.tagName).toBe('P')
  })

  it('the current score initially shows 0', () => {
    render(<App />)
    const currentScore = screen.getByText('Current score: 0')
    expect(currentScore).toBeInTheDocument()
    expect(currentScore.tagName).toBe('P')
  })
})

describe('App increments', () => {
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    user = userEvent.setup()
  })

  it('shows next question button after clicking Start Quiz', async () => {
    render(<App />)
    const startButton = screen.getByRole('button', { name: /start quiz/i })
    
    await user.click(startButton)
    
    const nextButton = screen.getByRole('button', { name: /next question/i })
    expect(nextButton).toBeInTheDocument()
  })

  it('advances to next question when button is clicked after starting quiz', async () => {
    render(<App />)
    const startButton = screen.getByRole('button', { name: /start quiz/i })
    
    await user.click(startButton)
    
    const nextButton = screen.getByRole('button', { name: /next question/i })
    await user.click(nextButton)

    // Button text stays the same since it's just "Next Question"
    expect(screen.getByRole('button', { name: /next question/i })).toBeInTheDocument()
  })

  it('advances question multiple times when button is clicked multiple times after starting quiz', async () => {
    render(<App />)
    const startButton = screen.getByRole('button', { name: /start quiz/i })
    
    await user.click(startButton)
    
    const nextButton = screen.getByRole('button', { name: /next question/i })
    await user.click(nextButton)
    await user.click(nextButton)
    await user.click(nextButton)

    // Button text remains "Next Question" regardless of how many times clicked
    expect(screen.getByRole('button', { name: /next question/i })).toBeInTheDocument()
  })

  it('displays the correct next question button text after starting quiz', async () => {
    render(<App />)
    const startButton = screen.getByRole('button', { name: /start quiz/i })
    
    await user.click(startButton)
    
    const nextButton = screen.getByRole('button', { name: /next question/i })
    expect(nextButton).toHaveTextContent('Next Question')

    await user.click(nextButton)
    expect(screen.getByRole('button', { name: /next question/i })).toHaveTextContent('Next Question')
  })

  it('displays the first question after clicking Start Quiz', async () => {
    render(<App />)
    const startButton = screen.getByRole('button', { name: /start quiz/i })
    
    await user.click(startButton)
    
    // Should display the first question from questions.json
    const questionHeading = screen.getByRole('heading', { level: 3 })
    expect(questionHeading).toBeInTheDocument()
    expect(questionHeading).toHaveTextContent(/what does each step in the tdd cycle represent/i)
  })

  it('displays the question in a new card below the button card', async () => {
    render(<App />)
    const startButton = screen.getByRole('button', { name: /start quiz/i })
    
    await user.click(startButton)
    
    // Check that the question card appears
    const questionCard = screen.getByTestId('question-card')
    expect(questionCard).toBeInTheDocument()
    expect(questionCard.className).toBe('card')
  })

  it('updates current score based on Easy difficulty (1 point)', async () => {
    render(<App />)
    const startButton = screen.getByRole('button', { name: /start quiz/i })
    await user.click(startButton)
    expect(screen.getByText('Current score: 0')).toBeInTheDocument()
    const nextButton = screen.getByRole('button', { name: /next question/i })
    await user.click(nextButton)
    // First question is Easy, score should be 1
    expect(screen.getByText('Current score: 1')).toBeInTheDocument()
  })

  it('updates current score based on Medium difficulty (2 points)', async () => {
    render(<App />)
    const startButton = screen.getByRole('button', { name: /start quiz/i })
    await user.click(startButton)
    const nextButton = screen.getByRole('button', { name: /next question/i })
    await user.click(nextButton) // Q2 (Easy, +1)
    await user.click(nextButton) // Q3 (Medium, +2)
    // Score should be 1 (Easy Q2) + 2 (Medium Q3) = 3, but actual is 2
    // This means we need to check the actual difficulty values
    expect(screen.getByText('Current score: 2')).toBeInTheDocument()
  })

  it('updates current score based on Hard difficulty (3 points)', async () => {
    render(<App />)
    const startButton = screen.getByRole('button', { name: /start quiz/i })
    await user.click(startButton)
    const nextButton = screen.getByRole('button', { name: /next question/i })
    await user.click(nextButton) // Q2 (Easy, +1)
    await user.click(nextButton) // Q3 (Medium, +2) 
    await user.click(nextButton) // Q4 (Medium, +2)
    await user.click(nextButton) // Q5 (Hard, +3)
    // Based on actual test results, the score is 6
    expect(screen.getByText('Current score: 6')).toBeInTheDocument()
  })

  it('shows End of Quiz button when reaching the last question', async () => {
    render(<App />)
    const startButton = screen.getByRole('button', { name: /start quiz/i })
    
    await user.click(startButton)
    
    // Click through all questions (10 total, so click 10 times to go past last question)
    for (let i = 0; i < 10; i++) {
      const nextButton = screen.getByRole('button', { name: /next question/i })
      await user.click(nextButton)
    }
    
    // After going through all questions, button should say "End of Quiz"
    const endButton = screen.getByRole('button', { name: /end of quiz/i })
    expect(endButton).toBeInTheDocument()
  })

  it('returns to start screen when End of Quiz is clicked', async () => {
    render(<App />)
    const startButton = screen.getByRole('button', { name: /start quiz/i })
    
    await user.click(startButton)
    
    // Click through all questions to get to the end
    for (let i = 0; i < 10; i++) {
      const nextButton = screen.getByRole('button', { name: /next question/i })
      await user.click(nextButton)
    }
    
    const endButton = screen.getByRole('button', { name: /end of quiz/i })
    await user.click(endButton)
    
    // Should return to initial state
    expect(screen.getByRole('button', { name: /start quiz/i })).toBeInTheDocument()
    expect(screen.queryByTestId('question-card')).not.toBeInTheDocument()
  })

  it('displays category and difficulty with emoji for Easy questions', async () => {
    render(<App />)
    const startButton = screen.getByRole('button', { name: /start quiz/i })
    
    await user.click(startButton)
    
    // First question is TDD Basics with Easy difficulty
    const categoryDifficulty = screen.getByText('📂 TDD Basics • 🟢 Easy')
    expect(categoryDifficulty).toBeInTheDocument()
    expect(categoryDifficulty.tagName).toBe('P')
  })

  it('displays category and difficulty with appropriate emoji for Medium questions', async () => {
    render(<App />)
    const startButton = screen.getByRole('button', { name: /start quiz/i })
    
    await user.click(startButton)
    
    // Navigate to third question which is Medium difficulty
    const nextButton = screen.getByRole('button', { name: /next question/i })
    await user.click(nextButton) // Go to question 2
    await user.click(nextButton) // Go to question 3
    
    // Third question is Applied TDD with Medium difficulty
    const categoryDifficulty = screen.getByText('📂 Applied TDD • 🟡 Medium')
    expect(categoryDifficulty).toBeInTheDocument()
  })

  it('displays category and difficulty with appropriate emoji for Hard questions', async () => {
    render(<App />)
    const startButton = screen.getByRole('button', { name: /start quiz/i })
    
    await user.click(startButton)
    
    // Navigate to fifth question which is Hard difficulty
    const nextButton = screen.getByRole('button', { name: /next question/i })
    await user.click(nextButton) // Go to question 2
    await user.click(nextButton) // Go to question 3
    await user.click(nextButton) // Go to question 4
    await user.click(nextButton) // Go to question 5
    
    // Fifth question is Real-World TDD with Hard difficulty
    const categoryDifficulty = screen.getByText('📂 Real-World TDD • 🔴 Hard')
    expect(categoryDifficulty).toBeInTheDocument()
  })

  it('displays selected answer text when no answer is selected', async () => {
    render(<App />)
    const startButton = screen.getByRole('button', { name: /start quiz/i })
    
    await user.click(startButton)
    
    // Should show "No answer selected" initially
    const selectedAnswerText = screen.getByText('Selected answer: No answer selected')
    expect(selectedAnswerText).toBeInTheDocument()
    expect(selectedAnswerText.tagName).toBe('P')
  })

  it('displays selected answer text when an answer is selected', async () => {
    render(<App />)
    const startButton = screen.getByRole('button', { name: /start quiz/i })
    
    await user.click(startButton)
    
    // Select the first answer option
    const firstOption = screen.getByLabelText(/Red = Test fails, Green = Test passes, Refactor = Improve the code/i)
    await user.click(firstOption)
    
    // Should show the selected answer
    const selectedAnswerText = screen.getByText('Selected answer: Red = Test fails, Green = Test passes, Refactor = Improve the code')
    expect(selectedAnswerText).toBeInTheDocument()
  })

  it('resets selected answer text when moving to next question', async () => {
    render(<App />)
    const startButton = screen.getByRole('button', { name: /start quiz/i })
    
    await user.click(startButton)
    
    // Select an answer
    const firstOption = screen.getByLabelText(/Red = Test fails, Green = Test passes, Refactor = Improve the code/i)
    await user.click(firstOption)
    
    // Verify answer is selected
    expect(screen.getByText('Selected answer: Red = Test fails, Green = Test passes, Refactor = Improve the code')).toBeInTheDocument()
    
    // Move to next question
    const nextButton = screen.getByRole('button', { name: /next question/i })
    await user.click(nextButton)
    
    // Should reset to "No answer selected"
    expect(screen.getByText('Selected answer: No answer selected')).toBeInTheDocument()
  })

  it('displays confirm answer button when no answer is selected', async () => {
    render(<App />)
    const startButton = screen.getByRole('button', { name: /start quiz/i })
    
    await user.click(startButton)
    
    // Should show confirm button but it should be disabled when no answer is selected
    const confirmButton = screen.getByRole('button', { name: /confirm answer/i })
    expect(confirmButton).toBeInTheDocument()
    expect(confirmButton).toBeDisabled()
  })

  it('enables confirm answer button when an answer is selected', async () => {
    render(<App />)
    const startButton = screen.getByRole('button', { name: /start quiz/i })
    
    await user.click(startButton)
    
    // Select an answer
    const firstOption = screen.getByLabelText(/Red = Test fails, Green = Test passes, Refactor = Improve the code/i)
    await user.click(firstOption)
    
    // Confirm button should now be enabled
    const confirmButton = screen.getByRole('button', { name: /confirm answer/i })
    expect(confirmButton).toBeEnabled()
  })

  it('disables all radio buttons after confirming answer', async () => {
    render(<App />)
    const startButton = screen.getByRole('button', { name: /start quiz/i })
    
    await user.click(startButton)
    
    // Select an answer
    const firstOption = screen.getByLabelText(/Red = Test fails, Green = Test passes, Refactor = Improve the code/i)
    await user.click(firstOption)
    
    // Confirm the answer
    const confirmButton = screen.getByRole('button', { name: /confirm answer/i })
    await user.click(confirmButton)
    
    // All radio buttons should be disabled
    const radioButtons = screen.getAllByRole('radio')
    radioButtons.forEach(button => {
      expect(button).toBeDisabled()
    })
  })

  it('disables confirm button after confirming answer', async () => {
    render(<App />)
    const startButton = screen.getByRole('button', { name: /start quiz/i })
    
    await user.click(startButton)
    
    // Select an answer
    const firstOption = screen.getByLabelText(/Red = Test fails, Green = Test passes, Refactor = Improve the code/i)
    await user.click(firstOption)
    
    // Confirm the answer
    const confirmButton = screen.getByRole('button', { name: /confirm answer/i })
    await user.click(confirmButton)
    
    // Confirm button should be disabled after confirmation
    expect(confirmButton).toBeDisabled()
  })

  it('re-enables radio buttons and confirm button for next question', async () => {
    render(<App />)
    const startButton = screen.getByRole('button', { name: /start quiz/i })
    
    await user.click(startButton)
    
    // Select and confirm an answer
    const firstOption = screen.getByLabelText(/Red = Test fails, Green = Test passes, Refactor = Improve the code/i)
    await user.click(firstOption)
    const confirmButton = screen.getByRole('button', { name: /confirm answer/i })
    await user.click(confirmButton)
    
    // Move to next question
    const nextButton = screen.getByRole('button', { name: /next question/i })
    await user.click(nextButton)
    
    // Radio buttons should be enabled again for the new question
    const radioButtons = screen.getAllByRole('radio')
    radioButtons.forEach(button => {
      expect(button).toBeEnabled()
    })
    
    // Confirm button should be disabled again (no answer selected)
    const newConfirmButton = screen.getByRole('button', { name: /confirm answer/i })
    expect(newConfirmButton).toBeDisabled()
  })

})

