<script setup lang="ts">
import type { Post } from '@/types'
import { ref } from 'vue'

const isEditing = ref<Boolean>(false)
const editedTitle = ref('')
const editedBody = ref('')

const props = defineProps<{
  post: Post
}>()

const emit = defineEmits<{
  (e: 'deletePost', id: number): void
  (e: 'editPost', post: Post): void
}>()

const editPost = () => {
  editedTitle.value = props.post.title
  editedBody.value = props.post.body
  isEditing.value = true
}

const savePost = () => {
  emit('editPost', {
    ...props.post,
    title: editedTitle.value,
    body: editedBody.value,
  })
  isEditing.value = false
}
</script>

<template>
  <div>
    <div v-if="!isEditing">
      <h3>{{ post.title }}</h3>
      <p>{{ post.body }}</p>
    </div>
    <div v-else>
      <input v-model="editedTitle" type="text" placeholder="Title" />
      <input v-model="editedBody" type="textarea" placeholder="Body" />
    </div>

    <button v-if="!isEditing" @click="editPost()">Edit post</button>
    <button v-else @click="savePost()">Save edits</button>

    <button @click="emit('deletePost', post.id)">Delete post</button>
  </div>
</template>
