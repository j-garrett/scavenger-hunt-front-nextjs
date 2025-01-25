// import { useQuery } from '@tanstack/react-query'
import { cookies } from 'next/headers'
interface User {
  id: string
  name: string
  email: string
}

// async function fetchUser(userId: string): Promise<User> {
//   const response = await fetch(`http://localhost:3000/api/users/${userId}`)
//   if (!response.ok) {
//     throw new Error('Failed to fetch user')
//   }
//   return response.json()
// }

export default async function UserPage({
  params,
}: {
  params: Promise<{ userId: string }>
}) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')

  const userId = (await params).userId
  const response = await fetch(`http://localhost:3000/users/${userId}`, {
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
    },
  })
  const data: User = await response.json()
  // const { data, error, isLoading } = useQuery<User, Error>(
  //   ['user', userId],
  //   () => fetchUser(userId as string),
  //   {
  //     enabled: !!userId,
  //   },
  // )

  // if (isLoading) {
  //   return <div>Loading...</div>
  // }

  // if (error) {
  //   return <div>Error: {error.message}</div>
  // }
  console.log('data', data)

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">User Profile</h1>
        <p>
          <strong>ID:</strong> {data?.id}
        </p>
        <p>
          <strong>Name:</strong> {data?.name}
        </p>
        <p>
          <strong>Email:</strong> {data?.email}
        </p>
      </div>
    </div>
  )
}
