'use client'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { CiCirclePlus } from "react-icons/ci";
import { useParams } from 'next/navigation'
import { Footer } from '../ui/Footer'
import Link from 'next/link';

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

interface Color {
  name: string
  image: string
  category: 'classic' | 'plate' | 'weave'
}

interface SuggestProduct {
  src: string
  name: string
}

interface ViewProductProps {
  slug: string
}

const ViewProduct = ({ slug }: ViewProductProps) => {
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedColor, setSelectedColor] = useState(0)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [openSection, setOpenSection] = useState("")
  const [activeColorCategory, setActiveColorCategory] = useState("classic")
  const [relatedProducts, setRelatedProducts] = useState<any[]>([])

  const fetchRelatedProducts = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`)
      if (response.ok) {
        const allProducts = await response.json()
        const filtered = allProducts.filter((p: any) => p.slug !== product.slug && p.category === product.category)
        setRelatedProducts(filtered.slice(0, 3))
      }
    } catch (err) {
      // Error handling for production
    }
  }

  const fetchProduct = async () => {
    try {
      setLoading(true)
     const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${slug}`)

if (!response.ok) {
  throw new Error('Product not found')
}

const data = await response.json()
setProduct(data)

      
    } catch (err) {
      alert('Failed to load product: ' + (err instanceof Error ? err.message : 'An error occurred'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (slug) {
      fetchProduct()
    }

  }, [slug])

  useEffect(() => {
    if (product) {
      fetchRelatedProducts()
    }
  }, [product])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-lg">Loading product...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-lg">Product not found</div>
      </div>
    )
  }

  // Transform finishes data to colors format
  const colors: Color[] = product.finishes?.flatMap((finish: Finish) => 
    finish.colors?.map((color: { _id?: string, name: string, code?: string, image: string }) => ({
      name: color.name,
      image: color.image,
      category: finish.type?.toLowerCase() as 'classic' | 'plate' | 'weave'
    }))
  ) || []

  // Use product slider images or fallback
  const sliderImages = product.sliderImages?.length > 0 ? product.sliderImages : [product.heroImage]
  
  // Use suggest products from API or fallback
  const suggestProduct = product.suggestProduct || []

  const nextSlide = () => {
    setCurrentSlide((prev: number) => (prev + 1) % sliderImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev: number) => (prev - 1 + sliderImages.length) % sliderImages.length)
  }
  return (
    <>
    <div className="min-h-screen bg-white text-black">
      {/* Main Hero Image */}
      <div className="relative w-full h-screen">
  <Image 
    src={product.heroImage}
    alt="Product Hero Image"
    fill
    sizes="100vw"
    priority
    className="object-cover"
  />
</div>
      {/* Product Info Section */}
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-15 py-16 md:py-15">
        {/* Product Name */}
        <h1 className="text-1xl text-gray-900 md:text-2xl lg:text-4xl mb-8 tracking-tight font-gramatika font-light ">
          {product.name}
        </h1>
        {/* Description in two columns */}
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 lg:gap-0 mb-36">
  {/* DESCRIPTION */}
  <div className="max-w-5xl space-y-0 font-gramatika tracking-wide leading-5">
    <p className="text-[19px] text-gray-700 ">
      {product.description}
    </p>

  </div>
  {/* SIDE META */}
  <div className="flex items-start lg:justify-center font-gramatika">
    <p className="text-[16px] text-gray-900 capitalize tracking-wider">
      <span className="text-[12px] relative -top-2 mr-2 text-gray-600">DESIGN</span>
      {product.designer}
    </p>
  </div>
</div>
{/* ===== Premium Center Slider ===== */}
<div className="mb-32">
  <div
    className="relative w-full h-[95vh] overflow-hidden"
    onClick={(e) => {
      const imgBox = document.getElementById("product-image-box");
      if (!imgBox) return;
      const rect = imgBox.getBoundingClientRect();
      const clickX = e.clientX;
      if (clickX >= rect.left && clickX <= rect.right) return;
      const center = window.innerWidth / 2;
      if (clickX < center) prevSlide();
      else nextSlide();
    }}
  >
    {/* SLIDE TRACK */}
    <div
      className="flex h-full transition-transform duration-700 ease-out"
      style={{
        transform: `translateX(-${currentSlide * 100}%)`,
      }}
    >
      {sliderImages.map((img: any, index: number) => (
        <div
          key={index}
          className="min-w-full flex items-center justify-center"
        >
          {/* 👇 image box we detect clicks against */}
          <div
            id="product-image-box"
            className="relative w-[55%] h-[85%]"
          >
            <Image
              src={img}
              alt={`Product view ${index + 1}`}
              fill
              sizes="55vw"
              className="object-contain select-none"
              draggable={false}
              priority
            />
          </div>
        </div>
      ))}
    </div>
  </div>
  {/* fraction */}
  <div className="text-center mt-0 text-sm text-gray-500 tracking-wide font-light">
    {currentSlide + 1} / {sliderImages.length}
  </div>
</div>
{/* ===== FULL SCREEN METAL DETAILS SECTION ===== */}
<div className="min-h-auto bg-white px-8 md:px-16 lg:px-15 font-gramatika">
  {[
    { id: "finishes", title: "Metal finishes" },
    { id: "dimensions", title: "Dimensions" },
    { id: "downloads", title: "Downloads" },
  ].map((section) => (
    <div key={section.id} className="w-full">
      <hr className="border-gray-300" />
      {/* HEADER */}
      <button
        onClick={() =>
          setOpenSection(openSection === section.id ? "" : section.id)
        }
        className="w-full flex items-center justify-between py-2 text-left"
      >
        <h2 className="text-[18px] tracking-wide">
          {section.title}
        </h2>
        <CiCirclePlus
          className={`text-3xl transition-all duration-300 ${
            openSection === section.id ? "rotate-45 text-blue-600" : ""
          }`}
        />
      </button>
      {/* CONTENT */}
      <div
        className={`overflow-hidden transition-all duration-700 ${
          openSection === section.id
            ? "max-h-300 opacity-100 pb-4"
            : "max-h-0 opacity-0"
        }`}
      >
        {/* FINISHES GRID */}
        {section.id === "finishes" && (
          <div className="space-y-6">
            {/* Get unique finish types from product data */}
            {product.finishes?.map((finish: Finish) => {
              const finishType = finish.type?.toLowerCase();
              const typeColors = colors.filter((color: any) => color.category === finishType);
              
              if (typeColors.length === 0) return null;
              
              return (
                <div key={finishType} className="border-b border-gray-100 pb-6 last:border-0">
                  <p 
                    className={`text-gray-700 mb-4 cursor-pointer hover:text-gray-900 transition-colors capitalize text-lg font-medium ${
                      activeColorCategory === finishType ? 'text-gray-900 font-semibold' : ''
                    }`}
                    onClick={() => setActiveColorCategory(activeColorCategory === finishType ? '' : finishType)}
                  >
                    {finishType} {activeColorCategory === finishType ? '−' : '+'}
                    <span className="text-sm text-gray-500 font-normal ml-2">({typeColors.length} colors)</span>
                  </p>
                  <div className={`grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4 transition-all duration-500 ${
                    activeColorCategory === finishType ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0 overflow-hidden'
                  }`}>
                    {typeColors.map((color: any, index: number) => (
                      <Link href={`/finishes/${product._id}/${color.name.replace(/\s+/g, '-')}`} key={`${color.name}-${index}`} className="group cursor-pointer">
                        <div className="relative w-full aspect-square overflow-hidden rounded-lg border border-gray-200 hover:border-gray-400 transition-colors">
                          <div className="relative w-full h-full overflow-hidden group">
                            <Image
                              src={color.image}
                              alt={color.name}
                              fill
                              sizes="15vw"
                              className="object-cover scale-[1.4] object-center"
                            />
                          </div>
                        </div>
                        <p className="mt-2 text-xs text-gray-600 hover:text-blue-600 transition-colors capitalize text-center leading-tight">
                          {color.name}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {section.id === "materials" && (
          <p className="text-gray-700 text-lg">
            Brass, copper, patinated metals and custom finishes available.
          </p>
        )}
        {section.id === "dimensions" && product?.dimensions && (
          <div className="w-full flex justify-center items-center py-2">
  <div className="w-[90%] sm:w-[60%] md:w-[40%] lg:w-[28%] ">
    <svg
      viewBox="0 0 200 200"
      className="w-full h-auto"
      fill="none"
      stroke="#3b82f6"
      strokeWidth="2"
    >
      {/* ===== BOX ===== */}
      <rect x="40" y="40" width="120" height="120" fill='lightgray'/>
      {/* ===== TOP WIDTH LINE ===== */}
      <line x1="40" y1="25" x2="160" y2="25" />
      <text
        x="100"
        y="18"
        textAnchor="middle"
        fontSize="12"
        fill="#3b82f6"
        stroke="none"
      >
        {product.dimensions.horizontal}
      </text>
      {/* ===== LEFT HEIGHT LINE ===== */}
      <line x1="25" y1="40" x2="25" y2="160" />
      <text
        x="12"
        y="105"
        transform="rotate(-90 12 105)"
        textAnchor="middle"
        fontSize="12"
        fill="#3b82f6"
        stroke="none"
      >
        {product.dimensions.vertical}
      </text>
    </svg>
  </div>
</div>
        )}
        {section.id === "downloads" && (
          <div className="flex flex-col gap-4 text-lg">
            {product.downloads?.map((download: any, index: number) => (
              <a 
                key={index}
                href={download.file} 
                className="underline hover:text-blue-600 cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
              >
                {download.title}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  ))}
  <hr className="border-gray-300" />
</div>
        {/* Affinities with this product */}
<div className="w-full min-h-screen flex flex-col">
  <h2 className="text-4xl font-gramatika font-thin text-center py-16">
    Affinities with this product
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full h-[80vh]">
    {/* Related products only - exclude current product */}
    {relatedProducts.map((relatedProduct: any, index: number) => (
      <Link href={`/productview/${relatedProduct.slug}`} key={index}>
        <div className="relative w-full h-full overflow-hidden group cursor-pointer">
          <Image
            src={relatedProduct.heroImage}
            alt={relatedProduct.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
            className="object-fill transition-transform duration-700 group-hover:scale-105"
          />
          <h2 className="absolute inset-0 flex items-center justify-center text-white font-light font-gramatika text-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {relatedProduct.name}
          </h2>
        </div>
      </Link>
    ))}
  </div>
</div>


      </div>
    </div>
    <Footer />
    </>
  )
}

export default ViewProduct