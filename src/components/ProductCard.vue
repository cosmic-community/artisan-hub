<script setup lang="ts">
import type { Product } from '@/types'

defineProps<{
  product: Product
}>()
</script>

<template>
  <RouterLink
    :to="`/shop/${product.slug}`"
    class="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-warm-200 flex flex-col"
  >
    <div class="aspect-square overflow-hidden bg-warm-100">
      <img
        v-if="product.metadata.image"
        :src="`${product.metadata.image.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`"
        :alt="product.metadata.name"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        width="300"
        height="300"
        loading="lazy"
      />
      <div v-else class="w-full h-full flex items-center justify-center text-4xl">🛍️</div>
    </div>
    <div class="p-4 flex flex-col flex-1">
      <h3 class="text-base font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-1">
        {{ product.metadata.name }}
      </h3>
      <div v-if="product.metadata.collection" class="mb-2">
        <span class="text-xs text-gray-500">{{ product.metadata.collection.title }}</span>
      </div>
      <div class="mt-auto flex items-center justify-between pt-2">
        <span class="text-lg font-bold text-primary-600">${{ product.metadata.price }}</span>
        <span
          :class="product.metadata.in_stock ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'"
          class="text-xs font-medium px-2 py-1 rounded-full"
        >
          {{ product.metadata.in_stock ? 'In Stock' : 'Out of Stock' }}
        </span>
      </div>
    </div>
  </RouterLink>
</template>