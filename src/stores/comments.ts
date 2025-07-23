import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fetchCommentByPostId } from '@/api/comments'
import type { Comment } from '@/types'

export const useCommentsStore = defineStore('comments', () => {
  const comments = ref<Record<number, Comment[]>>({})
  const selectedPostIds = ref<number[]>([])
  const isLoading = ref<Record<number, boolean>>({})
  const error = ref<Error | null>(null)

  const hasLoadedComments = (postId: number) => {
    return postId in comments.value
  }

  const loadComments = async (postId: number) => {
    isLoading.value[postId] = true
    error.value = null
    try {
      if (hasLoadedComments(Number(postId))) return

      const res = await fetchCommentByPostId(postId)

      comments.value[postId] = res
    } catch (err: any) {
      error.value = err
    } finally {
      isLoading.value[postId] = false
    }
  }

  const toggleComments = async (postId: number) => {
    if (!selectedPostIds.value.includes(postId)) {
      selectedPostIds.value.push(postId)
    } else {
      selectedPostIds.value = selectedPostIds.value.filter((id) => id !== postId)
    }

    if (!comments.value[postId]) {
      await loadComments(postId)
    }
  }

  const editComment = (updatedComment: Comment) => {
    const postId = updatedComment.postId
    const userComments = comments.value[postId]
    if (!userComments) return

    const index = userComments.findIndex((post) => post.id === updatedComment.id)
    if (index !== -1) {
      userComments[index] = updatedComment
    }
  }

  const deleteComment = (postId: number, commentId: number) => {
    const commentsList = comments.value[postId]

    comments.value[postId] = commentsList.filter((comment) => comment.id !== commentId)
  }

  return {
    comments,
    selectedPostIds,
    isLoading,
    error,
    loadComments,
    toggleComments,
    editComment,
    deleteComment,
  }
})
