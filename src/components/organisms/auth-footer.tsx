import { TextLink } from '@/components/atoms/text-link'

export function AuthFooter() {
  return (
    <div className="mt-6 pt-6 border-t border-neutral-200">
      <p className="text-center text-sm text-neutral-500">
        Don't have an account?{' '}
        <TextLink 
          to="/register" 
          size="sm"
          className="font-medium"
        >
          Sign up
        </TextLink>
      </p>
    </div>
  )
}
