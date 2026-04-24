'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { GoDownload } from "react-icons/go";
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Footer } from '../ui/Footer';
import { DownloadForm } from '../ui/DownloadForm';
import { QRCodeComponent } from '../ui/QRCode';

interface Finish {
  productId: string;
  productName: string;
  productSlug: string;
  finishType: string;
  type: string;
  colorName: string;
  colorImage: string;
}

interface SingleFinishProps {
  productId: string;
  colorName: string;
}

const SingleFinish = ({ productId, colorName }: SingleFinishProps) => {
  const [finish, setFinish] = useState<Finish | null>(null);
  const [relatedFinishes, setRelatedFinishes] = useState<Finish[]>([]);
  const [loading, setLoading] = useState(true);
  const [productInfo, setProductInfo] = useState<any>(null);
  const [showDownloadForm, setShowDownloadForm] = useState(false);
  const [pendingDownload, setPendingDownload] = useState<{url: string, name: string, productId: string, productName: string} | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [downloadedImages, setDownloadedImages] = useState<Set<string>>(new Set());

  // API functions
  const getFinishById = async (productId: string, colorName?: string): Promise<any> => {
    try {
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

  const getRelatedFinishes = async (currentFinish: Finish): Promise<Finish[]> => {
    try {
      const finishes = await getAllFinishes();
      return finishes.filter(finish =>
        finish.productId !== currentFinish.productId &&
        finish.type === currentFinish.type
      ).slice(0, 8);
    } catch (error) {
      return [];
    }
  };

  const handleDownload = async (url: string, name: string, productId: string, productName: string) => {
    const email = localStorage.getItem('userEmail');
    if (email && downloadedImages.has(url)) {
      await handleDirectDownload(url, name);
      return;
    }

    setPendingDownload({ url, name, productId, productName });
    setShowDownloadForm(true);
  };

  const handleFormSubmit = async (formData: any) => {
    setFormLoading(true);
    try {
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
        localStorage.setItem('userEmail', formData.email);
        setDownloadedImages(prev => new Set([...prev, formData.imageUrl]));
        setShowDownloadForm(false);
        
        if (pendingDownload) {
          try {
            // Auto-download the image
            const downloadImage = async () => {
              try {
                // Method 1: Force download using window.location with download attribute
                const forceDownload = () => {
                  const link = document.createElement('a');
                  link.href = pendingDownload.url;
                  link.download = `${pendingDownload.name.replace(/\s+/g, '_')}.jpg`;
                  link.target = '_blank';
                  link.rel = 'noopener noreferrer';
                  link.style.display = 'none';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  console.log('Download attempted via force download method');
                };

                // Method 2: Use data URL approach for CORS images
                const tryDataUrlDownload = async () => {
                  try {
                    // Add timestamp to prevent caching issues
                    const urlWithTimestamp = pendingDownload.url.includes('?') ? 
                      `${pendingDownload.url}&t=${Date.now()}` : 
                      `${pendingDownload.url}?t=${Date.now()}`;
                    
                    // Create a new image element to load the image
                    const img = document.createElement('img') as HTMLImageElement;
                    img.crossOrigin = 'anonymous'; // Try to load with CORS
                    
                    return new Promise<boolean>((resolve, reject) => {
                      img.onload = () => {
                        try {
                          // Create canvas to convert image to blob
                          const canvas = document.createElement('canvas') as HTMLCanvasElement;
                          canvas.width = img.naturalWidth;
                          canvas.height = img.naturalHeight;
                          const ctx = canvas.getContext('2d');
                          if (!ctx) {
                            reject(new Error('Canvas context failed'));
                            return;
                          }
                          ctx.drawImage(img, 0, 0);
                          
                          // Convert to blob and download
                          canvas.toBlob((blob) => {
                            if (blob) {
                              const blobUrl = window.URL.createObjectURL(blob);
                              const link = document.createElement('a');
                              link.href = blobUrl;
                              link.download = `${pendingDownload.name.replace(/\s+/g, '_')}.jpg`;
                              link.style.display = 'none';
                              document.body.appendChild(link);
                              link.click();
                              document.body.removeChild(link);
                              
                              // Clean up
                              setTimeout(() => window.URL.revokeObjectURL(blobUrl), 100);
                              console.log('Download successful via canvas method');
                              resolve(true);
                            } else {
                              reject(new Error('Canvas to blob failed'));
                            }
                          }, 'image/jpeg', 0.9);
                        } catch (canvasError) {
                          reject(canvasError);
                        }
                      };
                      
                      img.onerror = () => reject(new Error('Image load failed'));
                      img.src = urlWithTimestamp;
                    });
                  } catch (error) {
                    console.log('Canvas method failed:', error);
                    throw error;
                  }
                };

                // Try canvas method first (works for many CORS images)
                try {
                  await tryDataUrlDownload();
                  return;
                } catch (canvasError) {
                  console.log('Canvas method failed, trying force download');
                }

                // Fallback to force download method
                forceDownload();
                
                // Additional fallback: Try to open in new tab with download prompt
                setTimeout(() => {
                  const downloadWindow = window.open(pendingDownload.url, '_blank');
                  if (downloadWindow) {
                    downloadWindow.focus();
                    // Try to trigger download in the new window
                    setTimeout(() => {
                      downloadWindow.document.title = `Download: ${pendingDownload.name}`;
                      const downloadLink = downloadWindow.document.createElement('a');
                      downloadLink.href = pendingDownload.url;
                      downloadLink.download = `${pendingDownload.name.replace(/\s+/g, '_')}.jpg`;
                      downloadLink.textContent = 'If download doesn\'t start, click here';
                      downloadLink.style.display = 'block';
                      downloadLink.style.margin = '20px';
                      downloadLink.style.padding = '10px';
                      downloadLink.style.backgroundColor = '#007bff';
                      downloadLink.style.color = 'white';
                      downloadLink.style.textDecoration = 'none';
                      downloadLink.style.borderRadius = '5px';
                      downloadWindow.document.body.appendChild(downloadLink);
                    }, 1000);
                  }
                }, 1000);
                
              } catch (fetchError) {
                console.error('Download error:', fetchError);
                
                // Method 3: Fallback to iframe approach
                const iframe = document.createElement('iframe');
                iframe.style.display = 'none';
                iframe.src = pendingDownload.url;
                document.body.appendChild(iframe);
                
                // Remove iframe after download attempt
                setTimeout(() => {
                  if (iframe.parentNode) {
                    iframe.parentNode.removeChild(iframe);
                  }
                }, 3000);
              }
            };
            
            // Open image in new tab
            const openImageInNewTab = () => {
              const newTab = window.open(pendingDownload.url, '_blank');
              if (newTab) {
                newTab.focus();
              }
            };
            
            // Execute both actions
            await downloadImage();
            openImageInNewTab();
            
          } catch (downloadError) {
            console.error('Download error:', downloadError);
            
            // Method 2: Direct window.location approach
            try {
              const tempWindow = window.open(pendingDownload.url, '_blank');
              if (tempWindow) {
                tempWindow.focus();
                // Close after 2 seconds to trigger download
                setTimeout(() => tempWindow.close(), 2000);
              }
            } catch (fallbackError) {
              console.error('Fallback download error:', fallbackError);
              
              // Method 3: Copy to clipboard with notification
              try {
                await navigator.clipboard.writeText(pendingDownload.url);
                alert('Image URL copied to clipboard. Please paste in browser to download.');
              } catch (clipboardError) {
                console.error('Clipboard error:', clipboardError);
                prompt('Copy this URL to download:', pendingDownload.url);
              }
            }
          }
        }
        
        setPendingDownload(null);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDirectDownload = async (url: string, name: string) => {
    try {
      const link = document.createElement('a');
      link.href = url;
      link.download = `${name}.jpg`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setTimeout(() => {
        window.open(url, '_blank');
      }, 1000);
    } catch (err) {
      console.error('Download failed:', err);
      window.open(url, '_blank');
    }
  };

  const handleQRCodeDownload = async (finish: Finish) => {
    try {
      const qrCanvas = document.querySelector(`#qr-${finish.productId}-${finish.colorName.replace(/\s+/g, '-')} canvas`) as HTMLCanvasElement;
      
      if (qrCanvas) {
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
    const qrData = {
      id: finish.productId,
      color: finish.colorName.replace(/\s+/g, '-').toLowerCase()
    };
    return btoa(JSON.stringify(qrData))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  };

  const getQRCodeUrl = (finish: Finish): string => {
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
        setLoading(true);
        
        // Get product finishes
        const productData = await getFinishById(productId, colorName);
        
        if (productData && productData.finishes) {
          setProductInfo({
            name: productData.productName,
            slug: productData.productSlug,
            id: productData.productId
          });

          // Find the specific finish by colorName
          const normalizedName = colorName.replace(/-/g, ' ').toLowerCase().trim();
          const specificFinish = productData.finishes.find((f: Finish) => {
            const finishNormalizedName = f.colorName.replace(/\s+/g, ' ').toLowerCase().trim();
            return finishNormalizedName === normalizedName;
          });

          if (specificFinish) {
            setFinish(specificFinish);
            
            // Get related finishes
            const related = await getRelatedFinishes(specificFinish);
            setRelatedFinishes(related);
          }
        }
      } catch (error) {
        console.error('Error fetching finish:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId, colorName]);

  if (loading) {
    return (
      <div className="w-full h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading finish...</div>
      </div>
    );
  }

  if (!finish) {
    return (
      <div className="w-full h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-gramatika text-gray-900 mb-4">Finish not found</h1>
          <Link 
            href="/finishes"
            className="inline-block px-6 py-3 bg-gray-900 text-white font-gramatika rounded-lg hover:bg-gray-800 transition-colors"
          >
            Back to All Finishes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-6 md:px-16 py-12">
        <div className="max-w-7xl mx-auto">
          <Link 
            href={productInfo ? `/productview/${productInfo.slug}` : '/finishes'}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to {productInfo ? productInfo.name : 'All Finishes'}
          </Link>

          <div className="text-center">
            <h1 className="text-5xl font-gramatika text-gray-900 mb-4">
              {finish.colorName}
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              {finish.productName}
            </p>
            <p className="text-lg text-gray-500 capitalize">
              {finish.type} Finish
            </p>
          </div>
        </div>
      </div>

      {/* Main Finish Image */}
      <div className="px-6 md:px-16 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="relative mb-8 rounded-lg overflow-hidden shadow-lg w-full max-w-2xl mx-auto">
            <div className="relative w-full aspect-[2/3]">
              <Image
                src={finish.colorImage}
                alt={finish.colorName}
                fill
                sizes="100vw"
                className="w-full h-full object-cover"
                priority
                unoptimized
              />
            </div>
          </div>

          {/* Download Section */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => handleDownload(finish.colorImage, finish.colorName, finish.productId, finish.productName)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-gramatika rounded-lg hover:bg-gray-800 transition-colors"
            >
              <GoDownload className="w-5 h-5" />
              Download Image
            </button>
            
            <Link
              href={`/qr/${generateQRCodeData(finish)}`}
              target="_blank"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-gramatika rounded-lg hover:bg-blue-700 transition-colors"
            >
              View QR Code
            </Link>
          </div>

          {/* QR Code Section */}
          <div className="bg-gray-50 rounded-lg p-8 mb-12">
            <h3 className="text-xl font-gramatika text-gray-900 mb-6 text-center">Scan to Download</h3>
            <div className="flex flex-col items-center gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <QRCodeComponent 
                  data={getQRCodeUrl(finish)}
                  size={200}
                  id={`qr-${finish.productId}-${finish.colorName.replace(/\s+/g, '-')}`}
                />
              </div>
              <button
                onClick={() => handleQRCodeDownload(finish)}
                className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <GoDownload className="w-4 h-4" />
                Download QR Code
              </button>
            </div>
          </div>

          {/* Related Finishes */}
          {relatedFinishes.length > 0 && (
            <div>
              <h3 className="text-2xl font-gramatika text-gray-900 mb-8 text-center">
                Related {finish.type} Finishes
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {relatedFinishes.map((relatedFinish, index) => (
                  <Link
                    key={`${relatedFinish.productId}-${relatedFinish.colorName}-${index}`}
                    href={`/productview/${relatedFinish.productSlug}`}
                    className="group cursor-pointer"
                  >
                    <div className="relative w-full aspect-[2/3] overflow-hidden rounded-lg border border-gray-200 hover:border-gray-400 transition-colors mb-3">
                      <Image
                        src={relatedFinish.colorImage}
                        alt={relatedFinish.colorName}
                        fill
                        sizes="25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h4 className="text-sm font-gramatika text-gray-900 group-hover:text-blue-600 transition-colors text-center">
                      {relatedFinish.colorName}
                    </h4>
                    <p className="text-xs text-gray-600 text-center">
                      {relatedFinish.productName}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
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
    </div>
  );
}

export default SingleFinish;
