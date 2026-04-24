'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import DownloadForm from '@/components/ui/DownloadForm'
import { Loader2, AlertCircle, CheckCircle2, X } from 'lucide-react'

interface QRData {
  id: string
  color: string
}

interface FinishData {
  imageUrl: string
  imageName: string
  productId: string
  productName: string
  productSlug: string
  colorName: string
  finishType: string
}

export default function QRRedirectPage() {
  const params = useParams()
  const router = useRouter()
  const [data, setData] = useState<FinishData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showDownloadForm, setShowDownloadForm] = useState(false)
  const [notification, setNotification] = useState<{show: boolean; message: string; type: 'success' | 'error'}>({
    show: false,
    message: '',
    type: 'success'
  })

  const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Get the encoded data from the URL parameter
        const encodedData = params.data as string
        
        if (!encodedData) {
          throw new Error('No QR data provided')
        }

        // Decode the base64 data (handle URL-safe encoding)
        try {
          // Convert URL-safe base64 back to standard base64
          let standardBase64 = encodedData
            .replace(/-/g, '+')
            .replace(/_/g, '/');
          
          // Pad with proper padding if needed
          while (standardBase64.length % 4) {
            standardBase64 += '=';
          }
          
          const qrData: QRData = JSON.parse(atob(standardBase64))
          
          // Now fetch the finish details using the ID and color
          const response = await fetch(`${API_BASE}/api/products/finishes/${qrData.id}/${qrData.color}`)
          
          if (!response.ok) {
            throw new Error('Failed to fetch finish details')
          }
          
          const finishData = await response.json()
          
          if (finishData.finishes && finishData.finishes.length > 0) {
            // Find the specific finish by color name
            const finish = finishData.finishes.find((f: any) => 
              f.colorName.replace(/\s+/g, '-').toLowerCase() === qrData.color
            )
            
            if (finish) {
              setData({
                imageUrl: finish.colorImage,
                imageName: finish.colorName,
                productId: finishData.productId,
                productName: finishData.productName,
                productSlug: finishData.productSlug,
                colorName: finish.colorName,
                finishType: finish.type || 'unknown'
              })
            } else {
              throw new Error('Finish not found')
            }
          } else {
            throw new Error('No finishes found')
          }
          
        } catch (decodeError) {
          throw new Error('Failed to decode QR data or fetch finish details')
        }
        
        // Auto-show the download form after a short delay
        setTimeout(() => {
          setShowDownloadForm(true)
        }, 500)
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load QR data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params.data])

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ show: true, message, type })
    setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 3000)
  }

  const handleFormSubmit = async (formData: any) => {
    console.log('Form submitted with data:', formData)
    try {
      // Transform phone format if needed
      const submissionData = {
        ...formData,
        phone: {
          countryCode: formData.phone.includes('+') ? formData.phone.split(' ')[0] : '+91',
          number: formData.phone.includes('+') ? formData.phone.split(' ').slice(1).join(' ') : formData.phone
        }
      }
      
      console.log('Sending data:', submissionData)
      
      const response = await fetch(`${API_BASE}/api/downloads/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      })

      console.log('Response status:', response.status)
      const result = await response.json()
      console.log('Response result:', result)
      
      if (response.ok) {
        // Store email in localStorage for future downloads
        localStorage.setItem('userEmail', formData.email)
        
        showNotification('Download started successfully!', 'success')
        setShowDownloadForm(false)
        
        // Trigger automatic download
        if (data?.imageUrl) {
          try {
            // Method 1: Fetch with no-cors mode and force download
            const downloadImage = async () => {
              try {
                const response = await fetch(data.imageUrl, {
                  method: 'GET',
                  mode: 'no-cors',
                  cache: 'no-cache'
                });
                
                // If no-cors, we can't read response, so trigger direct download
                const link = document.createElement('a');
                link.href = data.imageUrl;
                link.download = `${data.imageName.replace(/\s+/g, '_')}.jpg`;
                link.style.display = 'none';
                document.body.appendChild(link);
                link.click();
                setTimeout(() => document.body.removeChild(link), 100);
                
              } catch (fetchError) {
                // Fallback to iframe approach
                const iframe = document.createElement('iframe');
                iframe.style.display = 'none';
                iframe.src = data.imageUrl;
                document.body.appendChild(iframe);
                
                // Remove iframe after download attempt
                setTimeout(() => {
                  if (iframe.parentNode) {
                    iframe.parentNode.removeChild(iframe);
                  }
                }, 3000);
              }
            };
            
            await downloadImage();
            showNotification('Download started successfully!', 'success');
          } catch (downloadError) {
            console.error('Download error:', downloadError);
            
            // Method 2: Direct window.location approach
            try {
              const tempWindow = window.open(data.imageUrl, '_blank');
              if (tempWindow) {
                tempWindow.focus();
                // Close after 2 seconds to trigger download
                setTimeout(() => tempWindow.close(), 2000);
              }
              showNotification('Image opened in new tab. Right-click to save.', 'success');
            } catch (fallbackError) {
              console.error('Fallback download error:', fallbackError);
              
              // Method 3: Copy to clipboard with notification
              try {
                await navigator.clipboard.writeText(data.imageUrl);
                showNotification('Image URL copied to clipboard. Please paste in browser to download.', 'success');
              } catch (clipboardError) {
                console.error('Clipboard error:', clipboardError);
                showNotification('Please manually copy the URL to download.', 'success');
              }
            }
          }
        }
        
        // Redirect to finishes page after successful download
        setTimeout(() => {
          router.push('/finishes')
        }, 4000)
      } else {
        showNotification(result.message || 'Failed to submit form', 'error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      showNotification('An error occurred. Please try again.', 'error')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin text-blue-600 mx-auto mb-4" size={48} />
          <p className="text-gray-600">Loading finish details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="text-red-500 mx-auto mb-4" size={48} />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push('/finishes')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Finishes
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg animate-slide-in ${
          notification.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
        }`}>
          {notification.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span className="text-sm font-medium">{notification.message}</span>
          <button onClick={() => setNotification({ show: false, message: '', type: 'success' })}>
            <X size={16} className="ml-2 hover:opacity-70" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Download Finish</h1>
              {data && (
                <p className="text-gray-600 mt-1">
                  {data.productName} - {data.colorName}
                </p>
              )}
            </div>
            <button
              onClick={() => router.push('/finishes')}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {data && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Image Preview */}
              <div>
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={data.imageUrl}
                    alt={data.colorName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-900">{data.colorName}</h3>
                  <p className="text-sm text-gray-600">{data.productName}</p>
                  <p className="text-xs text-gray-500 mt-1">{data.finishType}</p>
                </div>
              </div>

              {/* Form Section */}
              <div>
                {showDownloadForm ? (
                  <DownloadForm
                    isOpen={showDownloadForm}
                    onClose={() => router.push('/finishes')}
                    onSubmit={handleFormSubmit}
                    imageUrl={data.imageUrl}
                    imageName={data.imageName}
                    productId={data.productId}
                    productName={data.productName}
                    loading={false}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Loader2 className="animate-spin text-blue-600" size={32} />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
