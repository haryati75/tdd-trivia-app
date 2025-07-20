import Card from './Card'

interface RadioButtonGroupProps {
  options: string[]
  onSelectionChange: (value: string, index: number) => void
  name?: string
  disabled?: boolean
  selectedValue?: string // Add external control
}

function RadioButtonGroup({ 
  options, 
  onSelectionChange, 
  name, 
  disabled = false, 
  selectedValue 
}: RadioButtonGroupProps) {
  const groupName = name || `radio-group-${Math.random().toString(36).substr(2, 9)}`

  const handleChange = (value: string, index: number) => {
    if (disabled) return
    onSelectionChange(value, index)
  }

  return (
    <div>
      {options.map((option, index) => {
        // Use a more stable key that includes the option content
        const isSelected = selectedValue !== undefined && selectedValue === option
        const inputProps: React.InputHTMLAttributes<HTMLInputElement> = {
          type: "radio",
          name: groupName,
          value: option,
          onChange: () => handleChange(option, index),
          disabled: disabled,
          className: "visually-hidden-radio"
        }
        
        // Only control the checked state if selectedValue is provided
        if (selectedValue !== undefined) {
          inputProps.checked = isSelected
        }
        
        return (
          <Card 
            key={`${groupName}-${index}-${option}`}
            className={`radio-option-card ${isSelected ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
          >
            <label style={{ display: 'block', margin: 0, cursor: disabled ? 'default' : 'pointer' }}>
              <input {...inputProps} />
              {option}
            </label>
          </Card>
        )
      })}
    </div>
  )
}

export default RadioButtonGroup
