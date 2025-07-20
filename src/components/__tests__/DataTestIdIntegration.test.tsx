import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../../App'

describe('Data-TestId Integration Test', () => {
  it('verifies all new data-testids are working', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    // Test initial state testids
    expect(screen.getByTestId('score-card')).toBeInTheDocument()
    expect(screen.getByTestId('start-quiz-button')).toBeInTheDocument()
    
    // Start quiz and test question testids
    await user.click(screen.getByTestId('start-quiz-button'))
    
    expect(screen.getByTestId('question-card')).toBeInTheDocument()
    expect(screen.getByTestId('question-category-difficulty')).toBeInTheDocument()
    expect(screen.getByTestId('question-text')).toBeInTheDocument()
    expect(screen.getByTestId('score-display')).toBeInTheDocument()
    expect(screen.getByTestId('instruction-text')).toBeInTheDocument()
    expect(screen.getByTestId('next-question-button')).toBeInTheDocument()
    
    // Select answer and test confirm button testid
    const firstOption = screen.getAllByRole('radio', { hidden: true })[0]
    await user.click(firstOption)
    
    expect(screen.getByTestId('confirm-answer-button')).toBeInTheDocument()
    
    // Confirm answer and test feedback testids
    await user.click(screen.getByTestId('confirm-answer-button'))
    
    expect(screen.getByTestId('answer-feedback')).toBeInTheDocument()
    
    console.log('✅ All data-testids are working correctly!')
  })
})
