<script setup lang="ts">
import type { User, Info } from '@/types'
import UserInfo from '@/components/UserInfo.vue'

const props = defineProps<{
  user: User
}>()

const infos: Info[] = [
  {
    type: 'Username',
    info: props.user.username,
  },
  {
    type: 'Email',
    info: props.user.email,
  },
  {
    type: 'Address',
    info: `${props.user.address.city} - ${props.user.address.street}, ${props.user.address.zipcode}`,
  },
  {
    type: 'Phone',
    info: props.user.phone,
  },
  {
    type: 'Website',
    info: props.user.website,
  },
]
</script>

<template>
  <div>
    <h2 class="text-xl font-bold pb-2">{{ user.name }}</h2>
    <UserInfo v-for="(info, index) in infos" :key="`info-${index}`" v-bind="info" />
  </div>
</template>
