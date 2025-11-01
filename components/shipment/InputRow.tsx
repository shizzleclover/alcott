'use client'

import type { ReactNode } from 'react'
import { Input } from '@/components/ui/input'

interface InputRowProps {
  label: string
  placeholder: string
  value: string
  onChange: (text: string) => void
  type?: string
  prefix?: ReactNode
  suffix?: ReactNode
}

export function InputRow({ label, placeholder, value, onChange, type = 'text', prefix, suffix }: InputRowProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 focus-within:bg-white transition-colors">
        {prefix && (
          <div className="pl-3 pr-3 flex items-center gap-2 text-sm text-gray-500 border-r border-gray-200">{/* Divider between prefix & input */}
            {prefix}
          </div>
        )}
        <Input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="h-12 border-0 bg-transparent focus:ring-0 focus-visible:ring-0 flex-1 px-4"
        />
        {suffix && <div className="pr-3 text-sm text-gray-500">{suffix}</div>}
      </div>
    </div>
  )
}

