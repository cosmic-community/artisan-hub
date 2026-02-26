<script setup lang="ts">
import type { Review } from '@/types'
import StarRating from '@/components/StarRating.vue'

defineProps<{
  review: Review
}>()
</script>

<template>
  <div class="bg-white rounded-xl p-6 shadow-sm border border-warm-200">
    <div class="flex items-start justify-between mb-3">
      <div>
        <h4 class="font-semibold text-gray-900">{{ review.metadata.reviewer_name }}</h4>
        <p v-if="review.metadata.product" class="text-sm text-gray-500 mt-0.5">
          on <RouterLink :to="`/shop/${review.metadata.product.slug}`" class="text-primary-600 hover:underline">{{ review.metadata.product.title }}</RouterLink>
        </p>
      </div>
      <StarRating :rating="Number(review.metadata.rating.key)" />
    </div>
    <p v-if="review.metadata.comment" class="text-gray-600 text-sm leading-relaxed">
      "{{ review.metadata.comment }}"
    </p>
  </div>
</template>