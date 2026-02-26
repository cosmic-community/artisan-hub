<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isVisible = ref(false)
const bucketSlug = import.meta.env.VITE_COSMIC_BUCKET_SLUG || ''

onMounted(() => {
  const isDismissed = localStorage.getItem('cosmic-badge-dismissed')
  if (!isDismissed) {
    setTimeout(() => {
      isVisible.value = true
    }, 1000)
  }
})

function handleDismiss(e: Event) {
  e.preventDefault()
  e.stopPropagation()
  isVisible.value = false
  localStorage.setItem('cosmic-badge-dismissed', 'true')
}
</script>

<template>
  <a
    v-if="isVisible"
    :href="`https://www.cosmicjs.com?utm_source=bucket_${bucketSlug}&utm_medium=referral&utm_campaign=app_badge&utm_content=built_with_cosmic`"
    target="_blank"
    rel="noopener noreferrer"
    class="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-white text-gray-800 text-sm font-medium no-underline border border-gray-200 rounded-lg shadow-lg px-4 py-3 hover:bg-gray-50 transition-colors duration-200"
    style="position: fixed; width: 180px;"
  >
    <button
      class="absolute -top-2 -right-2 w-6 h-6 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-200 z-10"
      aria-label="Dismiss badge"
      @click="handleDismiss"
    >
      ×
    </button>
    <img
      src="https://cdn.cosmicjs.com/b67de7d0-c810-11ed-b01d-23d7b265c299-logo508x500.svg"
      alt="Cosmic Logo"
      class="w-5 h-5"
    />
    Built with Cosmic
  </a>
</template>