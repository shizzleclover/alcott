import { TestimonialCard } from './testimonial-card'

const testimonials = [
  {
    name: "Jenny Wilson",
    title: "Project Manager",
    company: "Microsoft",
    quote: "I just simply love tools that make my life easier! I have everything that I need in one place, and that allows our team to be more organized and user-oriented.",
    avatar: "/testimonial-1.png"
  },
  {
    name: "Robert Fox",
    title: "Founder",
    company: "Brain.co",
    quote: "I really like that I can have all in one place: I can send emails and text messages, I can have live chat, show pop-ups and push notifications on my website and create dynamic page content",
    avatar: "/testimonial-2.png"
  },
  {
    name: "Kristin Watson",
    title: "UX Designer",
    company: "Google",
    quote: "Very easy to use and set up is simple. I can easily provide live support to my website visitors in real-time. It also provides many integrations.",
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
