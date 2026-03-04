'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { CiCirclePlus } from "react-icons/ci";
import hero1 from "../../../public/images/product/hero/hero.png"
import slider1 from "../../../public/images/product/slider/1.png"
import slider2 from "../../../public/images/product/slider/2.png"
import slider3 from "../../../public/images/product/slider/3.png"


import { Footer } from '../ui/Footer'
import Link from 'next/link';
import { Product } from '@/data/products'

interface ViewProductProps {
  product: Product
}

const ViewProduct = ({ product }: ViewProductProps) => {
  const [selectedColor, setSelectedColor] = useState(0)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [openSection, setOpenSection] = useState("")
  const [activeColorCategory, setActiveColorCategory] = useState("classic")

  // Use product data from props
  const sliderImages = [slider1, slider2, slider3]
  const colors = product.colors
  const suggestProduct = product.suggestProduct

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
    src={hero1}
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
        <h1 className="text-1xl text-gray-900 md:text-2xl lg:text-4xl mb-8 tracking-tight font-gramatika font-[300] ">
          {product.name}
        </h1>
        {/* Description in two columns */}
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 lg:gap-0 mb-36">
  {/* DESCRIPTION */}
  <div className="max-w-5xl space-y-0 font-gramatika tracking-wide leading-5">
    <p className="text-[19px] text-gray-700 ">
      {product.description}
    </p>
    <p className="text-[19px] text-gray-700">
       {product.details}
    </p>
  </div>
  {/* SIDE META */}
  <div className="flex items-start lg:justify-center font-gramatika">
    <p className="text-[16px] text-gray-900 uppercase tracking-wider">
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
      {sliderImages.map((img, index) => (
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
            ? "max-h-[1200px] opacity-100 pb-4"
            : "max-h-0 opacity-0"
        }`}
      >
        {/* FINISHES GRID */}
        {section.id === "finishes" && (
          <>
            {/* Classic */}
            <p 
              className={`text-gray-500 mb-1 cursor-pointer hover:text-gray-600 transition-colors ${
                activeColorCategory === 'classic' ? 'text-gray-900 font-semibold' : ''
              }`}
              onClick={() => setActiveColorCategory(activeColorCategory === 'classic' ? '' : 'classic')}
            >
              Classic {activeColorCategory === 'classic' ? '−' : '+'}
            </p>
            <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-16 mb-1 transition-all duration-500 ${
              activeColorCategory === 'classic' ? 'opacity-100 max-h-[1000px]' : 'opacity-0 max-h-0 overflow-hidden mb-0'
            }`}>
              {colors.filter(color => color.category === 'classic').map((color, index) => (
                <Link href={`/finishes/${color.name.replace(/\s+/g, '-')}`} key={color.id} className="group cursor-pointer">
                  <div className="relative w-full aspect-square overflow-hidden">
                    <Image
                      src={color.image}
                      alt=""
                      fill
                      sizes="20vw"
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  <p className="mt-3 text-sm hover:text-blue-600 transition-colors">{color.name}</p>
                </Link>
              ))}
            </div>
            {/* Plate */}
            <p 
              className={`text-gray-500 mb-1 cursor-pointer hover:text-gray-600 transition-colors ${
                activeColorCategory === 'plate' ? 'text-gray-900 font-semibold' : ''
              }`}
              onClick={() => setActiveColorCategory(activeColorCategory === 'plate' ? '' : 'plate')}
            >
              Plate {activeColorCategory === 'plate' ? '−' : '+'}
            </p>
            <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-16 mb-1 transition-all duration-500 ${
              activeColorCategory === 'plate' ? 'opacity-100 max-h-[1000px]' : 'opacity-0 max-h-0 overflow-hidden mb-0'
            }`}>
              {colors.filter(color => color.category === 'plate').map((color, index) => (
                <Link href={`/finishes/${color.name.replace(/\s+/g, '-')}`} key={color.id} className="group cursor-pointer">
                  <div className="relative w-full aspect-square overflow-hidden">
                    <Image
                      src={color.image}
                      alt=""
                      fill
                      sizes="20vw"
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  <p className="mt-3 text-sm hover:text-blue-600 transition-colors">{color.name}</p>
                </Link>
              ))}
            </div>
            {/* Weave */}
            <p 
              className={`text-gray-500 mb-1 cursor-pointer hover:text-gray-600 transition-colors ${
                activeColorCategory === 'weave' ? 'text-gray-900 font-semibold' : ''
              }`}
              onClick={() => setActiveColorCategory(activeColorCategory === 'weave' ? '' : 'weave')}
            >
              Weave {activeColorCategory === 'weave' ? '−' : '+'}
            </p>
            <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-16 mb-1 transition-all duration-500 ${
              activeColorCategory === 'weave' ? 'opacity-100 max-h-[1000px]' : 'opacity-0 max-h-0 overflow-hidden'
            }`}>
              {colors.filter(color => color.category === 'weave').map((color, index) => (
                <Link href={`/finishes/${color.name.replace(/\s+/g, '-')}`} key={color.id} className="group cursor-pointer">
                  <div className="relative w-full aspect-square overflow-hidden">
                    <Image
                      src={color.image}
                      alt=""
                      fill
                      sizes="20vw"
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  <p className="mt-3 text-sm hover:text-blue-600 transition-colors">{color.name}</p>
                </Link>
              ))}
            </div>
          </>
        )}
        {section.id === "materials" && (
          <p className="text-gray-700 text-lg">
            Brass, copper, patinated metals and custom finishes available.
          </p>
        )}
        {section.id === "dimensions" && (
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
        30
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
        30
      </text>
    </svg>
  </div>
</div>
        )}
        {section.id === "downloads" && (
          <div className="flex flex-col gap-4 text-lg">
            <a className="underline hover:text-blue-600 cursor-pointer">Product Sheet PDF</a>
            <a className="underline hover:text-blue-600 cursor-pointer">3D Model</a>
            <a className="underline hover:text-blue-600 cursor-pointer">Technical Drawings</a>
          </div>
        )}
      </div>
    </div>
  ))}
  <hr className="border-gray-300" />
</div>
        {/* Affinities with this product */}
<div className="w-full min-h-screen flex flex-col">
  <h2 className="text-4xl font-gramatika font-[100] text-center py-16">
    Affinities with this product
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-3 w-full h-[80vh]">
    {suggestProduct.map((n, index) => (
      <Link href={`/finishes/${n.name}`} key={index}>
      <div key={index} className="relative w-full h-full overflow-hidden group cursor-pointer">
        <Image
          src={n.src}
          alt={`Affinity ${index + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          priority
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <h2 className="absolute inset-0 flex items-center justify-center text-white font-light font-gramatika text-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
  {n.name}
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