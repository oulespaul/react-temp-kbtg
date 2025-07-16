import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Zap, Shield, Palette } from 'lucide-react'

export function HomePage() {
  const features = [
    {
      icon: Users,
      title: 'User Management',
      description: 'Complete CRUD operations for user management with real-time updates.',
      href: '/users',
    },
    {
      icon: Zap,
      title: 'Fast & Modern',
      description: 'Built with Vite, React 18, and TypeScript for optimal performance.',
    },
    {
      icon: Shield,
      title: 'Type Safe',
      description: 'Fully typed with TypeScript and strict ESLint configuration.',
    },
    {
      icon: Palette,
      title: 'Dark Mode',
      description: 'Beautiful UI with TailwindCSS and shadcn/ui components.',
    },
  ]

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Welcome to React Workshop
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A modern React application built with Vite, TypeScript, TailwindCSS, and shadcn/ui.
          Featuring user management, dark mode, and extensible architecture.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link to="/users">
              <Users className="h-4 w-4 mr-2" />
              View Users
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a 
              href="https://github.com/your-username/react-workshop" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon
          const content = (
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardHeader>
                <Icon className="h-8 w-8 text-primary" />
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          )

          return feature.href ? (
            <Link key={feature.title} to={feature.href}>
              {content}
            </Link>
          ) : (
            <div key={feature.title}>{content}</div>
          )
        })}
      </div>

      {/* Tech Stack */}
      <Card>
        <CardHeader>
          <CardTitle>Tech Stack</CardTitle>
          <CardDescription>
            This application is built with modern technologies and best practices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <h4 className="font-semibold mb-2">Frontend</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• React 18 with TypeScript</li>
                <li>• Vite for build tooling</li>
                <li>• React Router for routing</li>
                <li>• TailwindCSS for styling</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">UI Components</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• shadcn/ui components</li>
                <li>• Radix UI primitives</li>
                <li>• Lucide React icons</li>
                <li>• Sonner for toasts</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">State & Tools</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Zustand for state management</li>
                <li>• ESLint + Prettier</li>
                <li>• Vitest for testing</li>
                <li>• TypeScript strict mode</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
