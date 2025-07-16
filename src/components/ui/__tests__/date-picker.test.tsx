import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { DatePicker } from '../date-picker'

describe('DatePicker', () => {
  it('renders with placeholder text', () => {
    render(<DatePicker placeholder="Select a date" />)
    expect(screen.getByPlaceholderText('Select a date')).toBeInTheDocument()
  })

  it('shows calendar when input is clicked', () => {
    render(<DatePicker />)
    const input = screen.getByRole('textbox')
    fireEvent.click(input)
    
    // Calendar should be visible
    expect(screen.getByText('Su')).toBeInTheDocument()
    expect(screen.getByText('Mo')).toBeInTheDocument()
    expect(screen.getByText('Tu')).toBeInTheDocument()
  })

  it('calls onChange when date is selected', () => {
    const handleChange = vi.fn()
    render(<DatePicker onChange={handleChange} />)
    
    const input = screen.getByRole('textbox')
    fireEvent.click(input)
    
    // Click on a date (find a button with text "15" for example)
    const dateButton = screen.getByRole('button', { name: '15' })
    fireEvent.click(dateButton)
    
    expect(handleChange).toHaveBeenCalledWith(expect.any(Date))
  })

  it('displays formatted date when value is provided', () => {
    const testDate = new Date(2024, 0, 15) // January 15, 2024
    render(<DatePicker value={testDate} />)
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveValue(testDate.toLocaleDateString())
  })

  it('is disabled when disabled prop is true', () => {
    render(<DatePicker disabled />)
    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
  })
})
