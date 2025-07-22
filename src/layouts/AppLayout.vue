<script setup lang="ts">
import Header from '@/components/Header.vue'
</script>

<template>
  <Header />
  <div class="container mx-auto px-4">
    <slot />
  </div>
</template>
