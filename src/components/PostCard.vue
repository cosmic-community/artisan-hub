<script setup lang="ts">
import type { Post } from '@/types'
import CategoryBadge from '@/components/CategoryBadge.vue'

defineProps<{
  post: Post
}>()
</script>

<template>
  <RouterLink
    :to="`/blog/${post.slug}`"
    class="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-warm-200 flex flex-col"
  >
    <div class="aspect-[16/9] overflow-hidden bg-warm-100">
      <img
        v-if="post.metadata.featured_image"
        :src="`${post.metadata.featured_image.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`"
        :alt="post.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        width="400"
        height="225"
        loading="lazy"
      />
      <div v-else class="w-full h-full flex items-center justify-center text-4xl">📝</div>
    </div>
    <div class="p-5 flex flex-col flex-1">
      <div class="flex items-center gap-2 mb-3">
        <CategoryBadge v-if="post.metadata.category" :category="post.metadata.category" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-2 line-clamp-2">
        {{ post.title }}
      </h3>
      <div v-if="post.metadata.author" class="mt-auto pt-3 flex items-center gap-2">
        <img
          v-if="post.metadata.author.metadata?.avatar"
          :src="`${post.metadata.author.metadata.avatar.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`"
          :alt="post.metadata.author.title"
          class="w-7 h-7 rounded-full object-cover"
          width="28"
          height="28"
        />
        <span class="text-sm text-gray-500">{{ post.metadata.author.title }}</span>
      </div>
    </div>
  </RouterLink>
</template>