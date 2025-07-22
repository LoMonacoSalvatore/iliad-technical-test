<script setup lang="ts">
import type { Post } from '@/types'
import { ref } from 'vue'
import { useCommentsStore } from '@/stores/comments'

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

const commentsStore = useCommentsStore()

const selectedPostIds = ref<number[]>([])

const toggleComments = async (postId: number) => {
  if (!selectedPostIds.value.includes(postId)) {
    selectedPostIds.value.push(postId)
  } else {
    selectedPostIds.value = selectedPostIds.value.filter((id) => id !== postId)
  }

  if (!commentsStore.comments[postId]) {
    await commentsStore.loadComments(postId)
  }
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
    <button @click="toggleComments(post.id)">
      {{ selectedPostIds.includes(post.id) ? 'Hide Comments' : 'View Comments' }}
    </button>

    <div v-if="selectedPostIds.includes(post.id)">
      <p v-if="commentsStore.isLoading[post.id]">Loading comments...</p>
      <div v-else>
        <div v-for="(comment, index) in commentsStore.comments[post.id]" :key="comment.id">
          {{ index }} - {{ comment.email }}: {{ comment.body }}

          <!-- <button v-if="!isEditing" @click="editPost()">Edit comment</button>
          <button v-else @click="savePost()">Save edits</button>
          <button @click="emit('deletePost', post.id)">Delete comment</button> -->
        </div>
      </div>
    </div>
  </div>
</template>
