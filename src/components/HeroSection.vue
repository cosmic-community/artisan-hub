<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="relative bg-gray-900 overflow-hidden">
    <div class="absolute inset-0">
      <img
        src="https://imgix.cosmicjs.com/2321d9e0-12ce-11f1-87b4-a3b1ac0874fc-photo-1616046229478-9901c5536a45-1772081198175.jpg?w=1920&h=800&fit=crop&auto=format,compress"
        alt="Artisan workspace"
        class="w-full h-full object-cover opacity-40"
        width="1920"
        height="800"
      />
    </div>
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
      <div class="max-w-2xl">
        <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-500/20 text-primary-200 mb-6">
          ✨ Handcrafted with care
        </span>
        <h1 class="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
          Discover Artisan<br />
          <span class="text-primary-400">Crafted Goods</span>
        </h1>
        <p class="text-lg text-gray-300 leading-relaxed mb-8 max-w-xl">
          Explore our curated collection of handmade products, read inspiring stories, and find unique pieces for your home.
        </p>
        <div class="flex flex-wrap gap-4">
          <RouterLink
            to="/shop"
            class="inline-flex items-center px-6 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors"
          >
            Browse Shop
            <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </RouterLink>
          <RouterLink
            to="/blog"
            class="inline-flex items-center px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors backdrop-blur-sm"
          >
            Read Blog
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>