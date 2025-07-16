import { useState } from 'react'
import { AuthLayout, AuthCard, LoginForm, AuthFooter } from '@/features/auth/components'

interface LoginFormData {
  email: string
  password: string
  birthday: Date | null
}

export function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true)
    
    // Simulate login API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsLoading(false)
    // Handle login logic here
    console.log('Login data:', {
      email: data.email,
      password: data.password,
      birthday: data.birthday ? data.birthday.toLocaleDateString() : 'Not selected'
    })
  }

  return (
    <AuthLayout>
      <AuthCard 
        title="Welcome back" 
        description="Sign in to your account"
      >
        <LoginForm 
          onSubmit={handleLogin}
          isLoading={isLoading}
        />
        <AuthFooter />
      </AuthCard>
    </AuthLayout>
  )
}
