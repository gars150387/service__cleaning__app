import { Calendar, Clock, Mail, MapPin, Phone, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AuthModal from "../components/AuthModal";
import { createCheckoutSession, PaymentData } from "../services/paymentService";

const Book = () => {
  const [searchParams] = useSearchParams();
  const selectedPlan = searchParams.get("plan");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);

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

  // Service pricing mapping
  const servicePricing = {
    basic: { name: "Basic Clean", price: 12000, isRecurring: false },
    deep: { name: "Deep Clean", price: 20000, isRecurring: false },
    "move-in-out": { name: "Move-in/Move-out", price: 30000, isRecurring: false },
    weekly: { name: "Weekly Service", price: 9000, isRecurring: true, interval: "month" as const },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.service || !formData.date || !formData.time) {
      setError("Please fill in all required fields");
      return;
    }

    // Show auth modal if not authenticated
    if (!authToken) {
      setShowAuthModal(true);
      return;
    }

    await processPayment();
  };

  const processPayment = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Get service details
      const serviceDetails = servicePricing[formData.service as keyof typeof servicePricing];
      if (!serviceDetails) {
        throw new Error("Invalid service selected");
      }

      // Prepare payment data
      const paymentData: PaymentData = {
        serviceId: formData.service,
        serviceName: serviceDetails.name,
        amount: serviceDetails.price,
        isRecurring: serviceDetails.isRecurring,
        interval: serviceDetails?.interval,
        customerEmail: formData.email,
        customerName: formData.name,
        metadata: {
          phone: formData.phone,
          address: formData.address,
          preferredDate: formData.date,
          preferredTime: formData.time,
          notes: formData.notes || "",
          bookingId: `booking_${Date.now()}`,
        },
      };

      // Create checkout session
      const checkoutSession = await createCheckoutSession(paymentData);

      // Store booking data in localStorage for later retrieval
      localStorage.setItem('pendingBooking', JSON.stringify({
        ...formData,
        sessionId: checkoutSession.sessionId,
        amount: serviceDetails.price,
        serviceName: serviceDetails.name,
        timestamp: new Date().toISOString(),
      }));

      // Redirect to Stripe Checkout
      window.location.href = checkoutSession.url;

    } catch (err) {
      console.error('Error creating checkout session:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while processing your booking');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthenticated = (token: string) => {
    setAuthToken(token);
    // Automatically proceed to payment after authentication
    setTimeout(() => processPayment(), 100);
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
    // Clear error when user starts typing
    if (error) setError(null);
  };

  // Plan details for display
  const planDetails = {
    basic: { name: "Basic Clean", price: "$120" },
    deep: { name: "Deep Clean", price: "$200" },
    "move-in-out": { name: "Move-in/Move-out", price: "$300" },
    weekly: { name: "Weekly Service", price: "$90/week" },
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
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="flex items-center text-sm font-semibold text-neutral-700 mb-2"
                >
                  <User className="w-4 h-4 mr-2" />
                  Full Name *
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
                  disabled={isLoading}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="flex items-center text-sm font-semibold text-neutral-700 mb-2"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email Address *
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
                  disabled={isLoading}
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
                  Phone Number *
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
                  disabled={isLoading}
                />
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="flex items-center text-sm font-semibold text-neutral-700 mb-2"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Service Address *
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
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="service"
                className="flex items-center text-sm font-semibold text-neutral-700 mb-2"
              >
                Service Type *
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
                disabled={isLoading}
              >
                <option value="">Select a service</option>
                <option value="basic">Basic Clean - $120/one-time</option>
                <option value="deep">Deep Clean - $200/one-time</option>
                <option value="move-in-out">Move-in/Move-out - $300/one-time</option>
                {/* <option value="weekly">Weekly Service - $90/week</option> */}
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="date"
                  className="flex items-center text-sm font-semibold text-neutral-700 mb-2"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Preferred Date *
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]} // Prevent past dates
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  title="Select your preferred service date"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label
                  htmlFor="time"
                  className="flex items-center text-sm font-semibold text-neutral-700 mb-2"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Preferred Time *
                </label>
                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                  disabled={isLoading}
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
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                isLoading
                  ? "bg-neutral-400 cursor-not-allowed"
                  : "bg-primary-500 hover:bg-primary-600 hover:scale-105"
              } text-white`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : authToken ? (
                "Proceed to Payment"
              ) : (
                "Continue to Secure Payment"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-500">
              🔒 Your payment information is secure and encrypted.
              <br />
              You'll be redirected to Stripe for secure payment processing.
            </p>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthenticated={handleAuthenticated}
        email={formData.email}
        customerName={formData.name}
      />
    </div>
  );
};

export default Book;
