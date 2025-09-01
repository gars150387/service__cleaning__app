import React from 'react';
import { Calendar, Sparkles, Coffee } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: Calendar,
      title: "Request a Service",
      description: "Choose your service type, date, and time in just a few clicks"
    },
    {
      icon: Sparkles,
      title: "We Clean",
      description: "Our trained professionals arrive on time with eco-friendly supplies"
    },
    {
      icon: Coffee,
      title: "Relax & Enjoy",
      description: "Come home to a spotless space and enjoy your free time"
    }
  ];

  return (
    <section className="py-20 px-4 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-neutral-500 max-w-2xl mx-auto">
            Three simple steps to a cleaner, happier space
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center group"
            >
              <div className="bg-primary-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <step.icon className="w-10 h-10 text-primary-500" />
              </div>
              <div className="bg-primary-500 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                {step.title}
              </h3>
              <p className="text-neutral-500 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;