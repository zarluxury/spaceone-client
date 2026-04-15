'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Footer } from '../ui/Footer';
import Image from 'next/image';
import { ProductsGridSkeleton } from '../ui/Skeleton';

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

interface ProductsProps {
  categories?: string[];
  subCategories?: { name: string; count: number }[];
  products?: Product[];
}

const Products = (props: ProductsProps) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE}/products`)
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }
      const data = await response.json()
      setProducts(data)
    } catch (err) {
      alert('Failed to load products: ' + (err instanceof Error ? err.message : 'An error occurred'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const {
    categories = [`Our Product's`],
  } = props;

  return (
    <>
    <div className="w-full bg-white font-sans text-[#333] px-6 py-20 lg:px-12 mt-2 ">
      {/* Header Navigation */}
      <div className="flex justify-center items-center gap-4 md:gap-8 lg:gap-12 lg:mb-12 font-gramatika">
        {categories.map((cat, idx) => (
          <button
            key={cat}
            className={`text-1xl md:text-3xl lg:text-5xl py-2 font-light  transition-colors duration-300 tracking-wide cursor-pointer  ${
              idx === 0 ? 'text-[#1a1a1a]' : 'text-[#b0b0b0] hover:text-[#666]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {loading ? (
        <ProductsGridSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-[1600px] mx-auto">
          {products.map((product) => (
            <Link key={product._id} href={`/productview/${product.slug}`} className="group cursor-pointer">
              <div className="aspect-[4/5] overflow-hidden bg-[#f5f5f5] mb-4">
                <img
                  src={product.heroImage}
                  alt={product.name}
                  className="w-full h-full object-fill transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex items-baseline gap-1 text-[15px] text-[#333] font-gramatika">
                <span className="font-medium tracking-tight">{product.name}</span>
                <span className="text-[#666]">| {product.designer}</span>
                {product.finishes.length > 0 && (
                  <span className="text-[10px] text-blue-500 font-semibold tracking-wider ml-1 uppercase">
                    {product.finishes[0].type}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
    <Footer />
    </>
  );
};

export default Products;