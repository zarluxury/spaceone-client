'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NotFound() {
  const router = useRouter()

  useEffect(() => {
    // Auto-redirect after 10 seconds
    const timer = setTimeout(() => {
      router.push('/')
    }, 10000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        {/* 404 Animation/Graphic */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300 mb-4">404</h1>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
        </div>

        {/* Error Message */}
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Oops! Page Not Found
        </h2>
        
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for seems to have vanished into the digital void. 
          Don't worry, even the best explorers get lost sometimes.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link 
            href="/"
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Go Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="px-8 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all duration-300 transform hover:scale-105"
          >
            Go Back
          </button>
        </div>

        {/* Auto-redirect Message */}
        <div className="text-sm text-gray-500">
          <p>You'll be automatically redirected to the homepage in <span className="font-semibold">10 seconds</span>.</p>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-4">Looking for something specific?</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/products" className="text-blue-500 hover:text-blue-700 underline text-sm">
              Products
            </Link>
            <Link href="/about-us" className="text-blue-500 hover:text-blue-700 underline text-sm">
              About Us
            </Link>
            <Link href="/contact-us" className="text-blue-500 hover:text-blue-700 underline text-sm">
              Contact
            </Link>
            <Link href="/downloads" className="text-blue-500 hover:text-blue-700 underline text-sm">
              Downloads
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
