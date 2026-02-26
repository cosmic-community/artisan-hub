import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // Changed: Allow COSMIC_ prefixed env vars to be exposed client-side
  // The read key is read-only and safe for client-side use in SPAs
  envPrefix: ['VITE_', 'COSMIC_']
})