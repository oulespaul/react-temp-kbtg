import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { FormField } from '@/components/molecules/form-field'
import { TextLink } from '@/components/atoms/text-link'

interface LoginFormData {
  email: string
  password: string
}

interface LoginFormProps {
  readonly onSubmit: (data: LoginFormData) => Promise<void>
  readonly isLoading?: boolean
}

export function LoginForm({ onSubmit, isLoading = false }: LoginFormProps) {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
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
