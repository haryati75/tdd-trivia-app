import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('Initial Rendering', () => {
  it('renders the main heading', () => {
    render(<App />)
    const heading = screen.getByText('TDD Trivia')
    expect(heading).toBeInTheDocument()
  })

  it('renders the main heading as h1 element', () => {
    render(<App />)
    const heading = screen.getByRole('heading', { name: 'TDD Trivia', level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading.tagName).toBe('H1')
  })

  it('renders the start quiz button initially', () => {
    render(<App />)
    const button = screen.getByRole('button', { name: /start quiz/i })
    expect(button).toBeInTheDocument()
  })

  it('does not show score initially', () => {
    render(<App />)
    
    // Score should not be visible initially
    expect(screen.queryByText(/Score: \d+\/\d+ points/)).not.toBeInTheDocument()
  })
})

describe('Quiz Navigation', () => {
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    user = userEvent.setup()
  })

  it('displays score after quiz starts', async () => {
    render(<App />)
    const startButton = screen.getByRole('button', { name: /start quiz/i })
    
    await user.click(startButton)
    
    const currentScore = screen.getByText(/Score: 0\/\d+ points/)
    expect(currentScore).toBeInTheDocument()
    expect(currentScore.tagName).toBe('P')
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

  it('shows final score assessment when quiz is completed', async () => {
    render(<App />)
    const startButton = screen.getByRole('button', { name: /start quiz/i })
    
    await user.click(startButton)
    
    // Click through all questions to get to the end
    for (let i = 0; i < 10; i++) {
      const nextButton = screen.getByRole('button', { name: /next question/i })
      await user.click(nextButton)
    }
    
    // Should show final score assessment with emoji and message
    expect(screen.getByText(/🏆|🌟|👏|👍|📚|💪|🎯/)).toBeInTheDocument()
    expect(screen.getByText(/Outstanding|Excellent|Great|Good|Not bad|Keep trying|Don't give up/)).toBeInTheDocument()
  })
})

describe('Question Display', () => {
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    user = userEvent.setup()
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
})

describe('Answer Selection & Confirmation', () => {
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    user = userEvent.setup()
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

  it('does not display confirm answer button when no answer is selected', async () => {
    render(<App />)
    const startButton = screen.getByRole('button', { name: /start quiz/i })
    
    await user.click(startButton)
    
    // Should not show confirm button when no answer is selected
    const confirmButton = screen.queryByRole('button', { name: /confirm answer/i })
    expect(confirmButton).not.toBeInTheDocument()
  })

  it('enables confirm answer button when an answer is selected', async () => {
    render(<App />)
    const startButton = screen.getByRole('button', { name: /start quiz/i })
    
    await user.click(startButton)
    
    // Select an answer
    const firstOption = screen.getByLabelText(/Red = Test fails, Green = Test passes, Refactor = Improve the code/i)
    await user.click(firstOption)
    
    // Confirm button should now appear and be enabled
    const confirmButton = screen.getByRole('button', { name: /confirm answer/i })
    expect(confirmButton).toBeInTheDocument()
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

  it('re-enables radio buttons for next question', async () => {
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
    
    // Confirm button should not be present (no answer selected)
    const newConfirmButton = screen.queryByRole('button', { name: /confirm answer/i })
    expect(newConfirmButton).not.toBeInTheDocument()
  })
})

describe('Scoring System', () => {
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    user = userEvent.setup()
  })

  it('does not update score when no answer is confirmed', async () => {
    render(<App />)
    const startButton = screen.getByRole('button', { name: /start quiz/i })
    await user.click(startButton)
    expect(screen.getByText(/Score: 0\/\d+ points/)).toBeInTheDocument()
    const nextButton = screen.getByRole('button', { name: /next question/i })
    await user.click(nextButton)
    // No answer selected or confirmed, score should remain 0
    expect(screen.getByText(/Score: 0\/\d+ points/)).toBeInTheDocument()
  })

  it('does not update score when moving through multiple questions without confirming', async () => {
    render(<App />)
    const startButton = screen.getByRole('button', { name: /start quiz/i })
    await user.click(startButton)
    const nextButton = screen.getByRole('button', { name: /next question/i })
    await user.click(nextButton) // Q2 (no answer confirmed)
    await user.click(nextButton) // Q3 (no answer confirmed)
    // No answers confirmed, score should remain 0
    expect(screen.getByText(/Score: 0\/\d+ points/)).toBeInTheDocument()
  })

  it('does not update score across many questions without confirming answers', async () => {
    render(<App />)
    const startButton = screen.getByRole('button', { name: /start quiz/i })
    await user.click(startButton)
    const nextButton = screen.getByRole('button', { name: /next question/i })
    await user.click(nextButton) // Q2 (no answer confirmed)
    await user.click(nextButton) // Q3 (no answer confirmed) 
    await user.click(nextButton) // Q4 (no answer confirmed)
    await user.click(nextButton) // Q5 (no answer confirmed)
    // No answers confirmed, score should remain 0
    expect(screen.getByText(/Score: 0\/\d+ points/)).toBeInTheDocument()
  })

  it('updates score immediately when confirming correct answer', async () => {
    render(<App />)
    const startButton = screen.getByRole('button', { name: /start quiz/i })
    await user.click(startButton)
    
    // Select correct answer for first question
    const correctOption = screen.getByLabelText(/Red = Test fails, Green = Test passes, Refactor = Improve the code/i)
    await user.click(correctOption)
    
    // Score should still be 0 before confirming
    expect(screen.getByText(/Score: 0\/\d+ points/)).toBeInTheDocument()
    
    // Confirm answer - should immediately update score to 1 point for Easy correct answer
    const confirmButton = screen.getByRole('button', { name: /confirm answer/i })
    await user.click(confirmButton)
    
    // Score should be updated immediately after confirming, before clicking Next
    expect(screen.getByText(/Score: 1\/\d+ points/)).toBeInTheDocument()
  })

  it('does not update score when confirming incorrect answer', async () => {
    render(<App />)
    const startButton = screen.getByRole('button', { name: /start quiz/i })
    await user.click(startButton)
    
    // Select incorrect answer for first question
    const incorrectOption = screen.getByLabelText(/Red = Code is working, Green = Write tests, Refactor = Break it down/i)
    await user.click(incorrectOption)
    
    // Score should still be 0 before confirming
    expect(screen.getByText(/Score: 0\/\d+ points/)).toBeInTheDocument()
    
    // Confirm answer - should not update score for incorrect answer
    const confirmButton = screen.getByRole('button', { name: /confirm answer/i })
    await user.click(confirmButton)
    
    // Score should remain 0 after confirming incorrect answer
    expect(screen.getByText(/Score: 0\/\d+ points/)).toBeInTheDocument()
  })

  it('only adds score for correct answers', async () => {
    render(<App />)
    const startButton = screen.getByRole('button', { name: /start quiz/i })
    await user.click(startButton)
    
    // Select correct answer for first question and confirm
    const correctOption = screen.getByLabelText(/Red = Test fails, Green = Test passes, Refactor = Improve the code/i)
    await user.click(correctOption)
    const confirmButton = screen.getByRole('button', { name: /confirm answer/i })
    await user.click(confirmButton)
    
    // Move to next question - should add 1 point for Easy correct answer
    const nextButton = screen.getByRole('button', { name: /next question/i })
    await user.click(nextButton)
    
    expect(screen.getByText(/Score: 1\/\d+ points/)).toBeInTheDocument()
  })

  it('does not add score for incorrect answers', async () => {
    render(<App />)
    const startButton = screen.getByRole('button', { name: /start quiz/i })
    await user.click(startButton)
    
    // Select incorrect answer for first question and confirm
    const incorrectOption = screen.getByLabelText(/Red = Code is working, Green = Write tests, Refactor = Break it down/i)
    await user.click(incorrectOption)
    const confirmButton = screen.getByRole('button', { name: /confirm answer/i })
    await user.click(confirmButton)
    
    // Move to next question - should not add any points
    const nextButton = screen.getByRole('button', { name: /next question/i })
    await user.click(nextButton)
    
    expect(screen.getByText(/Score: 0\/\d+ points/)).toBeInTheDocument()
  })

  it('correctly calculates mixed correct and incorrect answers', async () => {
    render(<App />)
    const startButton = screen.getByRole('button', { name: /start quiz/i })
    await user.click(startButton)
    
    // First question: Select correct answer (Easy = 1 point)
    const correctOption1 = screen.getByLabelText(/Red = Test fails, Green = Test passes, Refactor = Improve the code/i)
    await user.click(correctOption1)
    let confirmButton = screen.getByRole('button', { name: /confirm answer/i })
    await user.click(confirmButton)
    let nextButton = screen.getByRole('button', { name: /next question/i })
    await user.click(nextButton)
    
    // Second question: Select incorrect answer (should not add points)
    const incorrectOption2 = screen.getByLabelText(/Refactor/i)
    await user.click(incorrectOption2)
    confirmButton = screen.getByRole('button', { name: /confirm answer/i })
    await user.click(confirmButton)
    nextButton = screen.getByRole('button', { name: /next question/i })
    await user.click(nextButton)
    
    // Should only have 1 point from the first correct answer
    expect(screen.getByText(/Score: 1\/\d+ points/)).toBeInTheDocument()
  })

  it('does not add score when moving to next question without confirming', async () => {
    render(<App />)
    const startButton = screen.getByRole('button', { name: /start quiz/i })
    await user.click(startButton)
    
    // Select an answer but don't confirm
    const correctOption = screen.getByLabelText(/Red = Test fails, Green = Test passes, Refactor = Improve the code/i)
    await user.click(correctOption)
    
    // Move to next question without confirming
    const nextButton = screen.getByRole('button', { name: /next question/i })
    await user.click(nextButton)
    
    // Should not add any points since answer wasn't confirmed
    expect(screen.getByText(/Score: 0\/\d+ points/)).toBeInTheDocument()
  })
})

describe('Answer Feedback', () => {
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    user = userEvent.setup()
  })

  it('shows correct answer feedback when selecting the right answer and confirming', async () => {
    render(<App />)
    const startButton = screen.getByRole('button', { name: /start quiz/i })
    
    await user.click(startButton)
    
    // Select the correct answer (index 1 for first question)
    const correctOption = screen.getByLabelText(/Red = Test fails, Green = Test passes, Refactor = Improve the code/i)
    await user.click(correctOption)
    
    // Confirm the answer
    const confirmButton = screen.getByRole('button', { name: /confirm answer/i })
    await user.click(confirmButton)
    
    // Should show motivational feedback with fun emoji for correct answer
    expect(screen.getByText(/🎉|🚀|⭐|🎯|💯|🔥/)).toBeInTheDocument()
    expect(screen.getByText(/Awesome!|Fantastic!|Perfect!|Brilliant!|Excellent!|Amazing!/)).toBeInTheDocument()
  })

  it('shows incorrect answer feedback when selecting the wrong answer and confirming', async () => {
    render(<App />)
    const startButton = screen.getByRole('button', { name: /start quiz/i })
    
    await user.click(startButton)
    
    // Select an incorrect answer (index 0 for first question, correct is index 1)
    const incorrectOption = screen.getByLabelText(/Red = Code is working, Green = Write tests, Refactor = Break it down/i)
    await user.click(incorrectOption)
    
    // Confirm the answer
    const confirmButton = screen.getByRole('button', { name: /confirm answer/i })
    await user.click(confirmButton)
    
    // Should show motivational feedback with fun emoji for incorrect answer
    expect(screen.getByText(/💪|🎯|📚|🌟|🚀|💡/)).toBeInTheDocument()
    expect(screen.getByText(/Oops!|Not quite!|Close,|Don't worry|Almost|No worries/)).toBeInTheDocument()
  })

  it('does not show motivational feedback before confirming answer', async () => {
    render(<App />)
    const startButton = screen.getByRole('button', { name: /start quiz/i })
    
    await user.click(startButton)
    
    // Select an answer but don't confirm
    const correctOption = screen.getByLabelText(/Red = Test fails, Green = Test passes, Refactor = Improve the code/i)
    await user.click(correctOption)
    
    // Should show selected answer but no motivational feedback yet
    expect(screen.getByText('Selected answer: Red = Test fails, Green = Test passes, Refactor = Improve the code')).toBeInTheDocument()
    expect(screen.queryByText(/🎉|🚀|⭐|🎯|💯|🔥|💪|📚|🌟|💡/)).not.toBeInTheDocument()
  })

  it('hides selected answer text when moving to next question', async () => {
    render(<App />)
    const startButton = screen.getByRole('button', { name: /start quiz/i })
    
    await user.click(startButton)
    
    // Select and confirm an answer
    const correctOption = screen.getByLabelText(/Red = Test fails, Green = Test passes, Refactor = Improve the code/i)
    await user.click(correctOption)
    const confirmButton = screen.getByRole('button', { name: /confirm answer/i })
    await user.click(confirmButton)
    
    // Move to next question
    const nextButton = screen.getByRole('button', { name: /next question/i })
    await user.click(nextButton)
    
    // Should not show any selected answer text or motivational feedback
    expect(screen.queryByText(/Selected answer:/)).not.toBeInTheDocument()
    expect(screen.queryByText(/🎉|🚀|⭐|🎯|💯|🔥|💪|📚|🌟|💡/)).not.toBeInTheDocument()
  })
})
