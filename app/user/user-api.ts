'use server'
import { cookies } from 'next/headers'

interface LoginResponse {
  accessToken: string
}

// TODO: move loginUser cookie handling to layout so it is server
export async function loginUser(credentials: {
  email: string
  password: string
}): Promise<LoginResponse> {
  // TODO: updte server types
  //   const formatted: components['schemas']['Hunt']
  const response = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })

  if (!response.ok) {
    throw new Error('Login failed')
  }

  const data = await response.json()

  const cookieStore = await cookies()
  cookieStore.set('accessToken', data.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/',
  })
  console.log('cookieStore.getAll()', cookieStore.getAll())

  return data
}
