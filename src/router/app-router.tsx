import { createBrowserRouter, RouterProvider } from 'react-router'
import { DefaultLayout } from '@/components/layout/default-layout'
import { HomePage } from '@/pages/home-page'
import { LoginPage } from '@/features/auth/pages/login-page'
import { UserListPage } from '@/features/users/pages/user-list-page'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'users',
        element: <UserListPage />,
      },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
