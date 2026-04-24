import React from 'react'
import SingleFinish from '@/components/sections/SingleFinish'

const ProductFinishesPage = async ({ params }: { params: Promise<{ productId: string, colorName: string }> }) => {
  const { productId, colorName } = await params;
  return <SingleFinish productId={productId} colorName={colorName} />
}

export default ProductFinishesPage
