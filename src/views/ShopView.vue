<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Product, Collection } from '@/types'
import { getProducts, getCollections } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard.vue'

const products = ref<Product[]>([])
const collections = ref<Collection[]>([])
const activeCollection = ref<string | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const [productsData, collectionsData] = await Promise.all([
      getProducts(),
      getCollections()
    ])
    products.value = productsData
    collections.value = collectionsData
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('Error loading shop data:', message)
    error.value = 'Unable to load shop content. Please check your Cosmic environment variables.'
  } finally {
    loading.value = false
  }
})

const filteredProducts = computed(() => {
  if (!activeCollection.value) return products.value
  return products.value.filter(
    (product) => product.metadata.collection?.slug === activeCollection.value
  )
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="mb-10">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Shop</h1>
      <p class="text-gray-500">Handcrafted goods made with care</p>
    </div>

    <!-- Error State -->
    <div v-if="error" class="text-center py-16">
      <p class="text-4xl mb-4">⚠️</p>
      <h3 class="text-lg font-semibold text-gray-900 mb-1">Connection Issue</h3>
      <p class="text-gray-500">{{ error }}</p>
    </div>

    <template v-else>
      <!-- Collection Filter -->
      <div class="flex flex-wrap gap-2 mb-8">
        <button
          class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
          :class="activeCollection === null ? 'bg-primary-500 text-white' : 'bg-white text-gray-600 border border-warm-200 hover:border-primary-300'"
          @click="activeCollection = null"
        >
          All Products
        </button>
        <button
          v-for="collection in collections"
          :key="collection.id"
          class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
          :class="activeCollection === collection.slug ? 'bg-primary-500 text-white' : 'bg-white text-gray-600 border border-warm-200 hover:border-primary-300'"
          @click="activeCollection = collection.slug"
        >
          {{ collection.metadata.name }}
        </button>
      </div>

      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="i in 4" :key="i" class="bg-warm-100 rounded-xl h-80 animate-pulse" />
      </div>

      <div v-else-if="filteredProducts.length === 0" class="text-center py-16">
        <p class="text-4xl mb-4">🛍️</p>
        <h3 class="text-lg font-semibold text-gray-900 mb-1">No products found</h3>
        <p class="text-gray-500">Try selecting a different collection.</p>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
      </div>
    </template>
  </div>
</template>