import type { ReactNode } from "react"
import { Outlet, Link, useLocation } from "react-router"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { Moon, Sun, Users } from "lucide-react"

interface DefaultLayoutProps {
  readonly children?: ReactNode
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  const { theme, setTheme } = useTheme()
  const location = useLocation()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  const navigation = [
    { name: "Home", href: "/", icon: null },
    { name: "Users", href: "/users", icon: Users },
  ]

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="border-b border-neutral-200 bg-white">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-xl font-bold text-neutral-900">
              React App
            </Link>
            <nav className="flex space-x-4">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === item.href
                        ? "bg-web-green-500 text-white"
                        : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50"
                    }`}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
          <div className="flex items-center space-x-3">
            <Button asChild variant="outline" size="sm" className="border-neutral-200 text-neutral-700 hover:bg-neutral-50">
              <Link to="/login">Sign in</Link>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9 border-neutral-200 text-neutral-700 hover:bg-neutral-50"
            >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {children || <Outlet />}
      </main>
    </div>
  )
}
