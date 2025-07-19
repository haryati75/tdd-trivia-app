import { render, screen } from '@testing-library/react'

import Card from './Card'

describe('Card', () => {
  it('renders children content correctly', () => {
    render(
      <Card>
        <p>Card content</p>
      </Card>
    )
    const content = screen.getByText('Card content')
    expect(content).toBeInTheDocument()
  })

  it('renders as div with card className', () => {
    render(<Card data-testid="card">Content</Card>)
    const cardElement = screen.getByTestId('card')
    expect(cardElement).toHaveClass('card')
    expect(cardElement?.tagName).toBe('DIV')
  })

  it('applies custom className along with card class', () => {
    render(<Card className="custom-class" data-testid="card">Content</Card>)
    const cardElement = screen.getByTestId('card')
    expect(cardElement).toHaveClass('card', 'custom-class')
  })

  it('applies data-testid when provided', () => {
    render(<Card data-testid="test-card">Content</Card>)
    const cardElement = screen.getByTestId('test-card')
    expect(cardElement).toBeInTheDocument()
    expect(cardElement).toHaveClass('card')
  })

  it('renders without data-testid when not provided', () => {
    render(<Card>Content</Card>)
    const cardElement = screen.getByText('Content').parentElement
    expect(cardElement).not.toHaveAttribute('data-testid')
  })

  it('renders children with HTML elements', () => {
    render(
      <Card>
        <span>Nested element</span>
        <div>Another element</div>
      </Card>
    )
    const spanElement = screen.getByText('Nested element')
    const divElement = screen.getByText('Another element')
    expect(spanElement).toBeInTheDocument()
    expect(divElement).toBeInTheDocument()
  })
})
