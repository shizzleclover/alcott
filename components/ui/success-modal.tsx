'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  message: string
  buttonText?: string
  icon?: React.ReactNode
}

export function SuccessModal({ 
  isOpen, 
  onClose, 
  title, 
  message, 
  buttonText = "OK",
  icon 
}: SuccessModalProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    }
  }, [isOpen])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isVisible ? 'bg-opacity-50' : 'bg-opacity-0'
        }`}
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className={`relative bg-white rounded-2xl p-8 max-w-md w-full mx-4 transform transition-all duration-300 ${
        isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}>
        {/* Success Animation */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            {/* Decorative dots */}
            <div className="absolute -top-4 -left-4 w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
            <div className="absolute -top-2 -right-6 w-2 h-2 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute -bottom-4 -left-6 w-2 h-2 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute -bottom-2 -right-4 w-3 h-3 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute top-2 -left-8 w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-6 -right-8 w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '2.5s' }}></div>
            <div className="absolute -bottom-6 right-2 w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
            
            {/* Main icon circle */}
            <div className="w-20 h-20 bg-[#4043FF] rounded-full flex items-center justify-center relative">
              {icon || (
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                </svg>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2 font-[Urbanist]" style={{ fontFamily: 'Urbanist, system-ui, sans-serif' }}>
            {title}
          </h2>
          <p className="text-gray-600 mb-8 font-[Urbanist]" style={{ fontFamily: 'Urbanist, system-ui, sans-serif' }}>
            {message}
          </p>
          
          <Button 
            onClick={handleClose}
            className="bg-[#4043FF] hover:bg-[#3333CC] text-white px-8 py-3 rounded-full w-full font-[Urbanist]"
            style={{ fontFamily: 'Urbanist, system-ui, sans-serif' }}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  )
}
