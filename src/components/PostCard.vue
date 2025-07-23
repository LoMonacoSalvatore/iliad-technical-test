<script setup lang="ts">
import type { Post } from '@/types'
import { usePostActions } from '@/composables/usePostActions'
import { useCommentsStore } from '@/stores/comments'
import Comment from '@/components/Comment.vue'

const props = defineProps<{
  post: Post
}>()

const emit = defineEmits<{
  (e: 'deletePost', id: number): void
  (e: 'editPost', post: Post): void
}>()

const { isEditing, editedTitle, editedBody, editPost, savePost } = usePostActions(props.post, emit)

const commentsStore = useCommentsStore()
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
      <button
        data-testid="delete-post-button"
        class="button hover:bg-red-200!"
        @click="emit('deletePost', post.id)"
      >
        Delete post
      </button>
      <button class="button" @click="commentsStore.toggleComments(post.id)">
        {{ commentsStore.selectedPostIds.includes(post.id) ? 'Hide Comments' : 'View Comments' }}
      </button>
    </div>

    <div v-if="commentsStore.selectedPostIds.includes(post.id)" class="mt-4">
      <p v-if="commentsStore.isLoading[post.id]">Loading comments...</p>
      <div v-else>
        <h3 class="text-md mb-2 font-bold">Comments</h3>
        <div v-if="!commentsStore.comments[post.id].length">No comments available</div>
        <div
          v-else
          v-for="comment in commentsStore.comments[post.id]"
          :key="`comment-${comment.id}`"
          class="border rounded p-2 mb-2 flex justify-between"
        >
          <Comment
            :comment="comment"
            @edit-comment="(comment) => commentsStore.editComment(comment)"
            @delete-comment="commentsStore.deleteComment(post.id, comment.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
