import type { User } from '../types'

export async function getUsers(): Promise<User[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')

  if (!response.ok) {
    throw new Error(`Error fetching users: ${response.status} ${response.statusText}`)
  }

  const users = await response.json()
  return users
}
