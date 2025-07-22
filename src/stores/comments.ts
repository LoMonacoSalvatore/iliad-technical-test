import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fetchCommentByPostId } from '@/api/comments'
import type { Comment } from '@/types'

export const useCommentsStore = defineStore('comments', () => {
  const comments = ref<Record<number, Comment[]>>({})
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

  const editComment = (updatedComment: Comment) => {
    const postId = updatedComment.postId
    const userComments = comments.value[postId]
    if (!userComments) return

    const index = userComments.findIndex((post) => post.id === updatedComment.id)
    if (index !== -1) {
      userComments[index] = updatedComment
    }
  }

  // const deleteComment = (postId: number) => {
  //   for (const postId in comments.value) {
  //     const postList = comments.value[postId]
  //     const index = postList.findIndex((post) => post.id === Number(postId))

  //     if (index !== -1) {
  //       postList.splice(index, 1)
  //       break
  //     }
  //   }
  // }

  return {
    comments,
    isLoading,
    error,
    loadComments,
    editComment,
    // deleteComment,
  }
})
