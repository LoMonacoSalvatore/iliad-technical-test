<script setup lang="ts">
import { computed, ref } from 'vue'
import type { User } from '../types'
import { storeToRefs } from 'pinia'
import { useUsersStore } from '@/stores/users'
import { useRouter } from 'vue-router'

const router = useRouter()

const store = useUsersStore()
const { users, isLoading, error } = storeToRefs(store)

if (!users.value.length) store.loadUsers()

const searchQuery = ref('')

const filteredUsers = computed(() => {
  if (!searchQuery.value.trim()) {
    return users.value
  }

  return users?.value?.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  ) as User[]
})
</script>

<template>
  <main>
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search by name..."
      class="w-full p-2 border rounded mb-4"
    />

    <div>
      <div v-if="isLoading">Loading…</div>
      <div v-if="error">{{ error.message }}</div>
      <div v-else class="grid gap-4 grid-cols-3 grid-rows-3">
        <div
          v-for="user in filteredUsers"
          :key="`user-${user.id}`"
          class="button"
          @click="router.push({ name: 'user', params: { id: user.id } })"
        >
          <span>{{ user.name }}</span>
        </div>
      </div>
    </div>
  </main>
</template>
