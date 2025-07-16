import { useState } from 'react'
import { AuthLayout } from '@/components/templates/auth-layout'
import { AuthCard } from '@/components/molecules/auth-card'
import { LoginForm } from '@/components/organisms/login-form'
import { AuthFooter } from '@/components/organisms/auth-footer'

interface LoginFormData {
  email: string
  password: string
}

export function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true)
    
    // Simulate login API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsLoading(false)
    // Handle login logic here
    console.log('Login data:', data)
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
