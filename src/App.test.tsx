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
})

describe('App increments', () => {
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    user = userEvent.setup()
  })

  it('shows score button after clicking Start Quiz', async () => {
    render(<App />)
    const startButton = screen.getByRole('button', { name: /start quiz/i })
    
    await user.click(startButton)
    
    const scoreButton = screen.getByRole('button', { name: /score is 0/i })
    expect(scoreButton).toBeInTheDocument()
  })

  it('score when button is clicked after starting quiz', async () => {
    render(<App />)
    const startButton = screen.getByRole('button', { name: /start quiz/i })
    
    await user.click(startButton)
    
    const scoreButton = screen.getByRole('button', { name: /score is 0/i })
    await user.click(scoreButton)

    expect(screen.getByRole('button', { name: /score is 1/i })).toBeInTheDocument()
  })

  it('score multiple times when button is clicked multiple times after starting quiz', async () => {
    render(<App />)
    const startButton = screen.getByRole('button', { name: /start quiz/i })
    
    await user.click(startButton)
    
    const scoreButton = screen.getByRole('button', { name: /score is 0/i })
    await user.click(scoreButton)
    await user.click(scoreButton)
    await user.click(scoreButton)

    expect(screen.getByRole('button', { name: /score is 3/i })).toBeInTheDocument()
  })

  it('displays the correct score text format after starting quiz', async () => {
    render(<App />)
    const startButton = screen.getByRole('button', { name: /start quiz/i })
    
    await user.click(startButton)
    
    const scoreButton = screen.getByRole('button')
    expect(scoreButton).toHaveTextContent('score is 0')

    await user.click(scoreButton)
    expect(scoreButton).toHaveTextContent('score is 1')
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

})

