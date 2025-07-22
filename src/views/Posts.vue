<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { usePostsStore } from '@/stores/posts'
import { useRoute } from 'vue-router'
import PostCard from '@/components/PostCard.vue'

const route = useRoute()
const paramId = computed(() => route.params.id)

const postsStore = usePostsStore()

postsStore.loadPosts(paramId.value as string)

const { currentPosts, isLoading: isLoadingPosts } = storeToRefs(postsStore)
</script>

<template>
  <div>Posts</div>
  <div v-if="isLoadingPosts">...</div>
  <div v-else v-for="post in currentPosts" :key="`post-${post.id}`">
    <PostCard
      :post="post"
      @edit-post="(post) => postsStore.editPost(post)"
      @delete-post="(postId) => postsStore.deletePost(postId)"
    />
  </div>
  <div v-show="!currentPosts.length">No posts available</div>
</template>
