'use client'

import Image from "next/image"
import { useState, useEffect } from "react"
import img_1 from "../../../public//images/product/Classic/camelcoat-03.jpg"
import img_2 from "../../../public//images/product/Classic/dove-01.jpg"
import img_3 from "../../../public//images/product/Classic/verona-02.jpg"
import { Footer } from "../ui/Footer"
import { DownloadForm } from "../ui/DownloadForm"
type DownloadItem = {
  title: string
  image: string
  pdf: string
  category: string
  productId?: string
  productName?: string
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
  const [showDownloadForm, setShowDownloadForm] = useState(false)
  const [pendingDownload, setPendingDownload] = useState<{url: string, name: string, productId: string, productName: string} | null>(null)
  const [formLoading, setFormLoading] = useState(false)
  const [downloadedPdfs, setDownloadedPdfs] = useState<Set<string>>(new Set())

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
                category: "Download PDF's",
                productId: product._id,
                productName: product.name
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

  const handleDownload = async (url: string, name: string, productId: string, productName: string) => {
    // Check if already downloaded
    const email = localStorage.getItem('userEmail');
    if (email && downloadedPdfs.has(url)) {
      // Direct download if already submitted form
      await handleDirectDownload(url, name);
      return;
    }

    // Show form for first-time download
    setPendingDownload({ url, name, productId, productName });
    setShowDownloadForm(true);
  };

  const handleFormSubmit = async (formData: any) => {
    setFormLoading(true);
    try {
      // Transform phone format if needed
      const submissionData = {
        ...formData,
        phone: {
          countryCode: formData.phone.includes('+') ? formData.phone.split(' ')[0] : '+91',
          number: formData.phone.includes('+') ? formData.phone.split(' ').slice(1).join(' ') : formData.phone
        }
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/downloads/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();
      
      if (response.ok) {
        // Store email in localStorage for future downloads
        localStorage.setItem('userEmail', formData.email);
        
        // Add to downloaded PDFs
        setDownloadedPdfs(prev => new Set([...prev, formData.imageUrl]));
        
        // Close form and download the PDF
        setShowDownloadForm(false);
        
        if (pendingDownload) {
          await handleDirectDownload(pendingDownload.url, pendingDownload.name);
        }
        
        setPendingDownload(null);
      } else {
        console.error('Form submission failed:', result.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDirectDownload = async (url: string, name: string) => {
    try {
      // Create a temporary link and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = `${name}.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Fallback: open in new tab if download doesn't work
      setTimeout(() => {
        window.open(url, '_blank');
      }, 1000);
    } catch (err) {
      console.error('Download failed:', err);
      // Final fallback: open in new tab
      window.open(url, '_blank');
    }
  };

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
              <div
                key={item.title}
                className="group cursor-pointer"
                onClick={() => handleDownload(item.pdf, item.title, item.productId || 'unknown', item.productName || 'Unknown Product')}
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
                      Download PDF ↗
                    </span>
                  </div>
                </div>

                {/* Title */}
                <p className="mt-4 text-sm tracking-wide">
                  {item.title}
                </p>
              </div>
            ))}

          </div>
        </section>
      </div>
    </div>
    <Footer />
    
    {/* Download Form Modal */}
    {pendingDownload && (
      <DownloadForm
        isOpen={showDownloadForm}
        onClose={() => {
          setShowDownloadForm(false);
          setPendingDownload(null);
        }}
        onSubmit={handleFormSubmit}
        imageUrl={pendingDownload.url}
        imageName={pendingDownload.name}
        productId={pendingDownload.productId}
        productName={pendingDownload.productName}
        loading={formLoading}
      />
    )}
    </>
  )
}
