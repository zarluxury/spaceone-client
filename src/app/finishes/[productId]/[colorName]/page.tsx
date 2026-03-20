import React from 'react'
import Finishes from '@/components/sections/Finishes'

const ProductFinishesPage = async ({ params }: { params: Promise<{ productId: string, colorName: string }> }) => {
  const { productId, colorName } = await params;
  return <Finishes productId={productId} finishName={colorName} />
}

export default ProductFinishesPage
