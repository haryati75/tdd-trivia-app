import { useState, useEffect } from 'react'
import Card from './Card'

interface RadioButtonGroupProps {
  options: string[]
  onSelectionChange: (value: string, index: number) => void
  name?: string
  disabled?: boolean
}

function RadioButtonGroup({ options, onSelectionChange, name, disabled = false }: RadioButtonGroupProps) {
  const [selectedValue, setSelectedValue] = useState<string>('')
  const groupName = name || `radio-group-${Math.random().toString(36).substr(2, 9)}`

  // Reset selection when name changes (indicates new question)
  useEffect(() => {
    setSelectedValue('')
  }, [name])

  const handleChange = (value: string, index: number) => {
    if (disabled) return
    setSelectedValue(value)
    onSelectionChange(value, index)
  }

  return (
    <div>
      {options.map((option, index) => (
        <Card 
          key={index} 
          className={`radio-option-card ${selectedValue === option ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
        >
          <label style={{ display: 'block', margin: 0, cursor: disabled ? 'default' : 'pointer' }}>
            <input
              type="radio"
              name={groupName}
              value={option}
              checked={selectedValue === option}
              onChange={() => handleChange(option, index)}
              disabled={disabled}
              hidden
              style={{ marginRight: '8px' }}
            />
            {option}
          </label>
        </Card>
      ))}
    </div>
  )
}

export default RadioButtonGroup
