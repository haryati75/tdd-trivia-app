import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('Footer', () => {
  it('renders developer name', () => {
    render(<Footer />)
    expect(screen.getByText(/Haryati Hassan/)).toBeInTheDocument()
  })

  it('renders copyright with current year', () => {
    render(<Footer />)
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`© ${currentYear}`))).toBeInTheDocument()
  })

  it('renders GitHub link with correct href', () => {
    render(<Footer />)
    const githubLink = screen.getByRole('link', { name: /view on github/i })
    expect(githubLink).toBeInTheDocument()
    expect(githubLink).toHaveAttribute('href', 'https://github.com/haryati75/tdd-trivia-app')
    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('applies custom className when provided', () => {
    const { container } = render(<Footer className="custom-footer" />)
    const footer = container.querySelector('footer')
    expect(footer).toHaveClass('footer', 'custom-footer')
  })

  it('applies default className when no custom className provided', () => {
    const { container } = render(<Footer />)
    const footer = container.querySelector('footer')
    expect(footer).toHaveClass('footer')
    expect(footer).not.toHaveClass('custom-footer')
  })
})
