import type { User } from '@/types'

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')

  if (!response.ok) {
    throw new Error(`Error fetching users: ${response.status} ${response.statusText}`)
  }

  const users = await response.json()
  return users
}

export async function fetchUserById(id: string): Promise<User> {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users?id=${id}`)

  if (!response.ok) {
    throw new Error(`Error fetching user: ${response.status} ${response.statusText}`)
  }

  const user = await response.json()
  return user
}
