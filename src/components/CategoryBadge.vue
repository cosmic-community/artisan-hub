<script setup lang="ts">
import type { Category } from '@/types'

defineProps<{
  category: Category
}>()
</script>

<template>
  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
    {{ category.metadata?.name || category.title }}
  </span>
</template>