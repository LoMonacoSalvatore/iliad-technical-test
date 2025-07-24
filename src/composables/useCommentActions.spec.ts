import { ref } from 'vue'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useCommentActions } from '@/composables/useCommentActions'
import type { Comment } from '@/types'

describe('useCommentActions', () => {
  let comment: Comment
  let emit: ReturnType<typeof vi.fn>

  const mockComment = { postId: 1, id: 1, name: 'asd', email: 'ads@ads.com', body: 'Hello world' }

  beforeEach(() => {
    comment = mockComment
    emit = vi.fn()
  })

  it('initializes with correct default state', () => {
    const { isEditing, editedComment } = useCommentActions(comment, emit)
    expect(isEditing.value).toBe(false)
    expect(editedComment.value).toBe('')
  })

  it('editComment() enables editing mode and copies body', () => {
    const { isEditing, editedComment, editComment } = useCommentActions(comment, emit)

    editComment()

    expect(isEditing.value).toBe(true)
    expect(editedComment.value).toBe('Hello world')
  })

  it('saveComment() emits the updated comment and stops editing', () => {
    const { isEditing, editedComment, editComment, saveComment } = useCommentActions(comment, emit)

    editComment()
    editedComment.value = 'Updated comment'
    saveComment()

    expect(emit).toHaveBeenCalledTimes(1)
    expect(emit).toHaveBeenCalledWith('editComment', {
      ...comment,
      body: 'Updated comment',
    })
    expect(isEditing.value).toBe(false)
  })

  it('saveComment() still works if editComment() wasn’t called', () => {
    const { isEditing, editedComment, saveComment } = useCommentActions(comment, emit)

    editedComment.value = 'Direct update'
    saveComment()

    expect(emit).toHaveBeenCalledWith('editComment', {
      ...comment,
      body: 'Direct update',
    })
    expect(isEditing.value).toBe(false)
  })
})
