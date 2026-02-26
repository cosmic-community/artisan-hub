<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { Collection, Product } from '@/types'
import { getCollectionBySlug, getProducts } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard.vue'

const route = useRoute()
const collection = ref<Collection | null>(null)
const products = ref<Product[]>([])
const loading = ref(true)
const error = ref(false)

async function loadCollection(slug: string) {
  loading.value = true
  error.value = false
  try {
    const [collectionData, allProducts] = await Promise.all([
      getCollectionBySlug(slug),
      getProducts()
    ])
    collection.value = collectionData
    if (!collection.value) {
      error.value = true
      return
    }
    products.value = allProducts.filter(
      (product) => product.metadata.collection?.slug === slug
    )
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  const slug = route.params.slug as string
  loadCollection(slug)
})

watch(() => route.params.slug, (newSlug) => {
  if (newSlug && typeof newSlug === 'string') {
    loadCollection(newSlug)
  }
})
</script>

<template>
  <div>
    <!-- Loading -->
    <div v-if="loading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-warm-100 rounded-xl h-64 animate-pulse mb-8" />
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="i in 4" :key="i" class="bg-warm-100 rounded-xl h-80 animate-pulse" />
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="error || !collection" class="text-center py-24">
      <p class="text-5xl mb-4">😕</p>
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Collection Not Found</h2>
      <p class="text-gray-500 mb-6">The collection you're looking for doesn't exist.</p>
      <RouterLink to="/collections" class="inline-flex items-center px-5 py-2.5 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors">
        ← Back to Collections
      </RouterLink>
    </div>

    <!-- Collection Content -->
    <div v-else>
      <div
        v-if="collection.metadata.image"
        class="relative w-full aspect-[21/9] max-h-[300px] overflow-hidden bg-warm-100"
      >
        <img
          :src="`${collection.metadata.image.imgix_url}?w=1600&h=600&fit=crop&auto=format,compress`"
          :alt="collection.metadata.name"
          class="w-full h-full object-cover"
          width="1600"
          height="600"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div class="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto">
          <h1 class="text-3xl font-bold text-white mb-2">{{ collection.metadata.name }}</h1>
          <p v-if="collection.metadata.description" class="text-gray-200">
            {{ collection.metadata.description }}
          </p>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <RouterLink to="/collections" class="text-sm text-primary-600 hover:text-primary-700 mb-6 inline-flex items-center gap-1">
          ← Back to Collections
        </RouterLink>

        <div v-if="!collection.metadata.image" class="mt-4 mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ collection.metadata.name }}</h1>
          <p v-if="collection.metadata.description" class="text-gray-500">
            {{ collection.metadata.description }}
          </p>
        </div>

        <div v-if="products.length === 0" class="text-center py-16 mt-4">
          <p class="text-4xl mb-4">📦</p>
          <h3 class="text-lg font-semibold text-gray-900 mb-1">No products in this collection yet</h3>
          <p class="text-gray-500">Check back soon for new additions.</p>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <ProductCard v-for="product in products" :key="product.id" :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>