import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RadioButtonGroup from './RadioButtonGroup'

describe('RadioButtonGroup', () => {
  const mockOptions = ['Option 1', 'Option 2', 'Option 3']
  const mockCallback = vi.fn()

  beforeEach(() => {
    mockCallback.mockClear()
  })

  it('renders all radio buttons with correct labels', () => {
    render(<RadioButtonGroup options={mockOptions} onSelectionChange={mockCallback} />)
    
    mockOptions.forEach(option => {
      const radioButton = screen.getByLabelText(option)
      expect(radioButton).toBeInTheDocument()
      expect(radioButton).toHaveAttribute('type', 'radio')
    })
  })

  it('groups radio buttons under the same name attribute', () => {
    render(<RadioButtonGroup options={mockOptions} onSelectionChange={mockCallback} />)
    
    const radioButtons = screen.getAllByRole('radio', { hidden: true })
    const groupName = radioButtons[0].getAttribute('name')
    
    radioButtons.forEach(button => {
      expect(button).toHaveAttribute('name', groupName)
    })
  })

  it('calls callback function when a radio button is selected', async () => {
    const user = userEvent.setup()
    render(<RadioButtonGroup options={mockOptions} onSelectionChange={mockCallback} />)
    
    const firstRadio = screen.getByLabelText('Option 1')
    await user.click(firstRadio)
    
    expect(mockCallback).toHaveBeenCalledWith('Option 1', 0)
    expect(mockCallback).toHaveBeenCalledTimes(1)
  })

  it('calls callback with correct value and index when different options are selected', async () => {
    const user = userEvent.setup()
    render(<RadioButtonGroup options={mockOptions} onSelectionChange={mockCallback} />)
    
    const secondRadio = screen.getByLabelText('Option 2')
    await user.click(secondRadio)
    
    expect(mockCallback).toHaveBeenCalledWith('Option 2', 1)
    
    const thirdRadio = screen.getByLabelText('Option 3')
    await user.click(thirdRadio)
    
    expect(mockCallback).toHaveBeenCalledWith('Option 3', 2)
    expect(mockCallback).toHaveBeenCalledTimes(2)
  })

  it('allows only one radio button to be selected at a time', async () => {
    const user = userEvent.setup()
    render(<RadioButtonGroup options={mockOptions} onSelectionChange={mockCallback} />)
    
    const firstRadio = screen.getByLabelText('Option 1')
    const secondRadio = screen.getByLabelText('Option 2')
    
    await user.click(firstRadio)
    expect(firstRadio).toBeChecked()
    expect(secondRadio).not.toBeChecked()
    
    await user.click(secondRadio)
    expect(firstRadio).not.toBeChecked()
    expect(secondRadio).toBeChecked()
  })

  it('accepts optional name prop for grouping', () => {
    render(<RadioButtonGroup options={mockOptions} onSelectionChange={mockCallback} name="custom-group" />)
    
    const radioButtons = screen.getAllByRole('radio', { hidden: true })
    radioButtons.forEach(button => {
      expect(button).toHaveAttribute('name', 'custom-group')
    })
  })

  it('renders with empty options array', () => {
    render(<RadioButtonGroup options={[]} onSelectionChange={mockCallback} />)
    
    const radioButtons = screen.queryAllByRole('radio', { hidden: true })
    expect(radioButtons).toHaveLength(0)
  })
})
