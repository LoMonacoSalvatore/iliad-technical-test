import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fetchPostByUserId } from '@/api/posts'
import type { Post } from '@/types'

export const usePostsStore = defineStore('posts', () => {
  const posts = ref<Record<number, Post[]>>({})
  const isLoading = ref(false)
  const error = ref<Error | null>(null)
  const _userId = ref<string>()

  const currentPosts = computed(() => posts.value[Number(_userId.value)] || [])

  const hasLoadedPosts = (userId: number) => {
    return userId in posts.value
  }

  const loadPosts = async (userId: string) => {
    isLoading.value = true
    error.value = null
    try {
      _userId.value = userId
      if (hasLoadedPosts(Number(userId))) return

      const res = await fetchPostByUserId(userId as string)

      posts.value[Number(userId)] = res
    } catch (err: any) {
      error.value = err
    } finally {
      isLoading.value = false
    }
  }

  const deletePost = (postId: number) => {
    for (const userId in posts.value) {
      const postList = posts.value[userId]
      const index = postList.findIndex((post) => post.id === postId)

      if (index !== -1) {
        postList.splice(index, 1)
        break
      }
    }
  }

  return {
    currentPosts,
    posts,
    isLoading,
    error,
    loadPosts,
    deletePost,
  }
})
