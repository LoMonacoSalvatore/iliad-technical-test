<script setup lang="ts">
import { useQuery } from '@pinia/colada'
import { fetchUserById } from '@/api/users'
import { useRoute } from 'vue-router'

const route = useRoute()

const { state: user, asyncStatus } = useQuery({
  key: () => ['user', route.params.id],
  query: () => fetchUserById(route.params.id as string),
})
</script>

<template>
  <RouterLink to="/">home</RouterLink>
  <div>username</div>

  {{ user.data }}
</template>
