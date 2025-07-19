import { render, screen } from '@testing-library/react'

import Text from './Text'

describe('Text', () => {
  it('renders as paragraph by default', () => {
    render(<Text>Default text content</Text>)
    const textElement = screen.getByText('Default text content')
    expect(textElement.tagName).toBe('P')
  })

  it('renders as heading when variant is heading', () => {
    render(<Text variant="heading">Heading text</Text>)
    const headingElement = screen.getByText('Heading text')
    expect(headingElement.tagName).toBe('H2')
  })

  it('renders as paragraph when variant is paragraph', () => {
    render(<Text variant="paragraph">Paragraph text</Text>)
    const paragraphElement = screen.getByText('Paragraph text')
    expect(paragraphElement.tagName).toBe('P')
  })

  it('renders children content correctly', () => {
    render(<Text>Some test content</Text>)
    const textElement = screen.getByText('Some test content')
    expect(textElement).toBeInTheDocument()
  })

  it('renders children with HTML elements', () => {
    render(
      <Text>
        Text with <span>nested element</span>
      </Text>
    )
    const textElement = screen.getByText(/text with/i)
    expect(textElement).toContainHTML('<span>nested element</span>')
  })

  it('applies custom className when provided', () => {
    render(<Text className="custom-class">Styled text</Text>)
    const textElement = screen.getByText('Styled text')
    expect(textElement).toHaveClass('custom-class')
  })

  it('supports h1 heading level', () => {
    render(<Text variant="heading" level={1}>Main heading</Text>)
    const headingElement = screen.getByText('Main heading')
    expect(headingElement.tagName).toBe('H1')
  })

  it('supports h3 heading level', () => {
    render(<Text variant="heading" level={3}>Sub heading</Text>)
    const headingElement = screen.getByText('Sub heading')
    expect(headingElement.tagName).toBe('H3')
  })

  it('defaults to h2 when variant is heading but no level specified', () => {
    render(<Text variant="heading">Default heading level</Text>)
    const headingElement = screen.getByText('Default heading level')
    expect(headingElement.tagName).toBe('H2')
  })

  it('ignores level prop when variant is paragraph', () => {
    render(<Text variant="paragraph" level={1}>Still a paragraph</Text>)
    const textElement = screen.getByText('Still a paragraph')
    expect(textElement.tagName).toBe('P')
  })
})
