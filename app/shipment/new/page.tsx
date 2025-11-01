'use client';

import { useEffect, useMemo, useRef, useState } from 'react'
import type { ChangeEvent, ComponentType, ReactNode, RefObject, SVGProps } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

// Step configuration
const steps = [
  { key: 'sender', label: 'Sender' },
  { key: 'receiver', label: 'Receiver' },
  { key: 'package', label: 'Package' },
  { key: 'payment', label: 'Payment' },
  { key: 'finish', label: 'Finish' },
] as const

type StepKey = (typeof steps)[number]['key']
type StepDefinition = typeof steps

const shippingOptions = [
  { id: 'regular', label: 'Regular', eta: '3-4 days', price: 12000 },
  { id: 'cargo', label: 'Cargo', eta: '3-5 days', price: 18000 },
  { id: 'express', label: 'Express', eta: '1-2 days', price: 24000 },
]

const paymentMethods = [
  { id: 'wallet', label: 'My Wallet', details: 'Balance: ₦941,800.00' },
  { id: 'card', label: '•••• 4679', details: 'Visa - Expires 12/27' },
]

const initialSender = {
  name: '',
  phone: '',
  email: '',
  city: '',
  address: '',
}

const initialPackage = {
  category: '',
  description: '',
  weight: '',
  length: '',
  width: '',
  height: '',
  shippingOption: 'regular',
}

const initialPayment = {
  method: 'wallet',
}

export default function NewShipmentPage() {
  const router = useRouter()

  // Step state
  const [currentStep, setCurrentStep] = useState<StepKey>('sender')
  const activeIndex = useMemo(() => steps.findIndex((s) => s.key === currentStep), [currentStep])

  // Form state
  const [sender, setSender] = useState(initialSender)
  const [receiver, setReceiver] = useState(initialSender)
  const [pkg, setPkg] = useState(initialPackage)
  const [payment, setPayment] = useState(initialPayment)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Header / navigation state
  const [selectedCurrency, setSelectedCurrency] = useState('NGN')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Search state (mirrors dashboard page)
  const [searchValue, setSearchValue] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [recentSearches, setRecentSearches] = useState(['01/07/2024', '02/07/2024', '03/07/2024', '04/07/2024'])
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)
  const handleRecentSearchClick = (search: string) => {
    setSearchValue(search)
    setIsSearchFocused(false)
  }
  const handleClearAllRecents = () => setRecentSearches([])

  const moveToNext = () => {
    const nextStep = steps[activeIndex + 1]
    if (nextStep) setCurrentStep(nextStep.key)
  }

  const moveToPrevious = () => {
    const prevStep = steps[activeIndex - 1]
    if (prevStep) setCurrentStep(prevStep.key)
    else router.back()
  }

  const shippingSelection = useMemo(
    () => shippingOptions.find((opt) => opt.id === pkg.shippingOption) || shippingOptions[0],
    [pkg.shippingOption]
  )

  return (
    <div className="min-h-screen bg-[#F8F9FC] flex" style={{ fontFamily: "'Urbanist', sans-serif" }}>
      <DesktopSidebar />
      {mobileMenuOpen && <MobileSidebar onClose={() => setMobileMenuOpen(false)} />}

      <div className="flex-1 flex flex-col">
        <Header
          mobileMenuOpen={mobileMenuOpen}
          onToggleMobileMenu={() => setMobileMenuOpen((prev) => !prev)}
          selectedCurrency={selectedCurrency}
          onCurrencyChange={(value) => setSelectedCurrency(value)}
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          onSearchFocus={() => setIsSearchFocused(true)}
          searchRef={searchRef}
          isSearchFocused={isSearchFocused}
          recentSearches={recentSearches}
          onRecentClick={handleRecentSearchClick}
          onClearRecent={handleClearAllRecents}
        />

        <main className="flex-1 px-4 lg:px-6 py-6 lg:py-8 overflow-y-auto">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={moveToPrevious} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
                {currentStep === 'sender' ? 'New Shipment' : 'Make Order'}
              </h1>
              <p className="text-sm text-gray-500">Step {activeIndex + 1} of {steps.length}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:gap-2">
            <Stepper steps={steps} activeIndex={activeIndex} />

            <div className="max-w-4xl w-full mx-auto space-y-5 lg:space-y-6">
              {currentStep === 'sender' && (
                <SenderForm data={sender} onChange={setSender} onContinue={moveToNext} />
              )}
              {currentStep === 'receiver' && (
                <ReceiverForm data={receiver} onChange={setReceiver} onContinue={moveToNext} />
              )}
              {currentStep === 'package' && (
                <PackageForm
                  data={pkg}
                  onChange={setPkg}
                  shippingSelection={shippingSelection}
                  onContinue={moveToNext}
                />
              )}
              {currentStep === 'payment' && (
                <PaymentForm data={payment} onChange={setPayment} onContinue={moveToNext} />
              )}
              {currentStep === 'finish' && (
                <ReviewSummary
                  sender={sender}
                  receiver={receiver}
                  pkg={pkg}
                  shippingSelection={shippingSelection}
                  payment={payment}
                  onConfirm={() => {
                    setIsSubmitting(true)
                    setTimeout(() => {
                      setIsSubmitting(false)
                      router.push('/shipment/new/success')
                    }, 1000)
                  }}
                  isSubmitting={isSubmitting}
                />
              )}
            </div>
          </div>
        </main>

        <MobileBottomNav />
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                                   Layout                                   */
/* -------------------------------------------------------------------------- */

function DesktopSidebar() {
  return (
    <div className="hidden lg:flex w-64 bg-[#4043FF] text-white flex-col">
      <div className="p-6 border-b border-[#5A5DFF]">
        <img src="/alcott-white-logo-sidebar-home.png" alt="Alcott Logo" className="h-10 w-auto" />
      </div>
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          <SidebarLink href="/home" icon={DashboardIcon} label="Dashboard" />
          <SidebarLink href="/shipment/new" icon={OrderIcon} label="My Order" active />
          <SidebarLink href="/inbox" icon={InboxIcon} label="Inbox" />
          <SidebarLink href="/settings" icon={SettingsIcon} label="Settings" />
        </ul>
      </nav>
    </div>
  )
}

function MobileSidebar({ onClose }: { onClose: () => void }) {
  return (
    <div className="lg:hidden fixed inset-0 z-50 flex">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-64 bg-[#4043FF] text-white flex flex-col">
        <div className="p-6 border-b border-[#5A5DFF] flex items-center justify-between">
          <img src="/alcott-white-logo-sidebar-home.png" alt="Alcott Logo" className="h-8 w-auto" />
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/10">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            <SidebarLink href="/home" icon={DashboardIcon} label="Dashboard" onClick={onClose} mobile />
            <SidebarLink href="/shipment/new" icon={OrderIcon} label="My Order" active onClick={onClose} mobile />
            <SidebarLink href="/inbox" icon={InboxIcon} label="Inbox" onClick={onClose} mobile />
            <SidebarLink href="/settings" icon={SettingsIcon} label="Settings" onClick={onClose} mobile />
          </ul>
        </nav>
      </div>
    </div>
  )
}

function Header({
  mobileMenuOpen,
  onToggleMobileMenu,
  selectedCurrency,
  onCurrencyChange,
  searchValue,
  onSearchChange,
  onSearchFocus,
  searchRef,
  isSearchFocused,
  recentSearches,
  onRecentClick,
  onClearRecent,
}: {
  mobileMenuOpen: boolean
  onToggleMobileMenu: () => void
  selectedCurrency: string
  onCurrencyChange: (value: string) => void
  searchValue: string
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSearchFocus: () => void
  searchRef: RefObject<HTMLDivElement>
  isSearchFocused: boolean
  recentSearches: string[]
  onRecentClick: (search: string) => void
  onClearRecent: () => void
}) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        <button onClick={onToggleMobileMenu} className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="flex-1 max-w-md mx-4 lg:mx-8" ref={searchRef}>
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Type anything here to search"
              value={searchValue}
              onChange={onSearchChange}
              onFocus={onSearchFocus}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-[#4043FF] focus:bg-white text-gray-900 placeholder:text-gray-500 font-bold"
            />
            {isSearchFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
                  <span className="text-xs font-semibold text-gray-500">Recent</span>
                  <button onClick={onClearRecent} className="text-xs text-[#4043FF] font-semibold">Clear All</button>
                </div>
                <div className="py-2">
                  {recentSearches.length > 0 ? (
                    recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => onRecentClick(search)}
                        className="w-full px-4 py-2 text-left text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                      >
                        {search}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-6 text-center text-sm text-gray-500">No recent searches</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-lg hover:bg-gray-100">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1 right-1 block w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <div className="hidden md:block relative">
            <select
              value={selectedCurrency}
              onChange={(e) => onCurrencyChange(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2 pr-8 text-sm font-semibold text-gray-700 focus:ring-2 focus:ring-[#4043FF] focus:border-transparent"
            >
              <option value="NGN">NGN</option>
              <option value="USD">USD</option>
            </select>
            <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-300" />
            <div className="hidden md:block text-sm font-semibold text-gray-900">Olusegun Matanmi</div>
            <svg className="hidden md:block w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  )
}

function MobileBottomNav() {
  return (
    <div className="lg:hidden sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <nav className="flex justify-around items-center">
        <BottomNavLink href="/home" label="Dashboard" icon={DashboardIcon} />
        <BottomNavLink href="/shipment/new" label="My Order" icon={OrderIcon} active />
        <BottomNavLink href="/inbox" label="Inbox" icon={InboxIcon} />
        <BottomNavLink href="/settings" label="Settings" icon={SettingsIcon} />
      </nav>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                               Form Sections                                */
/* -------------------------------------------------------------------------- */

function FormSection({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
      {/* Field stack spacing – tweak here if needed */}
      <div className="space-y-3">{children}</div>
    </div>
  )
}

function SenderForm({
  data,
  onChange,
  onContinue,
}: {
  data: typeof initialSender
  onChange: (value: typeof initialSender) => void
  onContinue: () => void
}) {
  return (
    <FormSection title="Sender Details" subtitle="Who is sending this package?">
      <InputRow label="Sender Name" placeholder="Sender Name" value={data.name} onChange={(value) => onChange({ ...data, name: value })} />
      <InputRow label="Phone Number" placeholder="Phone Number" value={data.phone} onChange={(value) => onChange({ ...data, phone: value })} prefix={<CountryCode />} />
      <InputRow label="Email" placeholder="Email" type="email" value={data.email} onChange={(value) => onChange({ ...data, email: value })} />
      <InputRow label="City / Province" placeholder="City / Province" value={data.city} onChange={(value) => onChange({ ...data, city: value })} />
      <TextareaRow label="Address Details" placeholder="Address Details" value={data.address} onChange={(value) => onChange({ ...data, address: value })} />
      <ContinueButton onClick={onContinue} label="Continue" />
    </FormSection>
  )
}

function ReceiverForm({
  data,
  onChange,
  onContinue,
}: {
  data: typeof initialSender
  onChange: (value: typeof initialSender) => void
  onContinue: () => void
}) {
  return (
    <FormSection title="Receiver Details" subtitle="Who will receive this package?">
      <InputRow label="Receiver Name" placeholder="Receiver Name" value={data.name} onChange={(value) => onChange({ ...data, name: value })} />
      <InputRow label="Phone Number" placeholder="Phone Number" value={data.phone} onChange={(value) => onChange({ ...data, phone: value })} prefix={<CountryCode country="US" flagColor="bg-red-500" />} />
      <InputRow label="Email" placeholder="Email" type="email" value={data.email} onChange={(value) => onChange({ ...data, email: value })} />
      <InputRow label="City / Province" placeholder="City / Province" value={data.city} onChange={(value) => onChange({ ...data, city: value })} />
      <TextareaRow label="Address Details" placeholder="Address Details" value={data.address} onChange={(value) => onChange({ ...data, address: value })} />
      <ContinueButton onClick={onContinue} label="Continue" />
    </FormSection>
  )
}

function PackageForm({
  data,
  onChange,
  shippingSelection,
  onContinue,
}: {
  data: typeof initialPackage
  onChange: (value: typeof initialPackage) => void
  shippingSelection: (typeof shippingOptions)[number]
  onContinue: () => void
}) {
  const [showOptions, setShowOptions] = useState(false)

  return (
    <FormSection title="Package Details" subtitle="Describe the package and choose shipping.">
      <InputRow label="Package Category" placeholder="Category" value={data.category} onChange={(value) => onChange({ ...data, category: value })} />
      <TextareaRow label="Package Description" placeholder="Description" value={data.description} onChange={(value) => onChange({ ...data, description: value })} />
      <InputRow label="Weight" placeholder="Weight" value={data.weight} onChange={(value) => onChange({ ...data, weight: value })} suffix={<span className="text-sm text-gray-500">kg</span>} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">{/* Adjust dimension field spacing here */}
        <Input type="number" min="0" placeholder="Length" value={data.length} onChange={(e) => onChange({ ...data, length: e.target.value })} className="h-12 rounded-lg border-gray-200 focus:ring-[#4043FF] focus:border-[#4043FF]" />
        <Input type="number" min="0" placeholder="Width" value={data.width} onChange={(e) => onChange({ ...data, width: e.target.value })} className="h-12 rounded-lg border-gray-200 focus:ring-[#4043FF] focus:border-[#4043FF]" />
        <Input type="number" min="0" placeholder="Height" value={data.height} onChange={(e) => onChange({ ...data, height: e.target.value })} className="h-12 rounded-lg border-gray-200 focus:ring-[#4043FF] focus:border-[#4043FF]" />
      </div>
      <div className="relative">
        <label className="text-sm font-semibold text-gray-700">Select Shipping</label>
        <button
          type="button"
          onClick={() => setShowOptions((prev) => !prev)}
          className="mt-2 w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-between text-sm text-gray-700 hover:bg-gray-100"
        >
          <span className="flex items-center gap-2">
            <MenuIcon />
            {shippingSelection ? `${shippingSelection.label} – ₦${shippingSelection.price.toLocaleString()}` : 'Shipping'}
          </span>
          <CaretDownIcon />
        </button>
        {showOptions && (
          <div className="absolute z-10 mt-2 w-full rounded-2xl bg-white shadow-xl border border-gray-100 overflow-hidden">
            {shippingOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  onChange({ ...data, shippingOption: option.id })
                  setShowOptions(false)
                }}
                className={`w-full px-4 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors ${
                  data.shippingOption === option.id ? 'bg-gray-50' : ''
                }`}
              >
                <div>
                  <p className="text-sm font-semibold text-gray-900">{option.label}</p>
                  <p className="text-xs text-gray-500">{option.eta}</p>
                </div>
                <span className="text-sm font-bold text-[#4043FF]">₦{option.price.toLocaleString()}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      <ContinueButton onClick={onContinue} label="Continue" />
    </FormSection>
  )
}

function PaymentForm({
  data,
  onChange,
  onContinue,
}: {
  data: typeof initialPayment
  onChange: (value: typeof initialPayment) => void
  onContinue: () => void
}) {
  return (
    <FormSection title="Payment Method" subtitle="Select how you want to pay for this shipment.">
      <div className="space-y-3">
        {paymentMethods.map((method) => (
          <label
            key={method.id}
            className={`flex items-center justify-between border rounded-xl px-4 py-3 transition-colors ${
              data.method === method.id ? 'border-[#4043FF] bg-[#4043FF]/5' : 'border-gray-200 hover:border-[#4043FF]/40'
            }`}
          >
            <div>
              <p className="text-sm font-semibold text-gray-900">{method.label}</p>
              <p className="text-xs text-gray-500">{method.details}</p>
            </div>
            <input
              type="radio"
              name="payment"
              value={method.id}
              checked={data.method === method.id}
              onChange={() => onChange({ method: method.id })}
              className="w-4 h-4 accent-[#4043FF]"
            />
          </label>
        ))}
      </div>
      <ContinueButton onClick={onContinue} label="Continue" />
    </FormSection>
  )
}

function ReviewSummary({
  sender,
  receiver,
  pkg,
  shippingSelection,
  payment,
  onConfirm,
  isSubmitting,
}: {
  sender: typeof initialSender
  receiver: typeof initialSender
  pkg: typeof initialPackage
  shippingSelection: (typeof shippingOptions)[number]
  payment: typeof initialPayment
  onConfirm: () => void
  isSubmitting: boolean
}) {
  return (
    <FormSection title="Review Summary" subtitle="Confirm the details before completing the order.">
      <div className="space-y-4">
        <SummaryCard title="Sender" items={[
          ['Name', sender.name],
          ['Phone', sender.phone],
          ['Email', sender.email],
          ['Address', sender.address],
        ]} />
        <SummaryCard title="Receiver" items={[
          ['Name', receiver.name],
          ['Phone', receiver.phone],
          ['Email', receiver.email],
          ['Address', receiver.address],
        ]} />
        <SummaryCard title="Package" items={[
          ['Category', pkg.category],
          ['Weight', pkg.weight ? `${pkg.weight} kg` : ''],
          ['Dimensions', `${pkg.length || 0} × ${pkg.width || 0} × ${pkg.height || 0} cm`],
          ['Shipping', `${shippingSelection.label} – ₦${shippingSelection.price.toLocaleString()}`],
        ]} />
        <SummaryCard title="Payment" items={[[
          'Method', paymentMethods.find((m) => m.id === payment.method)?.label || ''
        ]]} />
      </div>

      <div className="pt-4">
        <Button
          onClick={onConfirm}
          disabled={isSubmitting}
          className="w-full h-12 rounded-full bg-[#4043FF] hover:bg-[#3333CC] text-white font-semibold disabled:opacity-60"
        >
          {isSubmitting ? 'Confirming…' : 'Confirm Order'}
        </Button>
      </div>
    </FormSection>
  )
}

function SummaryCard({ title, items }: { title: string; items: Array<[string, string]> }) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6">
        {items.map(([label, value], index) => (
          <div key={index} className="text-sm">
            <p className="text-gray-500 font-medium">{label}</p>
            <p className="text-gray-900 font-semibold mt-0.5">{value || '—'}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ContinueButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <div className="pt-4">{/* Adjust button offset here */}
      <Button
        onClick={onClick}
        className="w-full h-12 rounded-full bg-[#4043FF] hover:bg-[#3333CC] text-white font-semibold"
      >
        {label}
      </Button>
    </div>
  )
}

function InputRow({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  prefix,
  suffix,
}: {
  label: string
  placeholder: string
  value: string
  onChange: (text: string) => void
  type?: string
  prefix?: ReactNode
  suffix?: ReactNode
}) {
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

function TextareaRow({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string
  placeholder: string
  value: string
  onChange: (text: string) => void
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <Textarea
        rows={3}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-[#4043FF] focus:border-[#4043FF]"
      />
    </div>
  )
}

function CountryCode({ country = 'NG', flagColor = 'bg-green-500' }: { country?: string; flagColor?: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-6 h-4 rounded ${flagColor}`} />
      <span className="text-xs font-semibold text-gray-600">+{country === 'NG' ? '234' : country === 'US' ? '1' : ''}</span>
    </div>
  )
}

function Stepper({ steps: stepConfig, activeIndex }: { steps: StepDefinition; activeIndex: number }) {
  return (
    <div className="flex flex-wrap gap-0.5 items-center justify-between">{/* Tweak gap between each step item */}
      {/* numbers for shipment page */}
      {stepConfig.map((step, index) => {
        const isActive = index === activeIndex
        const isCompleted = index < activeIndex
        return (
          <div key={step.key} className="flex items-center gap-1.5 lg:gap-2">{/* Control spacing between circle + connector */}
            <div className={`flex flex-col items-center text-center transition-all ${isActive ? 'text-[#4043FF]' : 'text-gray-400'}`}>
              <div
                className={`w-8 h-8 lg:w-9 lg:h-9 rounded-full flex items-center justify-center text-[11px] lg:text-xs font-bold border-2 ${
                  isActive
                    ? 'border-[#4043FF] text-white bg-[#4043FF]'
                    : isCompleted
                      ? 'border-[#4043FF] text-[#4043FF]'
                      : 'border-gray-300'
                }`}
              >
                {index + 1}
              </div>
              <span className="mt-1 text-[10px] lg:text-[11px] font-semibold uppercase tracking-wide">{step.label}</span>
            </div>
            {index < stepConfig.length - 1 && (
              <div
                className={`w-6 lg:w-8 h-0.5 ${index < activeIndex ? 'bg-[#4043FF]' : 'bg-gray-200'}`}
              />
            )}
            {/* Adjust line length */}
          </div>
        )
      })}
    </div>
  )
}

function SidebarLink({
  href,
  label,
  icon: Icon,
  active = false,
  onClick,
  mobile = false,
}: {
  href: string
  label: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  active?: boolean
  onClick?: () => void
  mobile?: boolean
}) {
  const baseClasses = 'flex items-center px-4 py-3 rounded-lg transition-colors font-bold'
  const desktopClasses = active
    ? 'bg-white/10 text-white'
    : 'text-white/80 hover:bg-white/10 hover:text-white'
  const mobileClasses = active
    ? 'bg-white/10 text-white'
    : 'text-white/80 hover:bg-white/10 hover:text-white'
  return (
    <li>
      <Link
        href={href}
        className={`${baseClasses} ${mobile ? mobileClasses : desktopClasses}`}
        onClick={onClick}
      >
        <Icon className="w-5 h-5 mr-3" />
        {label}
      </Link>
    </li>
  )
}

function BottomNavLink({
  href,
  label,
  icon: Icon,
  active = false,
}: {
  href: string
  label: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  active?: boolean
}) {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center p-2 ${active ? 'text-[#4043FF]' : 'text-gray-500'}`}
    >
      <Icon className="w-5 h-5 mb-1" />
      <span className="text-xs font-bold">{label}</span>
    </Link>
  )
}

/* -------------------------------------------------------------------------- */
/*                                  Icons                                     */
/* -------------------------------------------------------------------------- */

function DashboardIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v3H8V5z" />
    </svg>
  )
}

function OrderIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  )
}

function InboxIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
    </svg>
  )
}

function SettingsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" />
    </svg>
  )
}

function CaretDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}