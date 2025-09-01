import React from "react";
import { Sparkles, Shield, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50 flex items-center justify-center px-4 py-20">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-neutral-900 mb-6 leading-tight">
            <span className="text-primary-500 block">Home & Office</span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-500 mb-8 max-w-2xl mx-auto">
            Book trusted cleaners in minutes
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/book">
              <button className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Book Now
              </button>
            </Link>
            <button className="bg-white hover:bg-neutral-100 text-neutral-900 px-8 py-4 rounded-2xl text-lg font-semibold border-2 border-neutral-200 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              Get a Free Quote
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up">
          <div className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <Sparkles className="w-8 h-8 text-primary-500 mb-4" />
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              Spotless Results
            </h3>
            <p className="text-neutral-500">
              Professional-grade cleaning with attention to every detail
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <Shield className="w-8 h-8 text-primary-500 mb-4" />
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              Fully Insured
            </h3>
            <p className="text-neutral-500">
              Complete peace of mind with comprehensive insurance coverage
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <Clock className="w-8 h-8 text-primary-500 mb-4" />
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              Flexible Scheduling
            </h3>
            <p className="text-neutral-500">
              Book when it works for you, with easy rescheduling options
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
