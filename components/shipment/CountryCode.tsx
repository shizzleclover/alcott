'use client'

interface CountryCodeProps {
  country?: 'NG' | 'US' | string
  flagColor?: string
}

export function CountryCode({ country = 'NG', flagColor = 'bg-green-500' }: CountryCodeProps) {
  const dialCode = country === 'NG' ? '234' : country === 'US' ? '1' : ''

  return (
    <div className="flex items-center gap-2">
      <span className={`w-6 h-4 rounded ${flagColor}`} />
      <span className="text-xs font-semibold text-gray-600">+{dialCode}</span>
    </div>
  )
}

