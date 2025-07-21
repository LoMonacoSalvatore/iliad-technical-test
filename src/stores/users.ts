import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchUserById, fetchUsers } from '@/api/users'
import type { User } from '@/types'
import { useRoute } from 'vue-router'

export const useUsersStore = defineStore('users', () => {
  const route = useRoute()

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

  const initUsers = () => {
    if (!users.value.length) {
      loadUser(route.params.id as string)
    } else {
      user.value = users.value.find((user) => user.id === Number(route.params.id))
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
