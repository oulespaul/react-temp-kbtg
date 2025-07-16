interface AuthLayoutProps {
  readonly children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      {children}
    </div>
  )
}
