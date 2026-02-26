/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>
  export default component
}

// Changed: Use COSMIC_ prefix to match standard Cosmic env var names
// These are exposed client-side via Vite's envPrefix config
interface ImportMetaEnv {
  readonly COSMIC_BUCKET_SLUG: string
  readonly COSMIC_READ_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}