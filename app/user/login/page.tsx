'use client'
import { useState } from 'react'
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from '@tanstack/react-query'
import { loginUser } from '@/app/user/user-api'
import { components } from '@jon-garrett/scavenger-hunt-server'

const queryClient = new QueryClient()

interface LoginCredentials {
  email: string
  password: string
}

interface LoginResponse {
  accessToken: string
}

const exampleHunt: components['schemas']['Hunt'] = {
  id: 1,
  name: 'Example Hunt',
  description: 'This is an example hunt',
}

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const mutation = useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: loginUser,
    onSuccess: async (data: LoginResponse) => {
      // Handle successful login, e.g., store token, redirect, etc.
      console.log('Login successful:', data)
    },
    onError: (error: Error) => {
      // Handle login error
      console.error('Login failed:', error)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate({ email, password })
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={mutation.status === 'pending'}
              >
                {mutation.status === 'pending' ? 'Signing In...' : 'Sign In'}
              </button>
            </div>
            {mutation.isError && (
              <p className="text-red-500 text-xs italic mt-4">
                Login failed. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </QueryClientProvider>
  )
}
