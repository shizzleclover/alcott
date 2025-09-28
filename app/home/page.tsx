'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const [selectedCurrency, setSelectedCurrency] = useState('NGN')
  const router = useRouter()

  const handleTopUp = () => {
    console.log('Top Up clicked')
    // Add top-up functionality here
    alert('Top Up functionality coming soon!')
  }

  const handleQuickAction = (action: string) => {
    console.log(`${action} clicked`)
    switch(action) {
      case 'New Shipment':
        // Navigate to new shipment page
        router.push('/shipment/new')
        break
      case 'Check Rates':
        // Navigate to rates page
        router.push('/rates')
        break
      case 'Nearby Drop':
        // Navigate to nearby drop locations
        router.push('/locations')
        break
      case 'Help Center':
        // Navigate to help center
        router.push('/help')
        break
      default:
        alert(`${action} functionality coming soon!`)
    }
  }

  const handleSeeAllTransactions = () => {
    console.log('See All Transactions clicked')
    router.push('/transactions')
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#4043FF] text-white flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-[#5A5DFF]">
          <div className="flex items-center">
            <img
              src="/alcott-logo.png"
              alt="Alcott Logo"
              className="h-8 w-auto"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            <li>
              <Link href="/home" className="flex items-center px-4 py-3 rounded-lg bg-white/10 text-white font-[Urbanist] font-bold">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v3H8V5z" />
                </svg>
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/orders" className="flex items-center px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors font-[Urbanist] font-bold">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                My Order
              </Link>
            </li>
            <li>
              <Link href="/inbox" className="flex items-center px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors font-[Urbanist] font-bold">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                Inbox
              </Link>
            </li>
            <li>
              <Link href="/settings" className="flex items-center px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors font-[Urbanist] font-bold">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Type anything here to search"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4043FF] focus:border-transparent text-gray-900 placeholder:text-gray-500 font-[Urbanist] font-bold placeholder:font-bold"
                  style={{ fontFamily: 'Urbanist, system-ui, sans-serif', fontWeight: 'bold' }}
                />
              </div>
            </div>

            {/* Currency Selector & Profile */}
            <div className="flex items-center space-x-4">
              {/* Currency Dropdown */}
              <div className="relative">
                <select
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-[#4043FF] focus:border-transparent font-[Urbanist]"
                  style={{ fontFamily: 'Urbanist, system-ui, sans-serif', fontWeight: 'bold' }}
                >
                  <option value="NGN">NGN</option>
                  <option value="USD">USD</option>
                </select>
                <svg className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Profile */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <div>
                  <p className="text-sm font-bold text-gray-900 font-[Urbanist]" style={{ fontFamily: 'Urbanist, system-ui, sans-serif', fontWeight: 'bold' }}>Olusegun Matanmi</p>
                </div>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6">
          {/* Dashboard Banner Card */}
          <section className="mb-8">
            <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(64,67,255,0.25)]">
              {/* Card background image */}
              <img src="/home_card.png" alt="Balance card background" className="w-full h-[190px] md:h-[220px] object-cover" />

              {/* Stacked elements on card */}
              <div className="absolute inset-0 flex flex-col md:flex-row items-start md:items-center justify-between px-6 md:px-10 py-6">
                {/* Left - Balance */}
                <div>
                  <p className="text-white/90 text-sm font-[Urbanist] font-bold" style={{ fontFamily: 'Urbanist, system-ui, sans-serif' }}>Your balance</p>
                  <h3 className="text-white text-3xl md:text-4xl font-extrabold mt-2 font-[Urbanist]" style={{ fontFamily: 'Urbanist, system-ui, sans-serif' }}>
                    941,800.00NGN
                  </h3>
                  <button 
                    onClick={handleTopUp}
                    className="mt-4 bg-white text-[#4043FF] hover:bg-gray-100 rounded-full px-4 py-2 text-sm font-bold shadow transition-colors font-[Urbanist]"
                    style={{ fontFamily: 'Urbanist, system-ui, sans-serif', fontWeight: 'bold' }}
                  >
                    ⬆ Top Up
                  </button>
                </div>

                {/* Right - Greeting */}
                <div className="hidden md:block text-right">
                  <p className="text-white/90 text-sm font-[Urbanist]" style={{ fontFamily: 'Urbanist, system-ui, sans-serif' }}>Good Morning 👋</p>
                  <p className="text-white text-xl font-bold font-[Urbanist]" style={{ fontFamily: 'Urbanist, system-ui, sans-serif' }}>Olusegun Matanmi</p>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Actions */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
            {[
              { label: 'New Shipment', icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18"/></svg>) },
              { label: 'Check Rates', icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 11V3a8 8 0 100 16 8 8 0 008-8h-8z"/></svg>) },
              { label: 'Nearby Drop', icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3-1.567 3-3.5S13.657 4 12 4 9 5.567 9 7.5 10.343 11 12 11z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s7-4.434 7-12.5A7 7 0 105 9.5C5 17.566 12 22 12 22z"/></svg>) },
              { label: 'Help Center', icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>) }
            ].map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => handleQuickAction(item.label)}
                className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col md:flex-row items-center justify-center gap-3 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-[#E0E0FF] text-[#4043FF] flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="text-sm md:text-base font-bold text-gray-800 font-[Urbanist] text-center md:text-left" style={{ fontFamily: 'Urbanist, system-ui, sans-serif', fontWeight: 'bold' }}>{item.label}</span>
              </div>
            ))}
          </section>

          {/* Transaction History */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg md:text-xl font-extrabold text-gray-900 font-[Urbanist]" style={{ fontFamily: 'Urbanist, system-ui, sans-serif', fontWeight: 'bold' }}>Transaction History</h3>
              <button 
                onClick={handleSeeAllTransactions}
                className="text-[#4043FF] text-sm font-bold hover:text-[#3333CC] transition-colors font-[Urbanist]"
                style={{ fontFamily: 'Urbanist, system-ui, sans-serif', fontWeight: 'bold' }}
              >
                See All
              </button>
            </div>
            <div className="space-y-4">
              {[
                { title: 'New Order Made!', desc: 'You have created a new shipping order', time: '2 hours ago', color: 'bg-blue-100 text-blue-600' },
                { title: 'Top Up Successful', desc: 'You successfully top up your e-wallet for ₦600,000', time: '4 hours ago', color: 'bg-green-100 text-green-600' },
                { title: 'Payment Successful', desc: 'Shipping payment of ₦40,000 successfully made', time: '1 day ago', color: 'bg-purple-100 text-purple-600' },
                { title: 'E-Wallet Connected!', desc: 'You have connected the e-wallet with Saska', time: '2 days ago', color: 'bg-orange-100 text-orange-600' }
              ].map((item, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 flex items-start justify-between hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${item.color}`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 font-[Urbanist]" style={{ fontFamily: 'Urbanist, system-ui, sans-serif', fontWeight: 'bold' }}>{item.title}</p>
                      <p className="text-sm text-gray-600 font-[Urbanist]" style={{ fontFamily: 'Urbanist, system-ui, sans-serif', fontWeight: 'bold' }}>{item.desc}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 mt-1 font-[Urbanist]" style={{ fontFamily: 'Urbanist, system-ui, sans-serif', fontWeight: 'bold' }}>{item.time}</span>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
