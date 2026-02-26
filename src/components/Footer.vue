<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer class="bg-gray-900 text-gray-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div class="flex items-center gap-2 mb-4">
            <span class="text-2xl">🏪</span>
            <span class="text-lg font-bold text-white">Artisan Hub</span>
          </div>
          <p class="text-sm text-gray-400 leading-relaxed">
            Curated handcrafted goods, stories, and inspiration for intentional living.
          </p>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">Explore</h3>
          <nav class="flex flex-col gap-2">
            <RouterLink to="/blog" class="text-sm text-gray-400 hover:text-white transition-colors">Blog</RouterLink>
            <RouterLink to="/shop" class="text-sm text-gray-400 hover:text-white transition-colors">Shop</RouterLink>
            <RouterLink to="/collections" class="text-sm text-gray-400 hover:text-white transition-colors">Collections</RouterLink>
            <RouterLink to="/about" class="text-sm text-gray-400 hover:text-white transition-colors">About</RouterLink>
          </nav>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">Powered By</h3>
          <p class="text-sm text-gray-400">
            Content managed with
            <a href="https://www.cosmicjs.com" target="_blank" rel="noopener noreferrer" class="text-primary-400 hover:text-primary-300 transition-colors">Cosmic</a>.
            Built with Vue.js and Tailwind CSS.
          </p>
        </div>
      </div>

      <div class="border-t border-gray-800 mt-8 pt-8 text-center">
        <p class="text-sm text-gray-500">&copy; {{ new Date().getFullYear() }} Artisan Hub. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>