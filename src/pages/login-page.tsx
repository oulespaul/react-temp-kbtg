import { useState } from 'react'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate login API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsLoading(false)
    // Handle login logic here
  }

  const handleChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white border-neutral-200">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl text-neutral-900">Welcome back</CardTitle>
          <CardDescription className="text-neutral-500">
            Sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-neutral-900">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange('email')}
                  className="flex h-11 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-web-green-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-neutral-900">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange('password')}
                  className="flex h-11 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-web-green-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter your password"
                  required
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
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-web-green-500 hover:text-web-green-600 underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>
          </form>
          
          <div className="mt-6 pt-6 border-t border-neutral-200">
            <p className="text-center text-sm text-neutral-500">
              Don't have an account?{' '}
              <Link 
                to="/register" 
                className="text-web-green-500 hover:text-web-green-600 font-medium underline-offset-4 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
