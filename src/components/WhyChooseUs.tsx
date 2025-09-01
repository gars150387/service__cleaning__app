import React from 'react';
import { Shield, Users, Leaf, Clock, Award, Heart } from 'lucide-react';

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: "Fully Insured",
      description: "Complete protection for your peace of mind"
    },
    {
      icon: Users,
      title: "Trained Staff",
      description: "Background-checked, experienced professionals"
    },
    {
      icon: Leaf,
      title: "Eco-Friendly",
      description: "Safe, green cleaning supplies for your family"
    },
    {
      icon: Clock,
      title: "Flexible Booking",
      description: "Schedule that fits your busy lifestyle"
    },
    {
      icon: Award,
      title: "Quality Guarantee",
      description: "100% satisfaction or we'll make it right"
    },
    {
      icon: Heart,
      title: "Trusted by 1000+",
      description: "Families and businesses love our service"
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Why Choose Us
          </h2>
          <p className="text-xl text-neutral-500 max-w-2xl mx-auto">
            We're committed to delivering exceptional service you can trust
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-neutral-100 p-8 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="bg-primary-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-neutral-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;