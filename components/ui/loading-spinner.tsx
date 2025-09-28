import React from 'react'
import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  color?: 'primary' | 'white' | 'gray'
}

export function LoadingSpinner({ 
  size = 'md', 
  className, 
  color = 'primary' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  const colorClasses = {
    primary: 'text-[#4043FF]',
    white: 'text-white',
    gray: 'text-gray-500'
  }

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div className={cn(
        'animate-spin rounded-full border-2 border-solid border-current border-r-transparent',
        sizeClasses[size],
        colorClasses[color]
      )}>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

// Dots Loading Spinner (like in your success screen)
interface DotsSpinnerProps {
  className?: string
  color?: 'primary' | 'white' | 'gray'
}

export function DotsSpinner({ className, color = 'primary' }: DotsSpinnerProps) {
  const colorClasses = {
    primary: 'bg-[#4043FF]',
    white: 'bg-white',
    gray: 'bg-gray-500'
  }

  return (
    <div className={cn('flex space-x-1', className)}>
      <div className={cn(
        'w-2 h-2 rounded-full animate-pulse',
        colorClasses[color]
      )} style={{ animationDelay: '0ms' }}></div>
      <div className={cn(
        'w-2 h-2 rounded-full animate-pulse',
        colorClasses[color]
      )} style={{ animationDelay: '150ms' }}></div>
      <div className={cn(
        'w-2 h-2 rounded-full animate-pulse',
        colorClasses[color]
      )} style={{ animationDelay: '300ms' }}></div>
    </div>
  )
}
