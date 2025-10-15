interface TestimonialCardProps {
  name: string
  title: string
  company: string
  quote: string
  avatar: string
}

export function TestimonialCard({ name, title, company, quote, avatar }: TestimonialCardProps) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
      {/* Profile Picture */}
      <div className="flex justify-center mb-6">
        <img
          src={avatar}
          alt={name}
          className="w-20 h-20 rounded-full object-cover"
        />
      </div>

      {/* Quote */}
      <blockquote className="text-gray-700 text-center mb-6 leading-relaxed font-[Urbanist]" style={{ fontFamily: 'Urbanist, system-ui, sans-serif' }}>
        "{quote}"
      </blockquote>

      {/* Name and Title */}
      <div className="text-center">
        <h4 className="font-bold text-gray-900 text-lg font-[Urbanist]" style={{ fontFamily: 'Urbanist, system-ui, sans-serif' }}>{name}</h4>
        <p className="text-gray-600 text-sm font-[Urbanist]" style={{ fontFamily: 'Urbanist, system-ui, sans-serif' }}>
          {title} at {company}
        </p>
      </div>
    </div>
  )
}
