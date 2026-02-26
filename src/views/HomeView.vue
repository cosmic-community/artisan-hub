<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Post, Product, Review, Collection } from '@/types'
import { getPosts, getProducts, getReviews, getCollections } from '@/lib/cosmic'
import HeroSection from '@/components/HeroSection.vue'
import PostCard from '@/components/PostCard.vue'
import ProductCard from '@/components/ProductCard.vue'
import ReviewCard from '@/components/ReviewCard.vue'
import CollectionCard from '@/components/CollectionCard.vue'

const posts = ref<Post[]>([])
const products = ref<Product[]>([])
const reviews = ref<Review[]>([])
const collections = ref<Collection[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const [postsData, productsData, reviewsData, collectionsData] = await Promise.all([
      getPosts(),
      getProducts(),
      getReviews(),
      getCollections()
    ])
    posts.value = postsData.slice(0, 3)
    products.value = productsData.slice(0, 4)
    reviews.value = reviewsData.slice(0, 3)
    collections.value = collectionsData
  } catch (err) {
    // Changed: Show user-friendly error when env vars are missing
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('Error loading homepage data:', message)
    error.value = 'Unable to load content. Please check that your Cosmic environment variables are configured.'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <HeroSection />

    <!-- Error State -->
    <div v-if="error" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <p class="text-4xl mb-4">⚠️</p>
      <h2 class="text-xl font-semibold text-gray-900 mb-2">Connection Issue</h2>
      <p class="text-gray-500 max-w-md mx-auto">{{ error }}</p>
    </div>

    <template v-else>
      <!-- Collections -->
      <section v-if="collections.length > 0" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="text-2xl font-bold text-gray-900">Shop by Collection</h2>
            <p class="text-gray-500 mt-1">Curated groupings for every style</p>
          </div>
          <RouterLink to="/collections" class="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
            View All →
          </RouterLink>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CollectionCard v-for="collection in collections" :key="collection.id" :collection="collection" />
        </div>
      </section>

      <!-- Products -->
      <section class="bg-white border-y border-warm-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div class="flex items-center justify-between mb-8">
            <div>
              <h2 class="text-2xl font-bold text-gray-900">Featured Products</h2>
              <p class="text-gray-500 mt-1">Handcrafted with intention</p>
            </div>
            <RouterLink to="/shop" class="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
              View All →
            </RouterLink>
          </div>
          <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div v-for="i in 4" :key="i" class="bg-warm-100 rounded-xl h-80 animate-pulse" />
          </div>
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProductCard v-for="product in products" :key="product.id" :product="product" />
          </div>
        </div>
      </section>

      <!-- Blog Posts -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="text-2xl font-bold text-gray-900">Latest from the Blog</h2>
            <p class="text-gray-500 mt-1">Stories, guides, and inspiration</p>
          </div>
          <RouterLink to="/blog" class="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
            View All →
          </RouterLink>
        </div>
        <div v-if="loading" class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="i in 3" :key="i" class="bg-warm-100 rounded-xl h-72 animate-pulse" />
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PostCard v-for="post in posts" :key="post.id" :post="post" />
        </div>
      </section>

      <!-- Reviews -->
      <section v-if="reviews.length > 0" class="bg-warm-100 border-y border-warm-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div class="text-center mb-10">
            <h2 class="text-2xl font-bold text-gray-900">What Our Customers Say</h2>
            <p class="text-gray-500 mt-1">Real reviews from real people</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ReviewCard v-for="review in reviews" :key="review.id" :review="review" />
          </div>
        </div>
      </section>
    </template>
  </div>
</template>