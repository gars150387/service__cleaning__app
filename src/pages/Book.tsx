import { Calendar, Clock, Mail, MapPin, Phone, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Book = () => {
  const [searchParams] = useSearchParams();
  const selectedPlan = searchParams.get("plan");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    service: "",
    date: "",
    time: "",
    notes: "",
  });

  // Pre-populate the service field when component mounts or plan changes
  useEffect(() => {
    if (selectedPlan) {
      setFormData((prev) => ({
        ...prev,
        service: selectedPlan,
      }));
    }
  }, [selectedPlan]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Booking submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Plan details for display
  const planDetails = {
    basic: { name: "Basic Clean", price: "$90" },
    deep: { name: "Deep Clean", price: "$150" },
    weekly: { name: "Weekly Service", price: "$120/week" },
  };

  const currentPlan = selectedPlan
    ? planDetails[selectedPlan as keyof typeof planDetails]
    : null;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            Book Your Cleaning Service
          </h1>
          <p className="text-xl text-neutral-600">
            Schedule your cleaning service in just a few simple steps
          </p>
          {currentPlan && (
            <div className="mt-4 inline-block bg-primary-50 border border-primary-200 rounded-xl px-6 py-3">
              <p className="text-primary-700 font-semibold">
                Selected Plan: {currentPlan.name} - {currentPlan.price}
              </p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="flex items-center text-sm font-semibold text-neutral-700 mb-2"
                >
                  <User className="w-4 h-4 mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="flex items-center text-sm font-semibold text-neutral-700 mb-2"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="phone"
                  className="flex items-center text-sm font-semibold text-neutral-700 mb-2"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="flex items-center text-sm font-semibold text-neutral-700 mb-2"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Service Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter service address"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="service"
                className="flex items-center text-sm font-semibold text-neutral-700 mb-2"
              >
                Service Type
                {selectedPlan && (
                  <span className="ml-2 text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                    Pre-selected
                  </span>
                )}
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className={`w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  selectedPlan ? "bg-primary-50 border-primary-300" : ""
                }`}
                required
              >
                <option value="">Select a service</option>
                <option value="basic">Basic Clean - $120/one-time</option>
                <option value="deep">Deep Clean - $200/one-time</option>
                <option value="deep">Move-in/Move-out - $300/one-time</option>
                <option value="weekly">Weekly Service - $90/week</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="date"
                  className="flex items-center text-sm font-semibold text-neutral-700 mb-2"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Preferred Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  title="Select your preferred service date"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="time"
                  className="flex items-center text-sm font-semibold text-neutral-700 mb-2"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Preferred Time
                </label>
                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                >
                  <option value="">Select time</option>
                  <option value="9:00">9:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="13:00">1:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="notes"
                className="flex items-center text-sm font-semibold text-neutral-700 mb-2"
              >
                Additional Notes (Optional)
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Any special instructions or requests..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary-500 hover:bg-primary-600 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            >
              Book Your Service
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Book;
