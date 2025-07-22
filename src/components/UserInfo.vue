<script setup lang="ts">
import type { Info } from '@/types'

defineProps<Info>()
</script>

<template>
  <div>
    <span class="block">
      <span class="font-bold">{{ type }}: </span>
      {{ info }}
    </span>
  </div>
</template>
