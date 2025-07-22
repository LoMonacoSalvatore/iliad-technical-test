<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useUsersStore } from '@/stores/users'
import UserCard from '@/components/UserCard.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const paramId = computed(() => route.params.id)

const store = useUsersStore()

store.initUsers(paramId.value as string)

const { user } = storeToRefs(store)
</script>

<template>
  <div>User's infos</div>

  <div v-if="!user">No Users present</div>

  <div v-else>
    <UserCard :user="user" />
    <RouterLink :to="{ name: 'posts', params: { id: user.id } }"
      >View {{ user.username }}'s posts</RouterLink
    >
  </div>
</template>
