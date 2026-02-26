<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Collection } from '@/types'
import { getCollections } from '@/lib/cosmic'
import CollectionCard from '@/components/CollectionCard.vue'

const collections = ref<Collection[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    collections.value = await getCollections()
  } catch (error) {
    console.error('Error loading collections:', error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="mb-10">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Collections</h1>
      <p class="text-gray-500">Curated groupings for every style and season</p>
    </div>

    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="i in 2" :key="i" class="bg-warm-100 rounded-xl h-64 animate-pulse" />
    </div>

    <div v-else-if="collections.length === 0" class="text-center py-16">
      <p class="text-4xl mb-4">🗂️</p>
      <h3 class="text-lg font-semibold text-gray-900 mb-1">No collections yet</h3>
      <p class="text-gray-500">Check back soon for curated collections.</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <CollectionCard v-for="collection in collections" :key="collection.id" :collection="collection" />
    </div>
  </div>
</template>