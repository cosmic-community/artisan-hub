export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, unknown>
  type?: string
  created_at?: string
  modified_at?: string
}

export interface ImageField {
  url: string
  imgix_url: string
}

export interface Author extends CosmicObject {
  metadata: {
    name: string
    bio?: string
    avatar?: ImageField
  }
}

export interface Category extends CosmicObject {
  metadata: {
    name: string
    description?: string
  }
}

export interface Post extends CosmicObject {
  metadata: {
    content: string
    featured_image?: ImageField
    author?: Author
    category?: Category
  }
}

export interface Collection extends CosmicObject {
  metadata: {
    name: string
    description?: string
    image?: ImageField
  }
}

export interface Product extends CosmicObject {
  metadata: {
    name: string
    description?: string
    price: number
    image?: ImageField
    collection?: Collection
    in_stock: boolean
  }
}

export interface RatingOption {
  key: string
  value: string
}

export interface Review extends CosmicObject {
  metadata: {
    product?: Product
    reviewer_name: string
    rating: RatingOption
    comment?: string
  }
}

export interface AboutPage extends CosmicObject {
  metadata: {
    heading: string
    content?: string
    hero_image?: ImageField
  }
}

export interface CosmicResponse<T> {
  objects: T[]
  total: number
  limit?: number
  skip?: number
}

export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}