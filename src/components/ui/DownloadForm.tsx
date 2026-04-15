'use client'
import React, { useState } from 'react'
import { X, Download, User, Mail, Phone, Briefcase } from 'lucide-react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

interface DownloadFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (formData: FormData) => void
  imageUrl: string
  imageName: string
  productId: string
  productName: string
  loading?: boolean
}

interface FormData {
  name: string
  email: string
  phone: string
  profile: string
  otherProfile: string
  imageUrl: string
  imageName: string
  productId: string
  productName: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  profile?: string
  otherProfile?: string
}

const profileOptions = [
  { value: 'architect', label: 'Architect' },
  { value: 'interior designer', label: 'Interior Designer' },
  { value: 'builder developer', label: 'Builder/Developer' },
  { value: 'other', label: 'Other' },
]

export const DownloadForm: React.FC<DownloadFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  imageUrl,
  imageName,
  productId,
  productName,
  loading = false
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    profile: '',
    otherProfile: '',
    imageUrl,
    imageName,
    productId,
    productName
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\+?\d{10,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Invalid phone number'
    }

    if (!formData.profile) {
      newErrors.profile = 'Profile is required'
    }

    if (formData.profile === 'other' && !formData.otherProfile.trim()) {
      newErrors.otherProfile = 'Please specify your profile'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing (only for fields that have validation)
    if (field in errors && errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handlePhoneChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      phone: value
    }))
    // Clear error when user starts typing
    if (errors.phone) {
      setErrors(prev => ({
        ...prev,
        phone: undefined
      }))
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Download className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Download Image</h2>
              <p className="text-sm text-gray-500">Fill in your details to download</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4" />
              Full Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4" />
              Email Address *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="w-full">
  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
    <Phone className="w-4 h-4" />
    Phone Number *
  </label>

  <PhoneInput
    country={'in'}
    enableSearch={true}
    value={formData.phone}
    onChange={(phone: string) => handlePhoneChange(phone)}
    placeholder="Enter phone number"

    containerClass="w-full"

    inputClass={`!w-full !h-11 !pl-14 !pr-4 !text-sm !border !rounded-lg !focus:outline-none !focus:ring-2 !focus:ring-blue-500 ${
      errors.phone ? '!border-red-500' : '!border-gray-300'
    }`}

    buttonClass="!border-gray-300 !rounded-l-lg !bg-gray-50"

    dropdownClass="!bg-white !border !border-gray-300 !rounded-lg !shadow-lg"
  />

  {errors.phone && (
    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
  )}
</div>

          {/* Profile */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Briefcase className="w-4 h-4" />
              Profile *
            </label>
            <select
              value={formData.profile}
              onChange={(e) => handleInputChange('profile', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.profile ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select your profile</option>
              {profileOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            {errors.profile && (
              <p className="mt-1 text-sm text-red-600">{errors.profile}</p>
            )}
          </div>

          {/* Other Profile */}
          {formData.profile === 'other' && (
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Please specify your profile *
              </label>
              <input
                type="text"
                value={formData.otherProfile}
                onChange={(e) => handleInputChange('otherProfile', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.otherProfile ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your profile"
              />
              {errors.otherProfile && (
                <p className="mt-1 text-sm text-red-600">{errors.otherProfile}</p>
              )}
            </div>
          )}

          {/* Image Info */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Image to download:</p>
            <p className="font-medium text-gray-900">{imageName}</p>
            <p className="text-xs text-gray-500">From: {productName}</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Download
              </>
            )}
          </button>

          {/* Privacy Note */}
          <p className="text-xs text-gray-500 text-center">
            By submitting this form, you agree to our privacy policy and terms of service.
          </p>
        </form>
      </div>
    </div>
  )
}

export default DownloadForm
