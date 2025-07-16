import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/date-picker'
import { Label } from '@/components/ui/label'
import { FormField } from '@/components/forms/form-field'
import { TextLink } from '@/components/navigation/text-link'

interface LoginFormData {
  email: string
  password: string
  birthday: Date | null
}

interface LoginFormProps {
  readonly onSubmit: (data: LoginFormData) => Promise<void>
  readonly isLoading?: boolean
}

export function LoginForm({ onSubmit, isLoading = false }: LoginFormProps) {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    birthday: null,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
  }

  const handleChange = (field: keyof LoginFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value,
    }))
  }

  const handleBirthdayChange = (date: Date | null) => {
    setFormData(prev => ({
      ...prev,
      birthday: date,
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <FormField
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange('email')}
          placeholder="Enter your email"
          required
        />
        
        <FormField
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange('password')}
          placeholder="Enter your password"
          required
        />

        <div className="space-y-2 flex flex-col">
          <Label htmlFor="birthday">
            Birthday
          </Label>
          <DatePicker
            value={formData.birthday}
            onChange={handleBirthdayChange}
            placeholder="Select your birthday"
            className="w-full"
          />
        </div>
      </div>

      <div className="space-y-4">
        <Button 
          type="submit" 
          className="w-full h-11 bg-web-green-500 hover:bg-web-green-600 text-white font-medium"
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Button>
        
        <div className="text-center">
          <TextLink 
            to="/forgot-password" 
            size="sm"
          >
            Forgot your password?
          </TextLink>
        </div>
      </div>
    </form>
  )
}
