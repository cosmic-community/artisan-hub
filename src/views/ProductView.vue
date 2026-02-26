<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import type { Product, Review } from '@/types'
import { getProductBySlug, getReviews } from '@/lib/cosmic'
import StarRating from '@/components/StarRating.vue'

const route = useRoute()
const product = ref<Product | null>(null)
const productReviews = ref<Review[]>([])
const loading = ref(true)
const error = ref(false)

async function loadProduct(slug: string) {
  loading.value = true
  error.value = false
  try {
    const [productData, allReviews] = await Promise.all([
      getProductBySlug(slug),
      getReviews()
    ])
    product.value = productData
    if (!product.value) {
      error.value = true
      return
    }
    productReviews.value = allReviews.filter(
      (review) => review.metadata.product?.slug === slug
    )
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  const slug = route.params.slug as string
  loadProduct(slug)
})

watch(() => route.params.slug, (newSlug) => {
  if (newSlug && typeof newSlug === 'string') {
    loadProduct(newSlug)
  }
})

function renderMarkdown(content: string): string {
  return marked.parse(content, { async: false }) as string
}
</script>

<template>
  <div>
    <!-- Loading -->
    <div v-if="loading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div class="bg-warm-100 rounded-xl aspect-square animate-pulse" />
        <div class="space-y-4">
          <div class="bg-warm-100 h-8 rounded w-3/4 animate-pulse" />
          <div class="bg-warm-100 h-6 rounded w-1/4 animate-pulse" />
          <div class="bg-warm-100 h-4 rounded w-full animate-pulse" />
        </div>
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="error || !product" class="text-center py-24">
      <p class="text-5xl mb-4">😕</p>
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
      <p class="text-gray-500 mb-6">The product you're looking for doesn't exist.</p>
      <RouterLink to="/shop" class="inline-flex items-center px-5 py-2.5 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors">
        ← Back to Shop
      </RouterLink>
    </div>

    <!-- Product Content -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <RouterLink to="/shop" class="text-sm text-primary-600 hover:text-primary-700 mb-6 inline-flex items-center gap-1">
        ← Back to Shop
      </RouterLink>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-4">
        <div class="aspect-square rounded-xl overflow-hidden bg-warm-100">
          <img
            v-if="product.metadata.image"
            :src="`${product.metadata.image.imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`"
            :alt="product.metadata.name"
            class="w-full h-full object-cover"
            width="600"
            height="600"
          />
          <div v-else class="w-full h-full flex items-center justify-center text-6xl">🛍️</div>
        </div>

        <div>
          <div v-if="product.metadata.collection" class="mb-2">
            <RouterLink
              :to="`/collections/${product.metadata.collection.slug}`"
              class="text-sm text-primary-600 hover:text-primary-700"
            >
              {{ product.metadata.collection.title }}
            </RouterLink>
          </div>

          <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ product.metadata.name }}</h1>

          <div class="flex items-center gap-4 mb-6">
            <span class="text-3xl font-bold text-primary-600">${{ product.metadata.price }}</span>
            <span
              :class="product.metadata.in_stock ? 'text-green-700 bg-green-50 border-green-200' : 'text-red-700 bg-red-50 border-red-200'"
              class="text-sm font-medium px-3 py-1 rounded-full border"
            >
              {{ product.metadata.in_stock ? '✓ In Stock' : '✕ Out of Stock' }}
            </span>
          </div>

          <div
            v-if="product.metadata.description"
            class="prose max-w-none"
            v-html="renderMarkdown(product.metadata.description)"
          />
        </div>
      </div>

      <!-- Reviews -->
      <section v-if="productReviews.length > 0" class="mt-16">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
        <div class="space-y-4">
          <div
            v-for="review in productReviews"
            :key="review.id"
            class="bg-white rounded-xl p-6 shadow-sm border border-warm-200"
          >
            <div class="flex items-center justify-between mb-3">
              <span class="font-semibold text-gray-900">{{ review.metadata.reviewer_name }}</span>
              <StarRating :rating="Number(review.metadata.rating.key)" />
            </div>
            <p v-if="review.metadata.comment" class="text-gray-600 text-sm leading-relaxed">
              "{{ review.metadata.comment }}"
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>