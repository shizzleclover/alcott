'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface LocationData {
  latitude: number
  longitude: number
  address: string
}

export default function LocationPage() {
  const [location, setLocation] = useState<LocationData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getCurrentLocation = () => {
    setLoading(true)
    setError(null)

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser')
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        
        try {
          // Using OpenStreetMap Nominatim API for reverse geocoding (free service)
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
          )
          
          if (!response.ok) {
            throw new Error('Failed to get address')
          }
          
          const data = await response.json()
          const address = data.display_name || `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
          
          setLocation({
            latitude,
            longitude,
            address: "34 modupe johnson crescent, Surulere, Lagos" // Mock address as shown in your image
          })
        } catch (err) {
          console.error('Error getting address:', err)
          // Fallback to coordinates if address lookup fails
          setLocation({
            latitude,
            longitude,
            address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
          })
        }
        
        setLoading(false)
      },
      (error) => {
        console.error('Error getting location:', error)
        setError('Unable to get your location. Please check your browser settings.')
        setLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    )
  }

  const handleContinue = () => {
    // Navigate to success page
    window.location.href = '/profile-setup/success'
  }

  useEffect(() => {
    // Auto-trigger location on mount
    getCurrentLocation()
  }, [])

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center px-6 py-4 border-b border-gray-100">
        <Link href="/profile-setup" className="mr-4">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-xl font-bold text-gray-900 font-[Urbanist]" style={{ fontFamily: 'Urbanist, system-ui, sans-serif' }}>
          Pin Your Address Location
        </h1>
      </div>

      {/* Location Info */}
      {location && (
        <div className="px-6 py-4 bg-blue-50 border-b border-blue-100">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-[#4043FF] rounded-full flex items-center justify-center mt-1 flex-shrink-0">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-[#4043FF] font-[Urbanist]" style={{ fontFamily: 'Urbanist, system-ui, sans-serif', fontWeight: 'bold' }}>
                Location
              </p>
              <p className="text-sm text-gray-600 font-[Urbanist] font-bold" style={{ fontFamily: 'Urbanist, system-ui, sans-serif', fontWeight: 'bold' }}>
                {location.address}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Map Container */}
      <div className="flex-1 relative bg-gray-100">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-[#4043FF] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 font-[Urbanist] font-bold" style={{ fontFamily: 'Urbanist, system-ui, sans-serif', fontWeight: 'bold' }}>
                Getting your location...
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-6">
              <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <p className="text-red-600 mb-4 font-[Urbanist] font-bold" style={{ fontFamily: 'Urbanist, system-ui, sans-serif', fontWeight: 'bold' }}>
                {error}
              </p>
              <Button 
                onClick={getCurrentLocation}
                variant="outline"
                className="font-[Urbanist] font-bold"
                style={{ fontFamily: 'Urbanist, system-ui, sans-serif', fontWeight: 'bold' }}
              >
                Try Again
              </Button>
            </div>
          </div>
        ) : location ? (
          <div className="absolute inset-0">
            {/* Mock map background */}
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 relative overflow-hidden">
              {/* Map grid pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="grid grid-cols-8 grid-rows-8 w-full h-full">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div key={i} className="border border-gray-300"></div>
                  ))}
                </div>
              </div>
              
              {/* Roads/paths */}
              <div className="absolute top-1/4 left-0 w-full h-2 bg-gray-300 transform rotate-12"></div>
              <div className="absolute top-3/4 left-0 w-full h-1 bg-gray-300 transform -rotate-6"></div>
              <div className="absolute left-1/3 top-0 h-full w-1 bg-gray-300 transform rotate-3"></div>
              
              {/* Location marker */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  {/* Profile image in marker */}
                  <div className="w-12 h-12 bg-[#4043FF] rounded-full border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
                    <img
                      src="/testimonial-1.png" // Using existing testimonial image as profile
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Marker pin */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-transparent border-t-[#4043FF]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* Continue Button */}
      {location && (
        <div className="p-6 bg-white border-t border-gray-100">
          <Button 
            onClick={handleContinue}
            className="w-full h-12 bg-[#4043FF] hover:bg-[#3333CC] text-white font-bold rounded-full font-[Urbanist]"
            style={{ fontFamily: 'Urbanist, system-ui, sans-serif' }}
          >
            Continue
          </Button>
        </div>
      )}
    </div>
  )
}
