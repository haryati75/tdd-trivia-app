import { render, screen } from '@testing-library/react'

import Button from './Button'

describe('Button renders', () => {
  it('with initial text', () => {
    render(<Button text="any text" />)
    const button = screen.getByRole('button', { name: /any text/i })
    expect(button).toBeInTheDocument()
  })
})