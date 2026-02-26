<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import type { Post } from '@/types'
import { getPostBySlug } from '@/lib/cosmic'
import CategoryBadge from '@/components/CategoryBadge.vue'

const route = useRoute()
const post = ref<Post | null>(null)
const loading = ref(true)
const error = ref(false)

async function loadPost(slug: string) {
  loading.value = true
  error.value = false
  try {
    post.value = await getPostBySlug(slug)
    if (!post.value) error.value = true
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  const slug = route.params.slug as string
  loadPost(slug)
})

watch(() => route.params.slug, (newSlug) => {
  if (newSlug && typeof newSlug === 'string') {
    loadPost(newSlug)
  }
})

function renderMarkdown(content: string): string {
  return marked.parse(content, { async: false }) as string
}
</script>

<template>
  <div>
    <!-- Loading -->
    <div v-if="loading" class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-warm-100 rounded-xl h-64 animate-pulse mb-8" />
      <div class="space-y-4">
        <div class="bg-warm-100 h-8 rounded w-3/4 animate-pulse" />
        <div class="bg-warm-100 h-4 rounded w-1/2 animate-pulse" />
        <div class="bg-warm-100 h-4 rounded w-full animate-pulse" />
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="error || !post" class="text-center py-24">
      <p class="text-5xl mb-4">😕</p>
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Post Not Found</h2>
      <p class="text-gray-500 mb-6">The article you're looking for doesn't exist.</p>
      <RouterLink to="/blog" class="inline-flex items-center px-5 py-2.5 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors">
        ← Back to Blog
      </RouterLink>
    </div>

    <!-- Post Content -->
    <article v-else>
      <div v-if="post.metadata.featured_image" class="w-full aspect-[21/9] max-h-[400px] overflow-hidden bg-warm-100">
        <img
          :src="`${post.metadata.featured_image.imgix_url}?w=1600&h=700&fit=crop&auto=format,compress`"
          :alt="post.title"
          class="w-full h-full object-cover"
          width="1600"
          height="700"
        />
      </div>

      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <RouterLink to="/blog" class="text-sm text-primary-600 hover:text-primary-700 mb-4 inline-flex items-center gap-1">
          ← Back to Blog
        </RouterLink>

        <div class="flex items-center gap-3 mt-4 mb-4">
          <CategoryBadge v-if="post.metadata.category" :category="post.metadata.category" />
        </div>

        <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">{{ post.title }}</h1>

        <div v-if="post.metadata.author" class="flex items-center gap-3 mb-8 pb-8 border-b border-warm-200">
          <img
            v-if="post.metadata.author.metadata?.avatar"
            :src="`${post.metadata.author.metadata.avatar.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`"
            :alt="post.metadata.author.title"
            class="w-11 h-11 rounded-full object-cover"
            width="44"
            height="44"
          />
          <div>
            <p class="font-semibold text-gray-900">{{ post.metadata.author.title }}</p>
            <p v-if="post.metadata.author.metadata?.bio" class="text-sm text-gray-500 line-clamp-1">
              {{ post.metadata.author.metadata.bio }}
            </p>
          </div>
        </div>

        <div
          v-if="post.metadata.content"
          class="prose max-w-none"
          v-html="renderMarkdown(post.metadata.content)"
        />
      </div>
    </article>
  </div>
</template>