export default function TestimonialSection() {
    return (
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="text-center mb-12 text-3xl font-bold text-gray-900">Testimonials</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                quote: 'testimonial1',
                author: "John Smith",
                role: 'businessOwner'
              },
              {
                quote: 'testimonial2',
                author: "Sarah Johnson",
                role: 'entrepreneur'
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-md p-8 relative animate-slide-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <p className="text-gray-600 mb-4">{testimonial.quote}</p>
                <div className="font-semibold">{testimonial.author}</div>
                <div className="text-sm text-gray-500">{testimonial.role}</div>
  
                {/* Red circle before pseudo-element */}
                <div className="absolute w-12 h-12 bg-red-100 rounded-full -top-2 -left-2 z-[-10]"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  