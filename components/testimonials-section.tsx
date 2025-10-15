import { TestimonialCard } from './testimonial-card'

const testimonials = [
  {
    name: "Sola Osinioki",
    title: "Senior Business Executive",
    company: "Microsoft",
    quote: "Alcott is very efficient, sent a package from London, UK to a suburb in Makurdi, Nigeria. the process was smooth and the recipient got the package in good condition",
    avatar: "/testimonial-1.png"
  },
  {
    name: "Ganiu Ayanteju",
    title: "Founder at G’miec Intl.",
    company: "Brain.co",
    quote: "Alcott is very fast and reliable. We started using the company during the covid-19 pandemic lock down and to my surprise, they were still able to deliver in 3-5 working days as promised which really helped my business",
    avatar: "/testimonial-2.png"
  },
  {
    name: "Ruth Abada",
    title: "Founder at Ruth Hair and Scents",
    company: "Google",
    quote: "Very reliable and efficient delivery service, Our customers always come back to patronize us just because of the smooth deliveries. I would always recommend them anytime, anyday",
    avatar: "/testimonial-3.png"
  }
]

export function TestimonialsSection() {
  return (
    <section className="bg-[#F8F9FA] py-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Don't just take our word for it,
          </h2>
          <p className="text-2xl font-bold text-[#4043FF]">
            See for yourself.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              title={testimonial.title}
              company={testimonial.company}
              quote={testimonial.quote}
              avatar={testimonial.avatar}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">
            Get started with Alcott.
          </h3>
          <button className="bg-[#4043FF] hover:bg-[#3333CC] text-white px-12 py-4 text-lg font-semibold rounded-full transition-colors">
            Register
          </button>
        </div>
      </div>
    </section>
  )
}
