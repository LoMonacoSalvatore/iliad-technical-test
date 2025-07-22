<script setup lang="ts">
import type { Post } from '@/types'

defineProps<{
  post: Post
}>()

const emit = defineEmits<{
  (e: 'deletePost', id: number): void
}>()
</script>

<template>
  <div>
    <h3>{{ post.title }}</h3>
    <p>{{ post.body }}</p>

    <button @click="emit('deletePost', post.id)">Delete post</button>
  </div>
</template>
