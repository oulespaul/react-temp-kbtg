import { Link } from 'react-router'
import { cn } from '@/lib/utils'

export interface TextLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  readonly to: string
  readonly variant?: 'primary' | 'secondary'
  readonly size?: 'sm' | 'base'
}

export function TextLink({ 
  to, 
  className, 
  variant = 'primary', 
  size = 'base',
  children,
  ...props 
}: Readonly<TextLinkProps>) {
  return (
    <Link
      to={to}
      className={cn(
        'underline-offset-4 hover:underline transition-colors',
        {
          'text-web-green-500 hover:text-web-green-600': variant === 'primary',
          'text-neutral-500 hover:text-neutral-700': variant === 'secondary',
          'text-sm': size === 'sm',
          'text-base': size === 'base',
        },
        className
      )}
      {...props}
    >
      {children}
    </Link>
  )
}
