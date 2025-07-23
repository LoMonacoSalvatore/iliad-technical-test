import { ref } from 'vue'
import type { Post } from '@/types'

export const usePostActions = (post: Post, emit: (event: 'editPost', post: Post) => void) => {
  const isEditing = ref(false)
  const editedTitle = ref('')
  const editedBody = ref('')

  const editPost = () => {
    editedTitle.value = post.title
    editedBody.value = post.body
    isEditing.value = true
  }

  const savePost = () => {
    emit('editPost', {
      ...post,
      title: editedTitle.value,
      body: editedBody.value,
    })
    isEditing.value = false
  }

  return {
    isEditing,
    editedTitle,
    editedBody,
    editPost,
    savePost,
  }
}
