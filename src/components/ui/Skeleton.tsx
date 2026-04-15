'use client'

import React from 'react'

interface SkeletonProps {
  width?: string | number
  height?: string | number
  className?: string
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  width = '100%', 
  height = '20px', 
  className = '', 
  variant = 'text' 
}) => {
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    rounded: 'rounded-lg'
  }

  return (
    <div
      className={`bg-gray-200 animate-pulse ${variantClasses[variant]} ${className}`}
      style={{ width, height }}
    />
  )
}

// Product Card Skeleton for products grid
export function ProductCardSkeleton() {
  return (
    <div className="group cursor-pointer">
      <div className="aspect-[4/5] overflow-hidden bg-[#f5f5f5] mb-4">
        <Skeleton width="100%" height="100%" variant="rectangular" />
      </div>
      <div className="space-y-2">
        <Skeleton width="70%" height="20px" />
        <Skeleton width="40%" height="16px" className="opacity-70" />
        <Skeleton width="30%" height="12px" className="opacity-50" />
      </div>
    </div>
  )
}

// Product View Page Skeleton
export function ProductViewSkeleton() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero Image Skeleton */}
      <div className="relative w-full h-screen">
        <Skeleton width="100%" height="100%" variant="rectangular" />
      </div>

      {/* Product Info Section Skeleton */}
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-15 py-16 md:py-15">
        {/* Product Name Skeleton */}
        <Skeleton width="40%" height="48px" className="mb-8" />

        {/* Description and Designer Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 lg:gap-0 mb-36">
          <div className="max-w-5xl space-y-4">
            <Skeleton width="100%" height="24px" />
            <Skeleton width="95%" height="24px" />
            <Skeleton width="90%" height="24px" />
            <Skeleton width="85%" height="24px" />
          </div>
          <div className="flex items-start lg:justify-center">
            <div className="space-y-2">
              <Skeleton width="80px" height="16px" className="opacity-60" />
              <Skeleton width="120px" height="20px" />
            </div>
          </div>
        </div>

        {/* Image Slider Skeleton */}
        <div className="mb-32">
          <div className="relative w-full h-[95vh] overflow-hidden">
            <div className="flex h-full">
              <div className="min-w-full flex items-center justify-center">
                <div className="relative w-[55%] h-[85%]">
                  <Skeleton width="100%" height="100%" variant="rounded" />
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <Skeleton width="40px" height="20px" className="mx-auto" />
          </div>
        </div>

        {/* Product Details Sections Skeleton */}
        <div className="min-h-auto bg-white px-8 md:px-16 lg:px-15">
          <hr className="border-gray-300" />
          
          {/* Finishes Section Skeleton */}
          <div className="w-full py-4">
            <div className="w-full flex items-center justify-between py-2">
              <Skeleton width="120px" height="24px" />
              <Skeleton width="32px" height="32px" variant="circular" />
            </div>
            <div className="space-y-6">
              <div className="border-b border-gray-100 pb-6">
                <Skeleton width="100px" height="20px" className="mb-4" />
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="relative w-full aspect-square overflow-hidden rounded-lg border border-gray-200">
                        <Skeleton width="100%" height="100%" variant="rounded" />
                      </div>
                      <Skeleton width="80%" height="12px" className="mx-auto" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Dimensions Section Skeleton */}
          <div className="w-full py-4">
            <div className="w-full flex items-center justify-between py-2">
              <Skeleton width="120px" height="24px" />
              <Skeleton width="32px" height="32px" variant="circular" />
            </div>
            <div className="w-full flex justify-center items-center py-2">
              <div className="w-[90%] sm:w-[60%] md:w-[40%] lg:w-[28%]">
                <Skeleton width="100%" height="200px" variant="rounded" />
              </div>
            </div>
          </div>

          <hr className="border-gray-300" />
        </div>

        {/* Related Products Skeleton */}
        <div className="w-full min-h-screen flex flex-col">
          <div className="text-center py-16">
            <Skeleton width="300px" height="48px" className="mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full h-[80vh] gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="relative w-full h-full overflow-hidden">
                <Skeleton width="100%" height="100%" variant="rectangular" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Products Grid Skeleton
export function ProductsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-[1600px] mx-auto">
      {[...Array(8)].map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

// Loading Spinner
export function LoadingSpinner({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  return (
    <div className={`animate-spin border-2 border-gray-300 border-t-blue-600 rounded-full ${sizeClasses[size]} ${className}`} />
  )
}
