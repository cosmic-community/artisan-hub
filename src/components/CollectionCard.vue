<script setup lang="ts">
import type { Collection } from '@/types'

defineProps<{
  collection: Collection
}>()
</script>

<template>
  <RouterLink
    :to="`/collections/${collection.slug}`"
    class="group relative block rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
  >
    <div class="aspect-[16/9] bg-warm-200">
      <img
        v-if="collection.metadata.image"
        :src="`${collection.metadata.image.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`"
        :alt="collection.metadata.name"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        width="400"
        height="225"
        loading="lazy"
      />
    </div>
    <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
    <div class="absolute bottom-0 left-0 right-0 p-5">
      <h3 class="text-xl font-bold text-white mb-1">{{ collection.metadata.name }}</h3>
      <p v-if="collection.metadata.description" class="text-sm text-gray-200 line-clamp-2">
        {{ collection.metadata.description }}
      </p>
    </div>
  </RouterLink>
</template>