import React from "react";
import { Home, Building, Sparkles, Truck } from "lucide-react";
import { Link } from "react-router-dom";

const Services: React.FC = () => {
  const services = [
    {
      id: "home-cleaning",
      icon: Home,
      title: "Home Cleaning",
      description: "Regular house cleaning to keep your home fresh and tidy",
      oneTimePrice: 120,
      recurringPrice: 90,
      features: ["Living areas", "Bedrooms", "Bathrooms", "Kitchen"],
    },
    {
      id: "office-cleaning",
      icon: Building,
      title: "Office Cleaning",
      description: "Professional workspace cleaning for productive environments",
      oneTimePrice: 180,
      recurringPrice: null,
      features: ["Workstations", "Meeting rooms", "Common areas", "Restrooms"],
    },
    {
      id: "deep-cleaning",
      icon: Sparkles,
      title: "Deep Cleaning",
      description: "Comprehensive cleaning for a fresh start or special occasions",
      oneTimePrice: 200,
      recurringPrice: null,
      features: [
        "Behind appliances",
        "Inside cabinets",
        "Baseboards",
        "Light fixtures",
      ],
    },
    {
      id: "move-in-out",
      icon: Truck,
      title: "Move-in/Move-out",
      description: "Complete cleaning for property transitions",
      oneTimePrice: 300,
      recurringPrice: null, // Not available for recurring
      features: [
        "Empty property",
        "All surfaces",
        "Inside appliances",
        "Windows",
      ],
    },
  ];

  return (
    <section className="py-20 px-4 bg-neutral-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-neutral-500 max-w-2xl mx-auto">
            Professional cleaning solutions tailored to your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="bg-primary-100 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-primary-500" />
                </div>
                <div className="text-right">
                  <div className="bg-secondary-100 text-secondary-600 px-4 py-2 rounded-xl font-semibold mb-2">
                    One-time starting at : ${service.oneTimePrice}
                  </div>
                  {service.recurringPrice && (
                    <div className="bg-primary-100 text-primary-600 px-4 py-2 rounded-xl font-semibold text-sm">
                      Weekly starting at : ${service.recurringPrice}
                    </div>
                  )}
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-neutral-900 mb-3">
                {service.title}
              </h3>
              <p className="text-neutral-500 mb-6 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-2 mb-8">
                {service.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center text-neutral-600"
                  >
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                to="/book"
                state={{
                  service: {
                    id: service.id,
                    title: service.title,
                    description: service.description,
                    oneTimePrice: service.oneTimePrice,
                    recurringPrice: service.recurringPrice,
                    features: service.features,
                  },
                }}
                className="block w-full"
              >
                <button className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105">
                  Book This Service
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
