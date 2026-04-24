import React from 'react'
import ViewProduct from '@/components/sections/ViewProduct'
import { getProductBySlug } from '@/data/products'

interface PageProps {
  params: Promise<{
    category: string
    subcategory: string
    product: string
  }>
}

const page = async ({ params }: PageProps) => {
  const { product } = await params
  const productData = await getProductBySlug(product)
  
  if (!productData) {
    return <div>Product not found</div>
  }
  
  return <ViewProduct slug={product} />
}

export default page
