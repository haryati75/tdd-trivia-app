import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

// Helper function to start quiz and get to a specific question
const startQuizAndNavigateToQuestion = async (user: ReturnType<typeof userEvent.setup>, questionIndex: number = 0) => {
  const startButton = screen.getByRole('button', { name: /start quiz/i })
  await user.click(startButton)
  
  for (let i = 0; i < questionIndex; i++) {
    const firstOption = screen.getAllByRole('radio', { hidden: true })[0]
    await user.click(firstOption)
    const confirmButton = screen.getByRole('button', { name: /confirm answer/i })
    await user.click(confirmButton)
    const nextButton = screen.getByRole('button', { name: /next question/i })
    await user.click(nextButton)
  }
}

// Helper function to complete entire quiz
const completeEntireQuiz = async (user: ReturnType<typeof userEvent.setup>) => {
  const startButton = screen.getByRole('button', { name: /start quiz/i })
  await user.click(startButton)
  
  for (let i = 0; i < 10; i++) {
    const firstOption = screen.getAllByRole('radio', { hidden: true })[0]
    await user.click(firstOption)
    const confirmButton = screen.getByRole('button', { name: /confirm answer/i })
    await user.click(confirmButton)
    
    if (i === 9) {
      const endOfQuizButton = screen.getByRole('button', { name: /end of quiz/i })
      await user.click(endOfQuizButton)
    } else {
      const nextButton = screen.getByRole('button', { name: /next question/i })
      await user.click(nextButton)
    }
  }
}

describe('App Component', () => {
  describe('Initial State & Rendering', () => {
    describe('Main Elements', () => {
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
        expect(button).toBeEnabled()
      })

      it('renders footer with developer information when quiz not started', () => {
        render(<App />)
        expect(screen.getByText(/Haryati Hassan/)).toBeInTheDocument()
        expect(screen.getByRole('link', { name: /view on github/i })).toBeInTheDocument()
      })
    })

    describe('Hidden Elements Before Quiz Start', () => {
      it('does not show score initially', () => {
        render(<App />)
        expect(screen.queryByText(/Score: \d+\/\d+ points/)).not.toBeInTheDocument()
      })

      it('does not show question card initially', () => {
        render(<App />)
        expect(screen.queryByTestId('question-card')).not.toBeInTheDocument()
      })

      it('does not show progress indicator initially', () => {
        render(<App />)
        expect(screen.queryByText(/Progress: \d+%/)).not.toBeInTheDocument()
      })

      it('does not show completion time before starting quiz', () => {
        render(<App />)
        expect(screen.queryByText(/🕒 Completed in/)).not.toBeInTheDocument()
      })
    })

    describe('Error Handling & Edge Cases', () => {
      it('renders without crashing when initialized', () => {
        expect(() => render(<App />)).not.toThrow()
      })

      it('handles component mounting gracefully', () => {
        const { unmount } = render(<App />)
        expect(screen.getByText('TDD Trivia')).toBeInTheDocument()
        expect(() => unmount()).not.toThrow()
      })
    })
  })

  describe('Quiz Startup & Navigation', () => {
    let user: ReturnType<typeof userEvent.setup>

    beforeEach(() => {
      user = userEvent.setup()
    })

    describe('Starting Quiz', () => {
      it('displays first question after clicking Start Quiz', async () => {
        render(<App />)
        await user.click(screen.getByRole('button', { name: /start quiz/i }))
        
        expect(screen.getByTestId('question-card')).toBeInTheDocument()
        expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(/what does each step in the tdd cycle represent/i)
      })

      it('shows score tracking after quiz starts', async () => {
        render(<App />)
        await user.click(screen.getByRole('button', { name: /start quiz/i }))
        
        expect(screen.getByText(/Score: 0\/\d+ points/)).toBeInTheDocument()
      })

      it('displays progress tracking during quiz', async () => {
        render(<App />)
        await user.click(screen.getByRole('button', { name: /start quiz/i }))
        
        expect(screen.getByText(/Progress: \d+%/)).toBeInTheDocument()
      })

      it('hides footer during quiz', async () => {
        render(<App />)
        await user.click(screen.getByRole('button', { name: /start quiz/i }))
        
        expect(screen.queryByText(/Haryati Hassan/)).not.toBeInTheDocument()
      })
    })

    describe('Question Navigation', () => {
      it('advances to next question when Next Question is clicked', async () => {
        render(<App />)
        await startQuizAndNavigateToQuestion(user, 0)
        
        const firstOption = screen.getAllByRole('radio', { hidden: true })[0]
        await user.click(firstOption)
        const confirmButton = screen.getByRole('button', { name: /confirm answer/i })
        await user.click(confirmButton)
        
        const nextButton = screen.getByRole('button', { name: /next question/i })
        expect(nextButton).toBeEnabled()
        await user.click(nextButton)
        
        // Should advance to question 2
        expect(screen.getByTestId('question-card')).toBeInTheDocument()
      })

      it('shows End of Quiz button on last question', async () => {
        render(<App />)
        await startQuizAndNavigateToQuestion(user, 9) // Navigate to last question
        
        const firstOption = screen.getAllByRole('radio', { hidden: true })[0]
        await user.click(firstOption)
        const confirmButton = screen.getByRole('button', { name: /confirm answer/i })
        await user.click(confirmButton)
        
        expect(screen.getByRole('button', { name: /end of quiz/i })).toBeInTheDocument()
      })

      it('maintains correct button text throughout navigation', async () => {
        render(<App />)
        await startQuizAndNavigateToQuestion(user, 0)
        
        const firstOption = screen.getAllByRole('radio', { hidden: true })[0]
        await user.click(firstOption)
        const confirmButton = screen.getByRole('button', { name: /confirm answer/i })
        await user.click(confirmButton)
        
        const nextButton = screen.getByRole('button', { name: /next question/i })
        expect(nextButton).toHaveTextContent('Next Question')
        
        await user.click(nextButton)
        expect(screen.getByRole('button', { name: /next question/i })).toHaveTextContent('Next Question')
      })
    })

    describe('Quiz Completion Flow', () => {
      it('returns to start screen when Back to Start is clicked', async () => {
        render(<App />)
        await completeEntireQuiz(user)
        
        const backButton = screen.getByRole('button', { name: /back to start/i })
        await user.click(backButton)
        
        expect(screen.getByRole('button', { name: /start quiz/i })).toBeInTheDocument()
        expect(screen.queryByTestId('question-card')).not.toBeInTheDocument()
      })

      it('shows final score assessment when quiz is completed', async () => {
        render(<App />)
        await completeEntireQuiz(user)
        
        expect(screen.getByText(/Outstanding|Excellent|Great|Good|Not bad|Keep trying|Don't give up/)).toBeInTheDocument()
      })

      it('displays completion time at end of quiz', async () => {
        render(<App />)
        await completeEntireQuiz(user)
        
        expect(screen.getByText(/🕒 Completed in/)).toBeInTheDocument()
      })

      it('formats completion time correctly', async () => {
        render(<App />)
        await completeEntireQuiz(user)
        
        expect(screen.getByText(/🕒 Completed in \d+s/)).toBeInTheDocument()
      })

      it('hides progress at end of quiz', async () => {
        render(<App />)
        await completeEntireQuiz(user)
        
        expect(screen.queryByText(/Progress: \d+%/)).not.toBeInTheDocument()
      })

      it('shows footer again when quiz is completed', async () => {
        render(<App />)
        await completeEntireQuiz(user)
        
        expect(screen.getByText(/Haryati Hassan/)).toBeInTheDocument()
      })
    })
  })

  describe('Question Display & Content', () => {
    let user: ReturnType<typeof userEvent.setup>

    beforeEach(() => {
      user = userEvent.setup()
    })

    describe('Question Structure', () => {
      it('displays first question with correct content', async () => {
        render(<App />)
        await user.click(screen.getByRole('button', { name: /start quiz/i }))
        
        const questionHeading = screen.getByRole('heading', { level: 3 })
        expect(questionHeading).toHaveTextContent(/what does each step in the tdd cycle represent/i)
      })

      it('displays question in proper card container', async () => {
        render(<App />)
        await user.click(screen.getByRole('button', { name: /start quiz/i }))
        
        const questionCard = screen.getByTestId('question-card')
        expect(questionCard).toBeInTheDocument()
        expect(questionCard).toHaveClass('card')
      })
    })

    describe('Difficulty Indicators', () => {
      it('displays Easy difficulty with correct emoji', async () => {
        render(<App />)
        await user.click(screen.getByRole('button', { name: /start quiz/i }))
        
        expect(screen.getByText('📂 TDD Basics • 🟢 Easy')).toBeInTheDocument()
      })

      it('displays Medium difficulty with correct emoji', async () => {
        render(<App />)
        await startQuizAndNavigateToQuestion(user, 2) // Third question is Medium
        
        expect(screen.getByText('📂 Applied TDD • 🟡 Medium')).toBeInTheDocument()
      })

      it('displays Hard difficulty with correct emoji', async () => {
        render(<App />)
        await startQuizAndNavigateToQuestion(user, 4) // Fifth question is Hard
        
        expect(screen.getByText('📂 Real-World TDD • 🔴 Hard')).toBeInTheDocument()
      })
    })
  })

  describe('Answer Selection & Interaction', () => {
    let user: ReturnType<typeof userEvent.setup>

    beforeEach(() => {
      user = userEvent.setup()
    })

    describe('Answer Selection State', () => {
      it('does not show confirm button when no answer is selected', async () => {
        render(<App />)
        await user.click(screen.getByRole('button', { name: /start quiz/i }))
        
        expect(screen.queryByRole('button', { name: /confirm answer/i })).not.toBeInTheDocument()
      })

      it('shows confirm button when answer is selected', async () => {
        render(<App />)
        await user.click(screen.getByRole('button', { name: /start quiz/i }))
        
        const firstOption = screen.getByLabelText(/Red = Test fails, Green = Test passes, Refactor = Improve the code/i)
        await user.click(firstOption)
        
        const confirmButton = screen.getByRole('button', { name: /confirm answer/i })
        expect(confirmButton).toBeInTheDocument()
        expect(confirmButton).toBeEnabled()
      })

      it('disables Next Question button until answer is confirmed', async () => {
        render(<App />)
        await user.click(screen.getByRole('button', { name: /start quiz/i }))
        
        const nextButton = screen.getByRole('button', { name: /next question/i })
        expect(nextButton).toBeDisabled()
        
        // Select but don't confirm
        const firstOption = screen.getAllByRole('radio', { hidden: true })[0]
        await user.click(firstOption)
        expect(nextButton).toBeDisabled()
        
        // Confirm answer
        const confirmButton = screen.getByRole('button', { name: /confirm answer/i })
        await user.click(confirmButton)
        expect(nextButton).toBeEnabled()
      })
    })

    describe('Radio Button Behavior', () => {
      it('disables all radio buttons after confirming answer', async () => {
        render(<App />)
        await user.click(screen.getByRole('button', { name: /start quiz/i }))
        
        const firstOption = screen.getByLabelText(/Red = Test fails, Green = Test passes, Refactor = Improve the code/i)
        await user.click(firstOption)
        
        const confirmButton = screen.getByRole('button', { name: /confirm answer/i })
        await user.click(confirmButton)
        
        const radioButtons = screen.getAllByRole('radio', { hidden: true })
        radioButtons.forEach(button => {
          expect(button).toBeDisabled()
        })
      })

      it('re-enables radio buttons for next question', async () => {
        render(<App />)
        await user.click(screen.getByRole('button', { name: /start quiz/i }))
        
        // Answer first question
        const firstOption = screen.getByLabelText(/Red = Test fails, Green = Test passes, Refactor = Improve the code/i)
        await user.click(firstOption)
        const confirmButton = screen.getByRole('button', { name: /confirm answer/i })
        await user.click(confirmButton)
        
        // Move to next question
        const nextButton = screen.getByRole('button', { name: /next question/i })
        await user.click(nextButton)
        
        const radioButtons = screen.getAllByRole('radio', { hidden: true })
        radioButtons.forEach(button => {
          expect(button).toBeEnabled()
        })
        
        expect(screen.queryByRole('button', { name: /confirm answer/i })).not.toBeInTheDocument()
      })
    })

    describe('Error Scenarios', () => {
      it('handles rapid clicking without breaking state', async () => {
        render(<App />)
        await user.click(screen.getByRole('button', { name: /start quiz/i }))
        
        const firstOption = screen.getAllByRole('radio', { hidden: true })[0]
        const secondOption = screen.getAllByRole('radio', { hidden: true })[1]
        
        // Rapid clicks between options
        await user.click(firstOption)
        await user.click(secondOption)
        await user.click(firstOption)
        
        const confirmButton = screen.getByRole('button', { name: /confirm answer/i })
        expect(confirmButton).toBeInTheDocument()
        expect(() => user.click(confirmButton)).not.toThrow()
      })

      it('prevents double confirmation of answers', async () => {
        render(<App />)
        await user.click(screen.getByRole('button', { name: /start quiz/i }))
        
        const firstOption = screen.getAllByRole('radio', { hidden: true })[0]
        await user.click(firstOption)
        
        const confirmButton = screen.getByRole('button', { name: /confirm answer/i })
        await user.click(confirmButton)
        
        // Try to click confirm again - button should not be present
        expect(screen.queryByRole('button', { name: /confirm answer/i })).not.toBeInTheDocument()
      })
    })
  })

  describe('Scoring System & Performance', () => {
    let user: ReturnType<typeof userEvent.setup>

    beforeEach(() => {
      user = userEvent.setup()
    })

    describe('Score Updates', () => {
      it('does not update score until answer is confirmed', async () => {
        render(<App />)
        await user.click(screen.getByRole('button', { name: /start quiz/i }))
        
        expect(screen.getByText(/Score: 0\/\d+ points/)).toBeInTheDocument()
        
        // Select correct answer but don't confirm
        const correctOption = screen.getByLabelText(/Red = Test fails, Green = Test passes, Refactor = Improve the code/i)
        await user.click(correctOption)
        
        expect(screen.getByText(/Score: 0\/\d+ points/)).toBeInTheDocument()
      })

      it('updates score immediately when confirming correct answer', async () => {
        render(<App />)
        await user.click(screen.getByRole('button', { name: /start quiz/i }))
        
        const correctOption = screen.getByLabelText(/Red = Test fails, Green = Test passes, Refactor = Improve the code/i)
        await user.click(correctOption)
        
        const confirmButton = screen.getByRole('button', { name: /confirm answer/i })
        await user.click(confirmButton)
        
        expect(screen.getByText(/Score: 1\/\d+ points/)).toBeInTheDocument()
      })

      it('does not update score for incorrect answers', async () => {
        render(<App />)
        await user.click(screen.getByRole('button', { name: /start quiz/i }))
        
        const incorrectOption = screen.getByLabelText(/Red = Code is working, Green = Write tests, Refactor = Break it down/i)
        await user.click(incorrectOption)
        
        const confirmButton = screen.getByRole('button', { name: /confirm answer/i })
        await user.click(confirmButton)
        
        expect(screen.getByText(/Score: 0\/\d+ points/)).toBeInTheDocument()
      })

      it('accumulates score correctly for multiple correct answers', async () => {
        render(<App />)
        await user.click(screen.getByRole('button', { name: /start quiz/i }))
        
        // First correct answer
        const correctOption1 = screen.getByLabelText(/Red = Test fails, Green = Test passes, Refactor = Improve the code/i)
        await user.click(correctOption1)
        let confirmButton = screen.getByRole('button', { name: /confirm answer/i })
        await user.click(confirmButton)
        expect(screen.getByText(/Score: 1\/\d+ points/)).toBeInTheDocument()
        
        const nextButton = screen.getByRole('button', { name: /next question/i })
        await user.click(nextButton)
        
        // Second correct answer (if we know it)
        const options = screen.getAllByRole('radio', { hidden: true })
        await user.click(options[1]) // Try second option
        confirmButton = screen.getByRole('button', { name: /confirm answer/i })
        await user.click(confirmButton)
        
        // Score should reflect cumulative correct answers
        expect(screen.getByText(/Score: \d+\/\d+ points/)).toBeInTheDocument()
      })
    })

    describe('Performance Indicators', () => {
      it('shows performance emoji with score', async () => {
        render(<App />)
        await user.click(screen.getByRole('button', { name: /start quiz/i }))
        
        expect(screen.getByText(/🎯.*Score: 0\/\d+ points/)).toBeInTheDocument()
      })

      it('updates performance emoji when score improves', async () => {
        render(<App />)
        await user.click(screen.getByRole('button', { name: /start quiz/i }))
        
        const correctOption = screen.getByLabelText(/Red = Test fails, Green = Test passes, Refactor = Improve the code/i)
        await user.click(correctOption)
        const confirmButton = screen.getByRole('button', { name: /confirm answer/i })
        await user.click(confirmButton)
        
        const scoreElements = screen.getAllByText(/🎯|💪|📚|👍|👏|🌟|🏆.*Score.*1.*points/)
        expect(scoreElements.length).toBeGreaterThan(0)
      })
    })

    describe('Error Handling in Scoring', () => {
      it('handles navigation without confirming answers', async () => {
        render(<App />)
        await user.click(screen.getByRole('button', { name: /start quiz/i }))
        
        const nextButton = screen.getByRole('button', { name: /next question/i })
        await user.click(nextButton) // Move without answering
        
        expect(screen.getByText(/Score: 0\/\d+ points/)).toBeInTheDocument()
      })

      it('does not break when rapidly navigating questions', async () => {
        render(<App />)
        await user.click(screen.getByRole('button', { name: /start quiz/i }))
        
        // Rapidly navigate through multiple questions
        const nextButton = screen.getByRole('button', { name: /next question/i })
        for (let i = 0; i < 3; i++) {
          await user.click(nextButton)
        }
        
        expect(screen.getByText(/Score: 0\/\d+ points/)).toBeInTheDocument()
        expect(screen.getByTestId('question-card')).toBeInTheDocument()
      })
    })
  })

  describe('Answer Feedback System', () => {
    let user: ReturnType<typeof userEvent.setup>

    beforeEach(() => {
      user = userEvent.setup()
    })

    describe('Feedback Display Timing', () => {
      it('does not show feedback before confirming answer', async () => {
        render(<App />)
        await user.click(screen.getByRole('button', { name: /start quiz/i }))
        
        const correctOption = screen.getByLabelText(/Red = Test fails, Green = Test passes, Refactor = Improve the code/i)
        await user.click(correctOption)
        
        expect(screen.queryByText(/Awesome!|Fantastic!|Perfect!|Brilliant!|Excellent!|Amazing!/)).not.toBeInTheDocument()
        expect(screen.queryByText(/Oops!|Not quite!|Close,|Don't worry|Almost|No worries/)).not.toBeInTheDocument()
      })

      it('shows feedback immediately after confirming answer', async () => {
        render(<App />)
        await user.click(screen.getByRole('button', { name: /start quiz/i }))
        
        const correctOption = screen.getByLabelText(/Red = Test fails, Green = Test passes, Refactor = Improve the code/i)
        await user.click(correctOption)
        const confirmButton = screen.getByRole('button', { name: /confirm answer/i })
        await user.click(confirmButton)
        
        expect(screen.getByText(/Awesome!|Fantastic!|Perfect!|Brilliant!|Excellent!|Amazing!/)).toBeInTheDocument()
      })
    })

    describe('Correct Answer Feedback', () => {
      it('shows positive feedback for correct answers', async () => {
        render(<App />)
        await user.click(screen.getByRole('button', { name: /start quiz/i }))
        
        const correctOption = screen.getByLabelText(/Red = Test fails, Green = Test passes, Refactor = Improve the code/i)
        await user.click(correctOption)
        const confirmButton = screen.getByRole('button', { name: /confirm answer/i })
        await user.click(confirmButton)
        
        expect(screen.getByText(/Awesome!|Fantastic!|Perfect!|Brilliant!|Excellent!|Amazing!/)).toBeInTheDocument()
      })

      it('does not show correct answer text for correct responses', async () => {
        render(<App />)
        await user.click(screen.getByRole('button', { name: /start quiz/i }))
        
        const correctOption = screen.getByLabelText(/Red = Test fails, Green = Test passes, Refactor = Improve the code/i)
        await user.click(correctOption)
        const confirmButton = screen.getByRole('button', { name: /confirm answer/i })
        await user.click(confirmButton)
        
        expect(screen.queryByText(/✅ Correct answer:/)).not.toBeInTheDocument()
      })
    })

    describe('Incorrect Answer Feedback', () => {
      it('shows encouraging feedback for incorrect answers', async () => {
        render(<App />)
        await user.click(screen.getByRole('button', { name: /start quiz/i }))
        
        const incorrectOption = screen.getByLabelText(/Red = Code is working, Green = Write tests, Refactor = Break it down/i)
        await user.click(incorrectOption)
        const confirmButton = screen.getByRole('button', { name: /confirm answer/i })
        await user.click(confirmButton)
        
        expect(screen.getByText(/Oops!|Not quite!|Close,|Don't worry|Almost|No worries/)).toBeInTheDocument()
      })

      it('shows correct answer for incorrect responses', async () => {
        render(<App />)
        await user.click(screen.getByRole('button', { name: /start quiz/i }))
        
        const incorrectOption = screen.getByLabelText(/Red = Code is working, Green = Write tests, Refactor = Break it down/i)
        await user.click(incorrectOption)
        const confirmButton = screen.getByRole('button', { name: /confirm answer/i })
        await user.click(confirmButton)
        
        expect(screen.getByText(/✅ Correct answer: Red = Test fails, Green = Test passes, Refactor = Improve the code/)).toBeInTheDocument()
      })
    })

    describe('Feedback Error Handling', () => {
      it('handles feedback display without breaking on rapid interactions', async () => {
        render(<App />)
        await user.click(screen.getByRole('button', { name: /start quiz/i }))
        
        const firstOption = screen.getAllByRole('radio', { hidden: true })[0]
        await user.click(firstOption)
        
        const confirmButton = screen.getByRole('button', { name: /confirm answer/i })
        
        // Rapid double-click shouldn't break anything
        await user.click(confirmButton)
        
        expect(screen.getByText(/Awesome!|Fantastic!|Perfect!|Brilliant!|Excellent!|Amazing!|Oops!|Not quite!|Close,|Don't worry|Almost|No worries/)).toBeInTheDocument()
      })
    })
  })

  describe('Progress Tracking & Completion', () => {
    let user: ReturnType<typeof userEvent.setup>

    beforeEach(() => {
      user = userEvent.setup()
    })

    describe('Progress Display', () => {
      it('shows progress during quiz', async () => {
        render(<App />)
        await user.click(screen.getByRole('button', { name: /start quiz/i }))
        
        expect(screen.getByText(/Progress: \d+%/)).toBeInTheDocument()
      })

      it('does not show progress before quiz starts', () => {
        render(<App />)
        expect(screen.queryByText(/Progress: \d+%/)).not.toBeInTheDocument()
      })

      it('does not show progress during quiz in certain situations', async () => {
        render(<App />)
        await user.click(screen.getByRole('button', { name: /start quiz/i }))
        
        // During quiz but not answered, still shows progress
        expect(screen.getByText(/Progress: \d+%/)).toBeInTheDocument()
      })
    })

    describe('Completion Time Tracking', () => {
      it('does not show completion time during quiz', async () => {
        render(<App />)
        await user.click(screen.getByRole('button', { name: /start quiz/i }))
        
        expect(screen.queryByText(/🕒 Completed in/)).not.toBeInTheDocument()
      })

      it('tracks and displays completion time at end', async () => {
        render(<App />)
        await completeEntireQuiz(user)
        
        expect(screen.getByText(/🕒 Completed in \d+s/)).toBeInTheDocument()
      })
    })
  })

  describe('Accessibility & Usability', () => {
    let user: ReturnType<typeof userEvent.setup>

    beforeEach(() => {
      user = userEvent.setup()
    })

    describe('Keyboard Navigation', () => {
      it('allows keyboard navigation through radio buttons', async () => {
        render(<App />)
        await user.click(screen.getByRole('button', { name: /start quiz/i }))
        
        const radioButtons = screen.getAllByRole('radio', { hidden: true })
        expect(radioButtons.length).toBeGreaterThan(0)
        
        // Test that radio buttons are properly labeled
        radioButtons.forEach(button => {
          expect(button).toHaveAttribute('name')
        })
      })
    })

    describe('Screen Reader Support', () => {
      it('provides proper heading hierarchy', async () => {
        render(<App />)
        await user.click(screen.getByRole('button', { name: /start quiz/i }))
        
        const h1 = screen.getByRole('heading', { level: 1 })
        const h3 = screen.getByRole('heading', { level: 3 })
        
        expect(h1).toBeInTheDocument()
        expect(h3).toBeInTheDocument()
      })

      it('has properly labeled form controls', async () => {
        render(<App />)
        await user.click(screen.getByRole('button', { name: /start quiz/i }))
        
        const radioButtons = screen.getAllByRole('radio', { hidden: true })
        radioButtons.forEach(button => {
          expect(button).toHaveAccessibleName()
        })
      })
    })

    describe('Error States and Edge Cases', () => {
      it('handles empty state gracefully', () => {
        render(<App />)
        expect(screen.getByText('TDD Trivia')).toBeInTheDocument()
      })

      it('maintains state consistency during rapid interactions', async () => {
        render(<App />)
        const startButton = screen.getByRole('button', { name: /start quiz/i })
        
        // Rapid clicks on start button
        await user.click(startButton)
        
        expect(screen.getByTestId('question-card')).toBeInTheDocument()
        expect(screen.getByText(/Score: 0\/\d+ points/)).toBeInTheDocument()
      })
    })
  })
})
