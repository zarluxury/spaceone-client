interface Finish {
  type: string
  colors: {
    _id?: string
    name: string
    code?: string
    image: string
  }[]
}

interface Product {
  _id: string
  name: string
  slug: string
  description: string
  designer: string
  heroImage: string
  sliderImages: string[]
  finishes: Finish[]
  dimensions: {
    vertical: number
    horizontal: number
  }
  downloads: {
    title: string
    file: string
  }[]
  category: string
  createdAt: string
  updatedAt: string
}

// Fetch product by slug from API
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
    const response = await fetch(`${API_BASE}/api/products/${slug}`)
    
    if (!response.ok) {
      return null
    }
    
    const product = await response.json()
    return product
  } catch (error) {
    console.error('Error fetching product by slug:', error)
    return null
  }
}

// Additional helper functions that might be useful
export async function getAllProducts(): Promise<Product[]> {
  try {
    const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
    const response = await fetch(`${API_BASE}/api/products`)
    
    if (!response.ok) {
      return []
    }
    
    const products = await response.json()
    return products
  } catch (error) {
    console.error('Error fetching all products:', error)
    return []
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
    const response = await fetch(`${API_BASE}/api/products?category=${category}`)
    
    if (!response.ok) {
      return []
    }
    
    const products = await response.json()
    return products
  } catch (error) {
    console.error('Error fetching products by category:', error)
    return []
  }
}

export type { Product, Finish }
