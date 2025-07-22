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
      <h3 class="font-bold capitalize mb-2 text-lg">{{ post.title }}</h3>
      <p class="capitalize">{{ post.body }}</p>
    </div>
    <div v-else>
      <input
        class="w-full p-2 border rounded mb-2 block"
        v-model="editedTitle"
        type="text"
        placeholder="Title"
      />
      <textarea class="w-full p-2 border rounded block" v-model="editedBody" placeholder="Body" />
    </div>

    <div class="mt-4 flex gap-2">
      <button class="button hover:bg-yellow-200!" v-if="!isEditing" @click="editPost()">
        Edit post
      </button>
      <button class="button hover:bg-green-200!" v-else @click="savePost()">Save edits</button>
      <button class="button hover:bg-red-200!" @click="emit('deletePost', post.id)">
        Delete post
      </button>
      <button class="button" @click="toggleComments(post.id)">
        {{ selectedPostIds.includes(post.id) ? 'Hide Comments' : 'View Comments' }}
      </button>
    </div>

    <div v-if="selectedPostIds.includes(post.id)" class="mt-4">
      <p v-if="commentsStore.isLoading[post.id]">Loading comments...</p>
      <div v-else>
        <h3 class="text-md mb-2 font-bold">Comments</h3>
        <div
          v-for="comment in commentsStore.comments[post.id]"
          :key="`comment-${comment.id}`"
          class="border rounded p-2 mb-2 flex justify-between"
        >
          <div class="flex flex-col justify-between">
            <p class="capitalize mb-2 md:max-w-3/4">{{ comment.body }}</p>
            <span>Author: {{ comment.email }}</span>
          </div>

          <div class="flex flex-col">
            <button class="button mb-2 hover:bg-yellow-200!">Edit</button>
            <button class="button hover:bg-red-200!">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
