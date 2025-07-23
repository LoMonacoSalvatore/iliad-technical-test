import { ref } from 'vue'
import type { Comment } from '@/types'

export const useCommentActions = (
  comment: Comment,
  emit: (event: 'editComment', comment: Comment) => void,
) => {
  const isEditing = ref(false)
  const editedComment = ref('')

  const editComment = () => {
    editedComment.value = comment.body
    isEditing.value = true
  }

  const saveComment = () => {
    emit('editComment', {
      ...comment,
      body: editedComment.value,
    })
    isEditing.value = false
  }

  return {
    isEditing,
    editedComment,
    editComment,
    saveComment,
  }
}
