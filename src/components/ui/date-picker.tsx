import { useState, useMemo, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'

interface CalendarDay {
  date: Date
  otherMonth: boolean
}

interface DatePickerProps {
  readonly value?: Date | null
  readonly onChange?: (date: Date | null) => void
  readonly placeholder?: string
  readonly className?: string
  readonly disabled?: boolean
}

export function DatePicker({ 
  value, 
  onChange, 
  placeholder = "Select date", 
  className,
  disabled 
}: Readonly<DatePickerProps>) {
  const [showCalendar, setShowCalendar] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(() => {
    const today = new Date()
    return today.getMonth()
  })
  const [currentYear, setCurrentYear] = useState(() => {
    const today = new Date()
    return today.getFullYear()
  })
  
  const calendarRef = useRef<HTMLDivElement>(null)

  const formattedDate = useMemo(() => {
    return value ? value.toLocaleDateString() : ''
  }, [value])

  const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

  const daysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate()
  }

  const calendarDays = useMemo((): CalendarDay[] => {
    const days: CalendarDay[] = []
    const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay()
    
    // Previous month days
    const prevMonthDays = daysInMonth(currentYear, currentMonth - 1)
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(currentYear, currentMonth - 1, prevMonthDays - i),
        otherMonth: true,
      })
    }
    
    // Current month days
    const thisMonthDays = daysInMonth(currentYear, currentMonth)
    for (let i = 1; i <= thisMonthDays; i++) {
      days.push({
        date: new Date(currentYear, currentMonth, i),
        otherMonth: false,
      })
    }
    
    // Next month days (fill to 6 weeks grid)
    const nextDays = 42 - days.length
    for (let i = 1; i <= nextDays; i++) {
      days.push({
        date: new Date(currentYear, currentMonth + 1, i),
        otherMonth: true,
      })
    }
    
    return days
  }, [currentYear, currentMonth])

  const currentMonthName = useMemo(() => {
    return new Date(currentYear, currentMonth).toLocaleString('default', {
      month: 'long'
    })
  }, [currentYear, currentMonth])

  const toggleCalendar = () => {
    if (!disabled) {
      setShowCalendar(!showCalendar)
    }
  }

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const selectDate = (day: CalendarDay) => {
    if (day.otherMonth) return
    onChange?.(day.date)
    setShowCalendar(false)
  }

  const isSelected = (day: CalendarDay): boolean => {
    return value ? day.date.toDateString() === value.toDateString() : false
  }

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false)
      }
    }

    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showCalendar])

  return (
    <div className="relative inline-block" ref={calendarRef}>
      <Input
        type="text"
        readOnly
        value={formattedDate}
        onClick={toggleCalendar}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "w-40 cursor-pointer",
          disabled && "cursor-not-allowed",
          className
        )}
      />
      
      {showCalendar && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-neutral-200 rounded-lg shadow-lg z-50 p-4 min-w-[280px]">
          {/* Header */}
          <div className="flex justify-between items-center mb-2">
            <button
              onClick={prevMonth}
              className="p-1 hover:bg-neutral-100 rounded transition-colors"
              type="button"
            >
              &lt;
            </button>
            <span className="font-medium text-neutral-900">
              {currentMonthName} {currentYear}
            </span>
            <button
              onClick={nextMonth}
              className="p-1 hover:bg-neutral-100 rounded transition-colors"
              type="button"
            >
              &gt;
            </button>
          </div>
          
          {/* Weekdays */}
          <div className="grid grid-cols-7 text-center mb-1">
            {weekdays.map((day) => (
              <span key={day} className="font-semibold text-neutral-700 text-sm">
                {day}
              </span>
            ))}
          </div>
          
          {/* Days */}
          <div className="grid grid-cols-7 text-center">
            {calendarDays.map((day, index) => (
              <button
                key={`${day.date.getTime()}-${index}`}
                type="button"
                onClick={() => selectDate(day)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    selectDate(day)
                  }
                }}
                className={cn(
                  'p-2 rounded-full text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-web-green-500 focus:ring-offset-2',
                  {
                    'text-neutral-400': day.otherMonth,
                    'bg-web-green-500 text-white': isSelected(day),
                    'hover:bg-web-green-100': !day.otherMonth && !isSelected(day),
                  }
                )}
                disabled={day.otherMonth}
              >
                {day.date.getDate()}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
