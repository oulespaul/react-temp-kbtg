import { forwardRef } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  readonly label: string
  readonly error?: string
  readonly required?: boolean
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, required, className, id, ...props }, ref) => {
    const fieldId = id || label.toLowerCase().replace(/\s+/g, '-')
    
    return (
      <div className={cn('space-y-2', className)}>
        <Label htmlFor={fieldId} required={required}>
          {label}
        </Label>
        <Input
          id={fieldId}
          ref={ref}
          error={!!error}
          {...props}
        />
        {error && (
          <p className="text-sm text-error">{error}</p>
        )}
      </div>
    )
  }
)
FormField.displayName = 'FormField'

export { FormField }
