<script setup lang="ts">
import { useCommentActions } from '@/composables/useCommentActions'
import type { Comment } from '@/types'

const props = defineProps<{
  comment: Comment
}>()

const emit = defineEmits<{
  (e: 'editComment', comment: Comment): void
  (e: 'deleteComment', id: number): void
}>()

const { isEditing, editedComment, editComment, saveComment } = useCommentActions(
  props.comment,
  emit,
)
</script>

<template>
  <div class="flex flex-col justify-between w-full">
    <p v-if="!isEditing" class="capitalize mb-2 md:max-w-3/4">{{ comment.body }}</p>

    <textarea
      v-else
      class="w-full p-2 border rounded block"
      v-model="editedComment"
      placeholder="Body"
    />

    <span>Author: {{ comment.email }}</span>
  </div>

  <div class="flex flex-col ml-2">
    <button class="button hover:bg-yellow-200! mb-2" v-if="!isEditing" @click="editComment()">
      Edit
    </button>
    <button class="button hover:bg-green-200! mb-2" v-else @click="saveComment()">Save</button>

    <button class="button hover:bg-red-200!" @click="emit('deleteComment', comment.id)">
      Delete
    </button>
  </div>
</template>

<style scoped></style>
