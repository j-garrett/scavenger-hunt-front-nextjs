import Link from 'next/link'

export default function UserHome() {
  return (
    <div>
      <h1>User Page</h1>
      <Link href="/user/login">Login</Link>
    </div>
  )
}
