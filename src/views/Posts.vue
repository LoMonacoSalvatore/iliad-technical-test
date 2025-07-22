<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { usePostsStore } from '@/stores/posts'
import { useRoute } from 'vue-router'
import PostCard from '@/components/PostCard.vue'

const route = useRoute()
const paramId = computed(() => route.params.id)

const store = usePostsStore()

store.loadPosts(paramId.value as string)

const { currentPosts, isLoading } = storeToRefs(store)
</script>

<template>
  <div>Posts</div>
  <div v-if="isLoading">...</div>
  <div v-else v-for="post in currentPosts" :key="`post-${post.id}`">
    <PostCard :post="post" @delete-post="(postId) => store.deletePost(postId)" />
  </div>
  <div v-show="!currentPosts.length">No posts available</div>
</template>
