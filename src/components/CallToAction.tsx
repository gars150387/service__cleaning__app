import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CallToAction: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-primary-500 to-primary-600">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Book Your Cleaning Today
        </h2>
        <p className="text-xl md:text-2xl text-primary-100 mb-8">
          Satisfaction Guaranteed
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/book">
            <button className="bg-white hover:bg-neutral-100 text-primary-600 px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center group">
              Book Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </Link>
          <button className="bg-transparent hover:bg-white/10 text-white px-8 py-4 rounded-2xl text-lg font-semibold border-2 border-white transition-all duration-300 hover:scale-105">
            Call (555) 123-4567
          </button>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-primary-100">
          <div>
            <div className="text-3xl font-bold text-white">1000+</div>
            <div className="text-sm">Happy Customers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">5000+</div>
            <div className="text-sm">Cleanings Completed</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">4.9★</div>
            <div className="text-sm">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
