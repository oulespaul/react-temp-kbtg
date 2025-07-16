import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import type { User } from '../types/user.types'

interface UserFormProps {
  readonly defaultValues?: Partial<User>
  readonly onSubmit: (data: { name: string; email: string; avatar?: string }) => Promise<void>
}

export function UserForm({ defaultValues, onSubmit }: UserFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: defaultValues?.name || '',
    email: defaultValues?.email || '',
    avatar: defaultValues?.avatar || '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim() || !formData.email.trim()) {
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit({
        name: formData.name.trim(),
        email: formData.email.trim(),
        avatar: formData.avatar.trim() || undefined,
      })
    } finally {
      setIsSubmitting(false)
    }
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-neutral-900">
          Name *
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={handleChange('name')}
          className="flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-web-green-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Enter full name"
          required
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-neutral-900">
          Email *
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange('email')}
          className="flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-web-green-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Enter email address"
          required
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="avatar" className="text-sm font-medium text-neutral-900">
          Avatar URL
        </label>
        <input
          id="avatar"
          type="url"
          value={formData.avatar}
          onChange={handleChange('avatar')}
          className="flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-web-green-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="https://example.com/avatar.jpg (optional)"
        />
      </div>

      <DialogFooter>
        <Button 
          type="submit" 
          disabled={isSubmitting || !formData.name.trim() || !formData.email.trim()}
          className="bg-web-green-500 hover:bg-web-green-600 text-white disabled:bg-neutral-300"
        >
          {isSubmitting ? 'Saving...' : defaultValues ? 'Update User' : 'Create User'}
        </Button>
      </DialogFooter>
    </form>
  )
}
