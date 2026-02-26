<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { marked } from 'marked'
import type { AboutPage } from '@/types'
import { getAboutPage } from '@/lib/cosmic'

const about = ref<AboutPage | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    about.value = await getAboutPage()
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('Error loading about page:', message)
    error.value = 'Unable to load page content. Please check your Cosmic environment variables.'
  } finally {
    loading.value = false
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
        <div class="bg-warm-100 h-4 rounded w-full animate-pulse" />
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-24">
      <p class="text-5xl mb-4">⚠️</p>
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Connection Issue</h2>
      <p class="text-gray-500">{{ error }}</p>
    </div>

    <!-- No content -->
    <div v-else-if="!about" class="text-center py-24">
      <p class="text-5xl mb-4">📄</p>
      <h2 class="text-2xl font-bold text-gray-900 mb-2">About Page</h2>
      <p class="text-gray-500">Content coming soon.</p>
    </div>

    <!-- About Content -->
    <div v-else>
      <div
        v-if="about.metadata.hero_image"
        class="w-full aspect-[21/9] max-h-[400px] overflow-hidden bg-warm-100"
      >
        <img
          :src="`${about.metadata.hero_image.imgix_url}?w=1600&h=700&fit=crop&auto=format,compress`"
          :alt="about.metadata.heading"
          class="w-full h-full object-cover"
          width="1600"
          height="700"
        />
      </div>

      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
          {{ about.metadata.heading }}
        </h1>

        <div
          v-if="about.metadata.content"
          class="prose max-w-none"
          v-html="renderMarkdown(about.metadata.content)"
        />
      </div>
    </div>
  </div>
</template>