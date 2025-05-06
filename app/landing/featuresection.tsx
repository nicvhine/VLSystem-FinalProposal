const features = [
  {
    title: 'Quick Processing',
    description: 'Experience lightning-fast loan approvals and minimal paperwork.',
    icon: '⚡',
  },
  {
    title: 'Secure Platform',
    description: 'Your data and transactions are protected with top-grade security.',
    icon: '🔒',
  },
  {
    title: '24/7 Support',
    description: 'We’re here to help anytime you need us.',
    icon: '💬',
  },
];

export default function FeatureSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-white to-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
          Why Choose Vistula Lending Corporation?
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-2 duration-300"
            >
              <div className="text-5xl mb-4 text-red-600">{feature.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
