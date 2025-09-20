export function Footer() {
  return (
    <footer className="bg-white">
      {/* Mobile App Download Section */}
      <section className="bg-[#F3F9FD] py-16">
        <div className="max-w-4xl mx-auto px-4 lg:px-12 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Download our mobile app
            <span className="text-yellow-500 ml-2"></span>
          </h2>
          <p className="text-lg text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
            With lots of unique blocks, you can easily build a page without coding. Build your next landing page.
          </p>
          
          {/* App Download Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-full flex items-center justify-center space-x-4 transition-colors">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <div className="text-left">
                <div className="text-xs font-medium">DOWNLOAD ON THE</div>
                <div className="text-lg font-bold">App Store</div>
              </div>
            </button>
            
            <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-full flex items-center justify-center space-x-4 transition-colors">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.792 12L3.609 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L13.792 12l4.906-4.491zM5.864 2.658L16.802 8.99l-8.635 8.636-2.303-2.302 8.635-8.635z"/>
              </svg>
              <div className="text-left">
                <div className="text-xs font-medium">GET IT ON</div>
                <div className="text-lg font-bold">Google Play</div>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Main Footer Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Column 1: Alcott Logo and Description */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <img src="/alcott-small.png" alt="alcott-small-logo"/>
              </div>
              <p className="text-gray-600 leading-relaxed max-w-md">
                Alcott, an end-to-end logistics tech API
                 platform that connects businesses to haulage and warehousing assets all in one ecosystem.
              </p>
            </div>

            {/* Column 2: Company Links */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6">Company</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-600 hover:text-[#4043FF] transition-colors">About</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#4043FF] transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#4043FF] transition-colors">Works</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#4043FF] transition-colors">Career</a></li>
              </ul>
            </div>

            {/* Column 3: Services Links */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6">Services</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-600 hover:text-[#4043FF] transition-colors">For Business</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#4043FF] transition-colors">For Partners</a></li>
              </ul>
            </div>

            {/* Column 4: Help Links */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6">Help</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-600 hover:text-[#4043FF] transition-colors">Customer Support</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#4043FF] transition-colors">Delivery Details</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#4043FF] transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#4043FF] transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            {/* Column 5: Contact Information */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-4 text-gray-600">
                <div>+234 906 000 7571</div>
                <div>hello@alcott.com.ng</div>
                <div>1 Engineering Close.<br />Victoria Island 106104.<br />Lagos State</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Footer Bar */}
      <section className="border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Social Media Icons */}
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-[#4043FF] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-[#4043FF] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-[#4043FF] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-[#4043FF] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>

            {/* Legal Links */}
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-[#4043FF] transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-600 hover:text-[#4043FF] transition-colors text-sm">Terms & Conditions</a>
              <a href="#" className="text-gray-600 hover:text-[#4043FF] transition-colors text-sm">Support</a>
            </div>

            {/* Copyright Notice */}
            <div className="text-gray-600 text-sm">
              ©Copyright 2023. All Rights Reserved
            </div>
          </div>
        </div>
      </section>
    </footer>
  )
}
