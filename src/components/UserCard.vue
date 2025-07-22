<script setup lang="ts">
import type { User } from '@/types'

defineProps<{
  user: User
}>()
</script>

<template>
  <div>
    <h2>{{ user.name }} - {{ user.username }}</h2>

    <div>
      info:
      {{ user.address }}

      {{ user.email }} - {{ user.phone }} - {{ user.website }}
    </div>
  </div>
</template>
