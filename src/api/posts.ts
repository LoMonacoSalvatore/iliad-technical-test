import type { Post } from '@/types'

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')

  if (!response.ok) {
    throw new Error(`Error fetching posts: ${response.status} ${response.statusText}`)
  }

  const posts = await response.json()
  return posts
}

export const fetchPostByUserId = async (userId: string): Promise<Post[]> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId${userId}`)

  if (!response.ok) {
    throw new Error(`Error fetching post: ${response.status} ${response.statusText}`)
  }

  const posts = await response.json()
  return posts
}
