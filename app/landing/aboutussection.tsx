export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-gray-100">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">About Us</h2>
        <p className="text-lg text-gray-600 leading-relaxed mb-12">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>

        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Vision</h3>
          <p className="text-gray-600 leading-relaxed mb-12">
            To create a future where financial access is available to everyone through transparency, innovation, and commitment to our clients.
            We envision a community empowered by opportunity and sustained by trust.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h3>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to provide responsible lending services that uplift lives and communities. We aim to deliver customer-centered
            financial solutions with integrity, professionalism, and a deep sense of accountability.
          </p>
        </div>
      </div>
    </section>
  );
}
