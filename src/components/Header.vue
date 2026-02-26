<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const mobileMenuOpen = ref(false)

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blog' },
  { name: 'Shop', path: '/shop' },
  { name: 'Collections', path: '/collections' },
  { name: 'About', path: '/about' }
]
</script>

<template>
  <header class="bg-white border-b border-warm-200 sticky top-0 z-40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <RouterLink to="/" class="flex items-center gap-2">
          <span class="text-2xl">🏪</span>
          <span class="text-xl font-bold text-gray-900">Artisan Hub</span>
        </RouterLink>

        <nav class="hidden md:flex items-center gap-8">
          <RouterLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors"
            active-class="text-primary-600"
          >
            {{ link.name }}
          </RouterLink>
        </nav>

        <button
          class="md:hidden p-2 text-gray-600 hover:text-gray-900"
          @click="mobileMenuOpen = !mobileMenuOpen"
          aria-label="Toggle menu"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              v-if="!mobileMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <nav v-if="mobileMenuOpen" class="md:hidden py-4 border-t border-warm-200">
        <div class="flex flex-col gap-3">
          <RouterLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors py-1"
            active-class="text-primary-600"
            @click="mobileMenuOpen = false"
          >
            {{ link.name }}
          </RouterLink>
        </div>
      </nav>
    </div>
  </header>
</template>