import { render, screen, fireEvent } from '@testing-library/react'

import Button from './Button'

describe('Button', () => {
  it('renders with children containing HTML tag', () => {
    render(
      <Button>
        <span>child text</span>
      </Button>
    )
    const button = screen.getByRole('button')
    expect(button).toContainHTML('<span>child text</span>')
  })

  it('calls onClick handler when clicked', () => {
    const mockOnClick = vi.fn()
    render(<Button onClick={mockOnClick}>Click me</Button>)
    
    const button = screen.getByRole('button', { name: /click me/i })
    fireEvent.click(button)
    
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('renders without onClick handler', () => {
    render(<Button>No handler</Button>)
    const button = screen.getByRole('button', { name: /no handler/i })
    
    // Should not throw error when clicked without handler
    fireEvent.click(button)
    expect(button).toBeInTheDocument()
  })
})