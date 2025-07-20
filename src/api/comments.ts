import type { Comment } from '@/types'

export async function getComments(): Promise<Comment[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/comments')

  if (!response.ok) {
    throw new Error(`Error fetching comments: ${response.status} ${response.statusText}`)
  }

  const comments = await response.json()
  return comments
}

export async function getCommentByPostId(postId: number): Promise<Comment> {
  const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)

  if (!response.ok) {
    throw new Error(`Error fetching comment: ${response.status} ${response.statusText}`)
  }

  const posts = await response.json()
  return posts
}
