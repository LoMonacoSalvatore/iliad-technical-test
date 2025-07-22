import { setActivePinia, createPinia } from 'pinia'
import { useUsersStore } from '@/stores/users'
import { fetchUserById, fetchUsers } from '@/api/users'
import type { User } from '@/types'
import { vi, describe, beforeEach, it, expect } from 'vitest'
import * as api from '@/api/users'

// Mock API module
vi.mock('@/api/users', () => ({
  fetchUsers: vi.fn<() => Promise<User[]>>(),
  fetchUserById: vi.fn<(id: string) => Promise<User>>(),
}))

const mockedApi = vi.mocked(api)

describe('useUsersStore', () => {
  let store: ReturnType<typeof useUsersStore>

  const mockUsers: User[] = [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
      address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipcode: '92998-3874',
        geo: {
          lat: '-37.3159',
          lng: '81.1496',
        },
      },
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
      company: {
        name: 'Romaguera-Crona',
        catchPhrase: 'Multi-layered client-server neural-net',
        bs: 'harness real-time e-markets',
      },
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv',
      address: {
        street: 'Victor Plains',
        suite: 'Suite 879',
        city: 'Wisokyburgh',
        zipcode: '90566-7771',
        geo: {
          lat: '-43.9509',
          lng: '-34.4618',
        },
      },
      phone: '010-692-6593 x09125',
      website: 'anastasia.net',
      company: {
        name: 'Deckow-Crist',
        catchPhrase: 'Proactive didactic contingency',
        bs: 'synergize scalable supply-chains',
      },
    },
  ]

  const mockUser: User = mockUsers[1]

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useUsersStore()

    // Reset mocks before each test
    vi.clearAllMocks()
  })

  it('loads all users correctly', async () => {
    mockedApi.fetchUsers.mockResolvedValue(mockUsers)

    await store.loadUsers()

    expect(fetchUsers).toHaveBeenCalled()
    expect(store.users).toEqual(mockUsers)
    expect(store.error).toBeNull()
    expect(store.isLoading).toBe(false)
  })

  it('sets error if fetchUsers fails', async () => {
    const error = new Error('Failed to fetch users')
    mockedApi.fetchUsers.mockRejectedValue(error)

    await store.loadUsers()

    expect(store.users).toEqual([])
    expect(store.error).toBe(error)
    expect(store.isLoading).toBe(false)
  })

  it('loads a single user by ID', async () => {
    mockedApi.fetchUserById.mockResolvedValue(mockUser)

    await store.loadUser('2')

    expect(fetchUserById).toHaveBeenCalledWith('2')
    expect(store.user).toEqual(mockUser)
    expect(store.error).toBeNull()
    expect(store.isLoading).toBe(false)
  })

  it('sets error if fetchUserById fails', async () => {
    const error = new Error('User not found')
    mockedApi.fetchUserById.mockRejectedValue(error)

    await store.loadUser('99')

    expect(store.user).toBeUndefined()
    expect(store.error).toBe(error)
    expect(store.isLoading).toBe(false)
  })

  it('initUsers loads user if users list is empty', async () => {
    mockedApi.fetchUserById.mockResolvedValue(mockUser)

    await store.initUsers('2')

    expect(fetchUserById).toHaveBeenCalledWith('2')
    expect(store.user).toEqual(mockUser)
  })

  it('initUsers finds user in existing users list', async () => {
    store.users = [...mockUsers]

    await store.initUsers('2')

    expect(fetchUserById).not.toHaveBeenCalled()
    expect(store.user).toEqual(mockUser)
  })
})
