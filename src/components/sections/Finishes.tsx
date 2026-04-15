'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { GoDownload } from "react-icons/go";
import { X } from 'lucide-react';
import bottomImg from '../../../public/data/Materioteca-footer.jpeg'
import { Footer } from '../ui/Footer';
import { DownloadForm } from '../ui/DownloadForm';
import { QRCodeComponent } from '../ui/QRCode';
import Link from 'next/link';

interface Finish {
  productId: string;
  productName: string;
  productSlug: string;
  finishType: string;
  type: string;
  colorName: string;
  colorImage: string;
}

interface FinishesProps {
  finishName?: string
  productId?: string
}

const Finishes = ({ finishName, productId }: FinishesProps) => {
  const [allFinishes, setAllFinishes] = useState<Finish[]>([]);
  const [selectedFinish, setSelectedFinish] = useState<Finish | null>(null);
  const [relatedFinishes, setRelatedFinishes] = useState<Finish[]>([]);
  const [loading, setLoading] = useState(true);
  const [productInfo, setProductInfo] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [showDownloadForm, setShowDownloadForm] = useState(false);
  const [pendingDownload, setPendingDownload] = useState<{url: string, name: string, productId: string, productName: string} | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [downloadedImages, setDownloadedImages] = useState<Set<string>>(new Set());

  // API functions
  const getAllFinishes = async (): Promise<Finish[]> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/finishes`);

      if (!response.ok) {
        throw new Error('Failed to fetch finishes');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getFinishById = async (productId: string, colorName?: string): Promise<any> => {
    try {
      // The backend route expects both id and name parameters
      const nameParam = colorName || 'dummy';
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/finishes/${productId}/${nameParam}`);

      if (!response.ok) {
        throw new Error('Failed to fetch product finishes');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getFinishByName = async (finishName: string): Promise<Finish | null> => {
    try {
      const finishes = await getAllFinishes();
      const normalizedName = finishName.replace(/-/g, ' ').toLowerCase().trim();

      // Try exact match first
      let foundFinish = finishes.find(finish => {
        const finishNormalizedName = finish.colorName.replace(/\s+/g, ' ').toLowerCase().trim();
        return finishNormalizedName === normalizedName;
      });

      // If no exact match, try partial match
      if (!foundFinish) {
        const searchTerms = normalizedName.split(' ');
        foundFinish = finishes.find(finish => {
          const finishNormalizedName = finish.colorName.toLowerCase();
          return searchTerms.every(term => finishNormalizedName.includes(term));
        });
      }

      return foundFinish || null;
    } catch (error) {
      return null;
    }
  };

  const getRelatedFinishes = async (currentFinish: Finish): Promise<Finish[]> => {
    try {
      const finishes = await getAllFinishes();
      return finishes.filter(finish =>
        finish.productId !== currentFinish.productId &&
        finish.type === currentFinish.type
      ).slice(0, 3);
    } catch (error) {
      return [];
    }
  };

  const getRelatedProducts = async (currentProductId: string, finishTypes: string[]): Promise<any[]> => {
    try {
      const allFinishes = await getAllFinishes();
      
      // Get unique product IDs that have similar finish types
      const relatedProductIds = new Set();
      allFinishes.forEach(finish => {
        if (finish.productId !== currentProductId && finishTypes.includes(finish.type)) {
          relatedProductIds.add(finish.productId);
        }
      });
      
      // Group finishes by product for related products
      const relatedProducts: any[] = [];
      relatedProductIds.forEach(productId => {
        const productFinishes = allFinishes.filter(finish => finish.productId === productId);
        if (productFinishes.length > 0) {
          const uniqueFinishTypes = [...new Set(productFinishes.map(f => f.type))];
          const matchingTypes = uniqueFinishTypes.filter(type => finishTypes.includes(type));
          
          if (matchingTypes.length > 0) {
            relatedProducts.push({
              productId: productFinishes[0].productId,
              productName: productFinishes[0].productName,
              productSlug: productFinishes[0].productSlug,
              matchingFinishTypes: matchingTypes,
              finishes: productFinishes.slice(0, 8), // Limit to 8 finishes for display
              matchCount: matchingTypes.length
            });
          }
        }
      });
      
      // Sort by number of matching finish types (most matches first)
      return relatedProducts.sort((a, b) => b.matchCount - a.matchCount).slice(0, 3); // Show max 3 related products
    } catch (error) {
      console.error('Error getting related products:', error);
      return [];
    }
  };

  const handleDownload = async (url: string, name: string, productId: string, productName: string) => {
    // Check if already downloaded
    const email = localStorage.getItem('userEmail');
    if (email && downloadedImages.has(url)) {
      // Direct download if already submitted form
      await handleDirectDownload(url, name);
      return;
    }

    // Show form for first-time download
    setPendingDownload({ url, name, productId, productName });
    setShowDownloadForm(true);
  };

  const checkDownloadAccess = async (email: string, imageUrl: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/downloads/check-access?email=${encodeURIComponent(email)}&imageUrl=${encodeURIComponent(imageUrl)}`);
      const data = await response.json();
      return data.hasAccess;
    } catch (error) {
      console.error('Error checking download access:', error);
      return false;
    }
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
        
        // Add to downloaded images
        setDownloadedImages(prev => new Set([...prev, formData.imageUrl]));
        
        // Close form and download the image
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
      link.download = `${name}.jpg`;
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

  const handleQRCodeDownload = async (finish: Finish) => {
    try {
      // Get the QR code canvas element
      const qrCanvas = document.querySelector(`#qr-${finish.productId}-${finish.colorName.replace(/\s+/g, '-')} canvas`) as HTMLCanvasElement;
      
      if (qrCanvas) {
        // Convert canvas to blob and download
        qrCanvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `QR-${finish.colorName.replace(/\s+/g, '-')}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
          }
        });
      }
    } catch (error) {
      console.error('QR code download failed:', error);
    }
  };

  const generateQRCodeData = (finish: Finish): string => {
    // Create a simple data structure with just the essential IDs
    const qrData = {
      id: finish.productId,
      color: finish.colorName.replace(/\s+/g, '-').toLowerCase()
    };
    // Encode as URL-safe base64
    return btoa(JSON.stringify(qrData))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  };

  const getQRCodeUrl = (finish: Finish): string => {
    // Use environment variable or fallback to current window location
    const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || 
      (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');
    return `${baseUrl}/qr/${generateQRCodeData(finish)}`;
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        let finishes: Finish[] = [];
        
        // If productId is provided, try the new API first
        if (productId) {
          try {
            const productFinishes = await getFinishById(productId, finishName);
            if (productFinishes && productFinishes.finishes) {
              finishes = productFinishes.finishes;
              setProductInfo({
                name: productFinishes.productName,
                slug: productFinishes.productSlug,
                id: productFinishes.productId
              });
              
              // Get unique finish types from current product
              const uniqueFinishTypes = [...new Set(finishes.map(f => f.type))];
              
              // Fetch related products with similar finish types
              const related = await getRelatedProducts(productId, uniqueFinishTypes);
              setRelatedProducts(related);
            }
          } catch (error) {
            // If product-specific API fails, fall back to all finishes and filter
            console.log('Product-specific API failed, falling back to all finishes');
            const allFinishes = await getAllFinishes();
            finishes = allFinishes.filter(finish => finish.productId === productId);
            if (finishes.length > 0) {
              setProductInfo({
                name: finishes[0].productName,
                slug: finishes[0].productSlug,
                id: finishes[0].productId
              });
              
              // Get unique finish types from current product
              const uniqueFinishTypes = [...new Set(finishes.map(f => f.type))];
              
              // Fetch related products with similar finish types
              const related = await getRelatedProducts(productId, uniqueFinishTypes);
              setRelatedProducts(related);
            }
          }
        } else {
          // Otherwise, get all finishes
          finishes = await getAllFinishes();
          setProductInfo(null);
          setRelatedProducts([]);
        }
        
        setAllFinishes(finishes);
      } catch (error) {
        // Final fallback - try to get all finishes
        try {
          const allFinishes = await getAllFinishes();
          setAllFinishes(allFinishes);
        } catch (finalError) {
          console.log('All API attempts failed');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [finishName, productId]);

  // Generate display images from all finishes
  const displayImages = allFinishes.map(finish => ({
    src: finish.colorImage,
    name: finish.colorName
  }));

  // Group finishes by type
  const groupedFinishes = allFinishes.reduce((acc, finish) => {
    const type = finish.type || 'other';
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(finish);
    return acc;
  }, {} as Record<string, Finish[]>);

  if (loading) {
    return (
      <div className="w-full h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading finish data...</div>
      </div>
    );
  }

  // Always show all finishes grouped by type
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="text-center py-16 px-6">
        <h1 className="text-5xl font-gramatika text-gray-900 mb-6">
          {productInfo ? `${productInfo.name} - Finishes` : 'Metal Finishes'}
        </h1>
        <p className="max-w-3xl mx-auto text-gray-700 text-lg font-gramatika tracking-wide">
          {productInfo 
            ? `Explore the available finishes for ${productInfo.name}. Each finish is carefully crafted to provide exceptional quality and aesthetic appeal.`
            : 'Explore our complete collection of premium metal finishes. Each finish is carefully crafted to provide exceptional quality and aesthetic appeal for your design projects.'
          }
        </p>
        {productInfo && (
          <div className="mt-6">
            <Link 
              href={`/productview/${productInfo.slug}`}
              className="inline-block px-6 py-3 bg-gray-900 text-white font-gramatika rounded-lg hover:bg-gray-800 transition-colors"
            >
              Back to Product
            </Link>
          </div>
        )}
      </div>

      {/* Finishes Grid by Type */}
      <div className="px-6 md:px-16 pb-16">
        {Object.entries(groupedFinishes).map(([type, typeFinishes]) => (
          <div key={type} className="mb-16">
            <h2 className="text-3xl font-gramatika text-gray-800 mb-8 capitalize">
              {type} Finishes ({typeFinishes.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {typeFinishes.map((finish, index) => (
                <div key={`${finish.productId}-${finish.colorName}-${index}`} className="group">
                  <Link
                    href={`/finishes/${finish.colorName.replace(/\s+/g, '-')}`}
                    className="block"
                  >
                    <div className="w-full mb-4 aspect-square">
                      <Image
                        src={finish.colorImage}
                        alt={finish.colorName}
                        width={500}
                        height={500}
                        className="w-full h-full object-cover rounded-lg"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDownload(finish.colorImage, finish.colorName, finish.productId, finish.productName);
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-gramatika text-gray-900 group-hover:text-blue-600 transition-colors">
                          {finish.colorName}
                        </h3>
                        <GoDownload
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleDownload(finish.colorImage, finish.colorName, finish.productId, finish.productName);
                          }}
                          className="text-xl hover:scale-110 transition cursor-pointer text-gray-600 hover:text-black"
                        />
                      </div>
                      <p className="text-sm text-gray-600 font-gramatika">
                        {finish.productName}
                      </p>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        {finish.finishType}
                      </p>
                    </div>
                  </Link>
                  
                  {/* QR Code Section */}
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-center">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs text-gray-600 font-medium">Scan to Download</p>
                        <GoDownload
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleQRCodeDownload(finish);
                          }}
                          className="text-sm hover:scale-110 transition cursor-pointer text-gray-600 hover:text-black"
                          title="Download QR Code"
                        />
                      </div>
                      <div className="flex justify-center">
                        <Link href={`/qr/${generateQRCodeData(finish)}`} target="_blank">
                          <QRCodeComponent 
                            data={getQRCodeUrl(finish)}
                            size={100}
                            className="hover:opacity-80 transition-opacity cursor-pointer"
                            id={`qr-${finish.productId}-${finish.colorName.replace(/\s+/g, '-')}`}
                          />
                        </Link>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Scan QR code for instant download
                      </p>
                      {/* Debug: Show the URL (remove in production) */}
                      {/* <p className="text-xs text-gray-400 mt-1 break-all">
                        {getQRCodeUrl(finish)}
                      </p> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Related Products Section */}
      {productInfo && relatedProducts.length > 0 && (
        <div className="px-6 md:px-16 pb-16 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-gramatika text-gray-800 mb-12 text-center">
              Related Products with Similar Finishes
            </h2>
            <div className="space-y-16">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.productId} className="bg-white rounded-lg p-8 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-gramatika text-gray-900 mb-2">
                        {relatedProduct.productName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Matching finish types: {relatedProduct.matchingFinishTypes.join(', ')}
                      </p>
                    </div>
                    <Link
                      href={`/finishes/${relatedProduct.productId}/${relatedProduct.finishes[0]?.colorName.replace(/\s+/g, '-') || 'finish'}`}
                      className="px-6 py-3 bg-blue-600 text-white font-gramatika rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      View All Finishes
                    </Link>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                    {relatedProduct.finishes.map((finish: Finish, index: number) => (
                      <Link
                        href={`/finishes/${relatedProduct.productId}/${finish.colorName.replace(/\s+/g, '-')}`}
                        key={`${relatedProduct.productId}-${finish.colorName}-${index}`}
                        className="group cursor-pointer"
                      >
                        <div className="relative w-full aspect-square overflow-hidden rounded-lg border border-gray-200 hover:border-gray-400 transition-colors">
                          <Image
                            src={finish.colorImage}
                            alt={finish.colorName}
                            fill
                            sizes="12vw"
                            className="object-cover scale-[1.2] object-center"
                          />
                        </div>
                        <p className="mt-2 text-xs text-gray-600 hover:text-blue-600 transition-colors capitalize text-center leading-tight">
                          {finish.colorName}
                        </p>
                        <p className="text-xs text-gray-500 text-center">
                          {finish.type}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

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
    </div>
  );
}

export default Finishes