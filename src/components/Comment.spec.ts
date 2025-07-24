import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import CommentItem from '@/components/Comment.vue' // adjust path
import type { Comment } from '@/types'

describe('CommentItem.vue', () => {
  let comment: Comment
  let wrapper: ReturnType<typeof mount>

  const mockComment = { postId: 1, id: 1, name: 'asd', email: 'ads@ads.com', body: 'Hello world' }

  beforeEach(() => {
    comment = mockComment
    wrapper = mount(CommentItem, {
      props: { comment },
    })
  })

  it('renders comment body and email by default', () => {
    expect(wrapper.text()).toContain('Hello world')
    expect(wrapper.text()).toContain('Author: ads@ads.com')
    expect(wrapper.find('textarea').exists()).toBe(false)
    expect(wrapper.find('button').text()).toBe('Edit')
  })

  it('enter edit mode when clicking Edit', async () => {
    await wrapper.get('button').trigger('click')
    expect(wrapper.find('textarea').exists()).toBe(true)
    expect(wrapper.find('textarea').element.value).toBe('Hello world')
    expect(wrapper.find('button').text()).toBe('Save')
  })

  it('emits editComment with updated body on Save', async () => {
    await wrapper.get('button').trigger('click')
    const textarea = wrapper.get('textarea')
    await textarea.setValue('Updated comment')
    await wrapper.get('button').trigger('click')

    const events = wrapper.emitted('editComment')
    expect(events).toBeTruthy()
    expect(events![0]).toEqual([{ ...comment, body: 'Updated comment' }])
    expect(wrapper.find('textarea').exists()).toBe(false)
  })

  it('always renders Delete button and emits deleteComment when clicked', async () => {
    const deleteBtn = wrapper.findAll('button')[1]
    await deleteBtn.trigger('click')

    const events = wrapper.emitted('deleteComment')
    expect(events).toBeTruthy()
    expect(events![0]).toEqual([comment.id])
  })

  it('can delete after editing without saving', async () => {
    await wrapper.get('button').trigger('click')
    const deleteBtn = wrapper.findAll('button')[1]
    await deleteBtn.trigger('click')

    const events = wrapper.emitted('deleteComment')
    expect(events).toBeTruthy()
    expect(events![0]).toEqual([comment.id])
  })
})
