import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface AuthCardProps {
  readonly title: string
  readonly description: string
  readonly children: React.ReactNode
}

export function AuthCard({ title, description, children }: AuthCardProps) {
  return (
    <Card className="w-full max-w-md bg-white border-neutral-200">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-2xl text-neutral-900">{title}</CardTitle>
        <CardDescription className="text-neutral-500">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}
