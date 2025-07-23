<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { usePostsStore } from '@/stores/posts'
import { useRoute } from 'vue-router'
import PostCard from '@/components/PostCard.vue'

const route = useRoute()
const paramId = computed(() => route.params.id)

const postsStore = usePostsStore()

postsStore.loadPosts(Number(paramId.value))

const { currentPosts, isLoading: isLoadingPosts } = storeToRefs(postsStore)
</script>

<template>
  <RouterLink
    class="hover:underline mb-4 button block w-fit"
    :to="{ name: 'user', params: { id: route.params.id } }"
    >Back</RouterLink
  >
  <h2 class="text-xl font-bold pb-2">Posts</h2>
  <div v-if="isLoadingPosts">Loading posts</div>
  <div v-else v-for="post in currentPosts" :key="`post-${post.id}`">
    <PostCard
      data-testid="post-card"
      class="border rounded p-2 mb-2"
      :post="post"
      @edit-post="(post) => postsStore.editPost(post)"
      @delete-post="(postId) => postsStore.deletePost(postId)"
    />
  </div>
  <div v-show="!currentPosts.length">No posts available</div>
</template>
