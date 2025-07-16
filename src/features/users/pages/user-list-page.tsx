import { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useUsers } from '../hooks/useUsers'
import type { User } from '../types/user.types'
import { UserForm } from '../components/user-form'
import { toast } from 'sonner'

export function UserListPage() {
  const { users, isLoading, error, createUser, updateUser, deleteUser, clearError } = useUsers()
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const handleCreateUser = async (userData: { name: string; email: string; avatar?: string }) => {
    try {
      await createUser(userData)
      setIsCreateDialogOpen(false)
      toast.success('User created successfully!')
    } catch (error) {
      toast.error('Failed to create user')
    }
  }

  const handleUpdateUser = async (userData: { name: string; email: string; avatar?: string }) => {
    if (!selectedUser) return
    
    try {
      await updateUser(selectedUser.id, userData)
      setIsEditDialogOpen(false)
      setSelectedUser(null)
      toast.success('User updated successfully!')
    } catch (error) {
      toast.error('Failed to update user')
    }
  }

  const handleDeleteUser = async () => {
    if (!selectedUser) return
    
    try {
      await deleteUser(selectedUser.id)
      setIsDeleteDialogOpen(false)
      setSelectedUser(null)
      toast.success('User deleted successfully!')
    } catch (error) {
      toast.error('Failed to delete user')
    }
  }

  const openEditDialog = (user: User) => {
    setSelectedUser(user)
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (user: User) => {
    setSelectedUser(user)
    setIsDeleteDialogOpen(true)
  }

  if (error) {
    return (
      <Card className="max-w-md mx-auto bg-white border-error">
        <CardHeader>
          <CardTitle className="text-error">Error</CardTitle>
          <CardDescription>Failed to load users</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-neutral-500 mb-4">{error}</p>
          <Button onClick={clearError} className="bg-web-green-500 hover:bg-web-green-600 text-white">Try Again</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Users</h1>
          <p className="text-neutral-500">Manage your users</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-web-green-500 hover:bg-web-green-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
              <DialogDescription>
                Add a new user to your system.
              </DialogDescription>
            </DialogHeader>
            <UserForm onSubmit={handleCreateUser} />
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => `skeleton-${Date.now()}-${i}`).map((key) => (
            <Card key={key} className="animate-pulse bg-white border-neutral-200">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-neutral-200 h-10 w-10" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-neutral-200 rounded w-3/4" />
                    <div className="h-3 bg-neutral-200 rounded w-1/2" />
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <Card key={user.id} className="hover:shadow-md transition-shadow bg-white border-neutral-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="rounded-full h-10 w-10 object-cover"
                      />
                    ) : (
                      <div className="rounded-full bg-neutral-100 h-10 w-10 flex items-center justify-center">
                        <span className="text-sm font-medium text-neutral-700">
                          {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div>
                      <CardTitle className="text-lg text-neutral-900">{user.name}</CardTitle>
                      <CardDescription>{user.email}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditDialog(user)}
                      className="text-neutral-500 hover:text-web-green-500 hover:bg-web-green-50"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openDeleteDialog(user)}
                      className="text-neutral-500 hover:text-error hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.status === 'active' 
                      ? 'bg-web-green-100 text-web-green-800'
                      : 'bg-neutral-100 text-neutral-700'
                  }`}>
                    {user.status}
                  </span>
                  <span className="text-xs text-neutral-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <UserForm 
              defaultValues={selectedUser}
              onSubmit={handleUpdateUser} 
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedUser?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
              className="border-neutral-200 text-neutral-700 hover:bg-neutral-50"
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteUser}
              className="bg-error hover:bg-red-600 text-white"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
