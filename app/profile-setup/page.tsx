'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ImagePicker } from '@/components/ui/image-picker'
import Link from 'next/link'

export default function ProfileSetupPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    phoneNumber: '',
    gender: '',
    address: '',
    profileImage: null as File | null
  })

  const [step, setStep] = useState(1) // 1 = empty form, 2 = filled form

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleImageSelect = (file: File, previewUrl: string) => {
    setFormData(prev => ({
      ...prev,
      profileImage: file
    }))
  }

  const fillMockData = () => {
    setFormData({
      firstName: 'Olusegun',
      lastName: 'Matanmi',
      dateOfBirth: '1992-11-13',
      email: 'info@alcott.com.ng',
      phoneNumber: '+234 111 467 378 399',
      gender: 'Male',
      address: 'Address',
      profileImage: null
    })
    setStep(2)
  }

  const handleContinue = () => {
    // Navigate to location page
    window.location.href = '/profile-setup/location'
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center px-6 py-4 border-b border-gray-100">
        <Link href="/auth/register" className="mr-4">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-xl font-bold text-gray-900 font-[Urbanist]" style={{ fontFamily: 'Urbanist, system-ui, sans-serif' }}>
          Fill Your Profile
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Side - Form (60% width) */}
        <div className="w-3/5 p-6">
          <div className="space-y-6 max-w-sm">
            {/* First Name */}
            <div>
              <Input
                type="text"
                placeholder="First name"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="w-full h-12 px-4 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-[#4043FF] focus:border-transparent font-[Urbanist] font-bold placeholder:font-bold"
                style={{ fontFamily: 'Urbanist, system-ui, sans-serif', fontWeight: 'bold' }}
              />
            </div>

            {/* Last Name */}
            <div>
              <Input
                type="text"
                placeholder="Last name"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="w-full h-12 px-4 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-[#4043FF] focus:border-transparent font-[Urbanist] font-bold placeholder:font-bold"
                style={{ fontFamily: 'Urbanist, system-ui, sans-serif', fontWeight: 'bold' }}
              />
            </div>

            {/* Date of Birth */}
            <div className="relative">
              <Input
                type="date"
                placeholder="Date of Birth"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                className="w-full h-12 px-4 pr-12 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-[#4043FF] focus:border-transparent font-[Urbanist] font-bold placeholder:font-bold"
                style={{ fontFamily: 'Urbanist, system-ui, sans-serif', fontWeight: 'bold' }}
              />
              <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>

            {/* Email */}
            <div className="relative">
              <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full h-12 px-4 pr-12 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-[#4043FF] focus:border-transparent font-[Urbanist] font-bold placeholder:font-bold"
                style={{ fontFamily: 'Urbanist, system-ui, sans-serif', fontWeight: 'bold' }}
              />
              <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>

            {/* Phone Number */}
            <div className="relative">
              <div className="flex">
                <div className="flex items-center px-3 border border-r-0 border-gray-200 rounded-l-lg bg-gray-50">
                  <div className="w-6 h-4 bg-green-500 mr-2"></div>
                  <span className="text-gray-600 font-[Urbanist] font-bold" style={{ fontFamily: 'Urbanist, system-ui, sans-serif', fontWeight: 'bold' }}>NG</span>
                </div>
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  className="flex-1 h-12 px-4 border border-gray-200 rounded-r-lg rounded-l-none text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-[#4043FF] focus:border-transparent font-[Urbanist] font-bold placeholder:font-bold"
                  style={{ fontFamily: 'Urbanist, system-ui, sans-serif', fontWeight: 'bold' }}
                />
              </div>
            </div>

            {/* Gender */}
            <div className="relative">
              <select
                value={formData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className="w-full h-12 px-4 pr-12 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-[#4043FF] focus:border-transparent appearance-none bg-white font-[Urbanist] font-bold"
                style={{ fontFamily: 'Urbanist, system-ui, sans-serif', fontWeight: 'bold' }}
              >
                <option value="" className="text-gray-500 font-bold">Gender</option>
                <option value="Male" className="font-bold">Male</option>
                <option value="Female" className="font-bold">Female</option>
                <option value="Other" className="font-bold">Other</option>
              </select>
              <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Address */}
            <div className="relative">
              <select
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="w-full h-12 px-4 pr-12 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-[#4043FF] focus:border-transparent appearance-none bg-white font-[Urbanist] font-bold"
                style={{ fontFamily: 'Urbanist, system-ui, sans-serif', fontWeight: 'bold' }}
              >
                <option value="" className="text-gray-500 font-bold">Address</option>
                <option value="Lagos, Nigeria" className="font-bold">Lagos, Nigeria</option>
                <option value="Abuja, Nigeria" className="font-bold">Abuja, Nigeria</option>
                <option value="Port Harcourt, Nigeria" className="font-bold">Port Harcourt, Nigeria</option>
              </select>
              <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Continue Button */}
            <div className="mt-8">
              <Button 
                onClick={step === 1 ? fillMockData : handleContinue}
                className="w-full h-12 bg-[#4043FF] hover:bg-[#3333CC] text-white font-bold rounded-full font-[Urbanist] max-w-sm"
                style={{ fontFamily: 'Urbanist, system-ui, sans-serif' }}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>

        {/* Right Side - Profile Image (40% width) */}
        <div className="w-2/5 flex items-center justify-center p-6">
          <ImagePicker 
            onImageSelect={handleImageSelect}
            className=""
          />
        </div>
      </div>
    </div>
  )
}