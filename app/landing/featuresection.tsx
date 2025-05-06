const features = [
    {
      title: 'Quick Processing',
      description: 'Experience lightning-fast loan approvals and minimal paperwork.',
      icon: "⚡"
    },
    {
      title: 'Secure Platform',
      description: 'Your data and transactions are protected with top-grade security.',
      icon: "🔒"
    },
    {
      title: '24/7 Support',
      description: 'We’re here to help anytime you need us.',
      icon: "💬"
    }
  ];
  
  export default function FeatureSection() {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Why Choose Vistula Lending Corporation?
          </h2>
  
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  