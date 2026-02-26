<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Post, Category } from '@/types'
import { getPosts, getCategories } from '@/lib/cosmic'
import PostCard from '@/components/PostCard.vue'

const posts = ref<Post[]>([])
const categories = ref<Category[]>([])
const activeCategory = ref<string | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const [postsData, categoriesData] = await Promise.all([
      getPosts(),
      getCategories()
    ])
    posts.value = postsData
    categories.value = categoriesData
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('Error loading blog data:', message)
    error.value = 'Unable to load blog content. Please check your Cosmic environment variables.'
  } finally {
    loading.value = false
  }
})

const filteredPosts = computed(() => {
  if (!activeCategory.value) return posts.value
  return posts.value.filter(
    (post) => post.metadata.category?.slug === activeCategory.value
  )
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="mb-10">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Blog</h1>
      <p class="text-gray-500">Stories, guides, and inspiration from our community</p>
    </div>

    <!-- Error State -->
    <div v-if="error" class="text-center py-16">
      <p class="text-4xl mb-4">⚠️</p>
      <h3 class="text-lg font-semibold text-gray-900 mb-1">Connection Issue</h3>
      <p class="text-gray-500">{{ error }}</p>
    </div>

    <template v-else>
      <!-- Category Filter -->
      <div class="flex flex-wrap gap-2 mb-8">
        <button
          class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
          :class="activeCategory === null ? 'bg-primary-500 text-white' : 'bg-white text-gray-600 border border-warm-200 hover:border-primary-300'"
          @click="activeCategory = null"
        >
          All
        </button>
        <button
          v-for="category in categories"
          :key="category.id"
          class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
          :class="activeCategory === category.slug ? 'bg-primary-500 text-white' : 'bg-white text-gray-600 border border-warm-200 hover:border-primary-300'"
          @click="activeCategory = category.slug"
        >
          {{ category.metadata.name }}
        </button>
      </div>

      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="i in 3" :key="i" class="bg-warm-100 rounded-xl h-72 animate-pulse" />
      </div>

      <div v-else-if="filteredPosts.length === 0" class="text-center py-16">
        <p class="text-4xl mb-4">📭</p>
        <h3 class="text-lg font-semibold text-gray-900 mb-1">No posts found</h3>
        <p class="text-gray-500">Try selecting a different category.</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PostCard v-for="post in filteredPosts" :key="post.id" :post="post" />
      </div>
    </template>
  </div>
</template>