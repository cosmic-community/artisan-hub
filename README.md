# Artisan Hub

![Artisan Hub](https://imgix.cosmicjs.com/2321d9e0-12ce-11f1-87b4-a3b1ac0874fc-photo-1616046229478-9901c5536a45-1772081198175.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern Vue.js storefront and blog application powered by [Cosmic](https://www.cosmicjs.com). Artisan Hub brings together your blog posts, handcrafted products, curated collections, and customer reviews into one beautiful, cohesive experience.

## Features

- 📝 **Blog** — Full blog with category filtering, author profiles, and markdown rendering
- 🛍️ **Product Shop** — Browse products with pricing, stock status, and collection filtering
- 🗂️ **Collections** — Curated product groupings with dedicated pages
- ⭐ **Reviews** — Customer testimonials with star ratings linked to products
- 📄 **About Page** — Dynamic content powered by Cosmic singleton
- 🏷️ **Categories** — Blog post categorization with badge components
- 📱 **Responsive** — Fully responsive design for all devices
- ⚡ **Fast** — Vue 3 with Composition API for optimal performance

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=699f8edaf276ae650676d539&clone_repository=699fe95ce743d8806430d5bc)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Add 2 new categories"

### Code Generation Prompt

> "Develop a Vue.js application that uses my existing object types and objects"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Vue 3](https://vuejs.org/) — Progressive JavaScript Framework
- [Vue Router](https://router.vuejs.org/) — Official routing for Vue.js
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [Cosmic](https://www.cosmicjs.com) — Headless CMS ([docs](https://www.cosmicjs.com/docs))
- [TypeScript](https://www.typescriptlang.org/) — Type-safe JavaScript
- [Vite](https://vitejs.dev/) — Next generation frontend tooling
- [marked](https://marked.js.org/) — Markdown parser

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with the content model set up

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd artisan-hub

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env
# Edit .env with your Cosmic credentials

# Start development server
bun run dev
```

### Environment Variables

```
VITE_COSMIC_BUCKET_SLUG=your-bucket-slug
VITE_COSMIC_READ_KEY=your-read-key
```

## Cosmic SDK Examples

### Fetching Posts with Depth

```typescript
import { createBucketClient } from '@cosmicjs/sdk'

const cosmic = createBucketClient({
  bucketSlug: import.meta.env.VITE_COSMIC_BUCKET_SLUG,
  readKey: import.meta.env.VITE_COSMIC_READ_KEY,
  apiEnvironment: 'staging'
})

// Fetch posts with connected author and category objects
const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Product

```typescript
const { object: product } = await cosmic.objects.findOne({
  type: 'products',
  slug: 'minimalist-ceramic-vase'
}).props(['id', 'title', 'slug', 'metadata']).depth(1)
```

## Cosmic CMS Integration

This app integrates with the following Cosmic object types:

| Object Type | Emoji | Description |
|------------|-------|-------------|
| Posts | 📝 | Blog articles with author and category |
| Categories | 🏷️ | Blog post categorization |
| Authors | ✍️ | Writer profiles with avatars |
| Products | 🛍️ | Shop items with pricing and images |
| Collections | 🗂️ | Curated product groupings |
| Reviews | ⭐ | Customer testimonials with ratings |
| About Page | 📄 | Singleton about page content |

## Deployment Options

### Vercel

```bash
bun run build
# Deploy the dist/ folder to Vercel
```

Set environment variables in the Vercel dashboard:
- `VITE_COSMIC_BUCKET_SLUG`
- `VITE_COSMIC_READ_KEY`

### Netlify

```bash
bun run build
# Deploy the dist/ folder to Netlify
```

Set environment variables in the Netlify dashboard under Site Settings > Environment Variables.

<!-- README_END -->