import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchUserById, fetchUsers } from '@/api/users'
import type { User } from '@/types'

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([])
  const user = ref<User>()
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  const loadUsers = async () => {
    isLoading.value = true
    error.value = null
    try {
      users.value = await fetchUsers()
    } catch (err: any) {
      error.value = err
    } finally {
      isLoading.value = false
    }
  }

  const loadUser = async (id: string) => {
    isLoading.value = true
    error.value = null
    try {
      user.value = await fetchUserById(id)
    } catch (err: any) {
      error.value = err
    } finally {
      isLoading.value = false
    }
  }

  const initUsers = (paramId: string) => {
    if (!users.value.length) {
      loadUser(paramId)
    } else {
      user.value = users.value.find((user) => user.id === Number(paramId))
    }
  }

  return {
    users,
    user,
    isLoading,
    error,
    loadUsers,
    loadUser,
    initUsers,
  }
})
