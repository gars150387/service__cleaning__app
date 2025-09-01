import React from 'react';
import { Star } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Downtown",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      rating: 5,
      review: "Absolutely amazing service! My home has never been cleaner. The team was professional and thorough."
    },
    {
      name: "Michael Chen",
      location: "Business District",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      rating: 5,
      review: "Game changer for our office! The cleaning crew is reliable and does incredible work every week."
    },
    {
      name: "Emma Rodriguez",
      location: "Suburbs",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      rating: 5,
      review: "I love coming home to a spotless house. The booking process is so easy and the cleaners are fantastic!"
    },
    {
      name: "David Thompson",
      location: "City Center",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      rating: 5,
      review: "Professional, punctual, and thorough. They use eco-friendly products which is important to our family."
    },
    {
      name: "Lisa Park",
      location: "Midtown",
      image: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      rating: 5,
      review: "The deep cleaning service was exceptional. Every corner of my apartment sparkles now!"
    },
    {
      name: "James Wilson",
      location: "Westside",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      rating: 5,
      review: "Reliable and trustworthy. I've been using their service for months and couldn't be happier."
    }
  ];

  return (
    <section className="py-20 px-4 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-neutral-500 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us with their spaces
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex items-center mb-6">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-2xl object-cover mr-4"
                />
                <div>
                  <h4 className="text-lg font-semibold text-neutral-900">{testimonial.name}</h4>
                  <p className="text-sm text-neutral-500">{testimonial.location}</p>
                </div>
              </div>
              
              <div className="flex space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, starIndex) => (
                  <Star key={starIndex} className="w-5 h-5 fill-secondary-500 text-secondary-500" />
                ))}
              </div>
              
              <p className="text-neutral-600 leading-relaxed italic">
                "{testimonial.review}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;