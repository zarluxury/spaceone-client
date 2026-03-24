'use client'

import Image from "next/image"
import { useState, useEffect } from "react"
import img_1 from "../../../public//images/product/Classic/camelcoat-03.jpg"
import img_2 from "../../../public//images/product/Classic/dove-01.jpg"
import img_3 from "../../../public//images/product/Classic/verona-02.jpg"
import { Footer } from "../ui/Footer"
type DownloadItem = {
  title: string
  image: string
  pdf: string
  category: string
}

type BackendDownload = {
  title: string
  file: string
  _id: string
}


export default function Downloads() {
  const [active, setActive] = useState("Download PDF's")
  const [downloads, setDownloads] = useState<DownloadItem[]>([])
  const [loading, setLoading] = useState(true)

  // Get unique categories from downloads data
  const categories = Array.from(new Set(downloads.map(d => d.category)))
  
  // Update active category when downloads change
  useEffect(() => {
    if (categories.length > 0 && !categories.includes(active)) {
      setActive(categories[0])
    }
  }, [categories, active])

  const fetchProductData = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }
      
      const data = await response.json()
      
      // Extract downloads from all products
      if (data && data.length > 0) {
        const allDownloads: DownloadItem[] = []
        
        data.forEach((product: any) => {
          if (product.downloads && product.downloads.length > 0) {
            product.downloads.forEach((download: BackendDownload, index: number) => {
              allDownloads.push({
                title: download.title,
                image: [img_1.src, img_2.src, img_3.src][allDownloads.length % 3], // Cycle through default images
                pdf: download.file,
                category: "Download PDF's"
              })
            })
          }
        })
        
        if (allDownloads.length > 0) {
          setDownloads(allDownloads)
        }
      }
    } catch (err) {
      console.error('Error fetching product data:', err)
      // Set empty array if API fails to remove dummy data
      setDownloads([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductData()
  }, [])

  const filtered = downloads.filter(d => d.category === active)

  if (loading) {
    return (
      <div className="min-h-screen bg-white px-8 lg:px-16 py-25 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading downloads...</p>
        </div>
      </div>
    )
  }

  return (
    <>
    <div className="min-h-screen bg-white px-8 lg:px-16 py-25">

      {/* Title */}
      <h1 className="text-4xl text-center font-light mb-16 tracking-wide">
        Downloads
      </h1>

      <div className="flex gap-16">

        {/* ===== Sidebar ===== */}
        <aside className="w-56 shrink-0 border-t pt-6">
          <ul className="space-y-4 text-gray-700">
            {categories.map(cat => (
              <li
                key={cat}
                onClick={() => setActive(cat)}
                className={`cursor-pointer transition hover:text-blue-600 ${
                  active === cat ? "text-blue-600 font-medium" : ""
                }`}
              >
                {cat}
              </li>
            ))}
          </ul>
        </aside>

        {/* ===== Grid ===== */}
        <section className="flex-1 border-t pt-6">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">

            {filtered.map(item => (
              <a
                key={item.title}
                href={item.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="group cursor-pointer"
              >
                {/* Cover */}
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center transition">
                    <span className="text-white opacity-0 group-hover:opacity-100 text-sm tracking-wide">
                      Open PDF ↗
                    </span>
                  </div>
                </div>

                {/* Title */}
                <p className="mt-4 text-sm tracking-wide">
                  {item.title}
                </p>
              </a>
            ))}

          </div>
        </section>
      </div>
    </div>
    <Footer />
    </>
  )
}
