<script setup lang="ts">
import { computed, ref } from 'vue'
import type { User } from '../types'
import { storeToRefs } from 'pinia'
import { useUsersStore } from '@/stores/users'

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
      <div v-if="error">❌ {{ error.message }}</div>
      <div v-else>
        <div v-for="user in filteredUsers" :key="user.id">
          <RouterLink :to="{ name: 'user', params: { id: user.id } }">{{ user.name }}</RouterLink>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
