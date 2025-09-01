import { Calendar, CreditCard, History, Star } from 'lucide-react';
import React from 'react';

const DashboardPreviews: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Customer Dashboard */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
              Easy Customer Experience
            </h2>
            <p className="text-xl text-neutral-500 max-w-2xl mx-auto">
              Manage your cleaning services with our intuitive platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-neutral-100 p-6 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <Calendar className="w-8 h-8 text-primary-500 mb-4" />
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Request Service</h3>
              <p className="text-sm text-neutral-500 mb-4">Book your cleaning in seconds</p>
              <div className="bg-white p-3 rounded-xl border border-neutral-200">
                <div className="text-xs text-neutral-400 mb-1">Next Available</div>
                <div className="text-sm font-semibold text-neutral-900">Tomorrow 2:00 PM</div>
              </div>
            </div>

            <div className="bg-neutral-100 p-6 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CreditCard className="w-8 h-8 text-secondary-500 mb-4" />
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Payment & Tips</h3>
              <p className="text-sm text-neutral-500 mb-4">Secure, contactless payments</p>
              <div className="bg-white p-3 rounded-xl border border-neutral-200">
                <div className="text-xs text-neutral-400 mb-1">Total</div>
                <div className="text-sm font-semibold text-neutral-900">$95.00</div>
              </div>
            </div>

            <div className="bg-neutral-100 p-6 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <Star className="w-8 h-8 text-secondary-500 mb-4" />
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Write Review</h3>
              <p className="text-sm text-neutral-500 mb-4">Share your experience</p>
              <div className="bg-white p-3 rounded-xl border border-neutral-200">
                <div className="flex space-x-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-secondary-500 text-secondary-500" />
                  ))}
                </div>
                <div className="text-xs text-neutral-400">Rate your cleaner</div>
              </div>
            </div>

            <div className="bg-neutral-100 p-6 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <History className="w-8 h-8 text-primary-500 mb-4" />
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Service History</h3>
              <p className="text-sm text-neutral-500 mb-4">Track all your bookings</p>
              <div className="bg-white p-3 rounded-xl border border-neutral-200">
                <div className="text-xs text-neutral-400 mb-1">Last Service</div>
                <div className="text-sm font-semibold text-neutral-900">March 15, 2025</div>
              </div>
            </div>
          </div>
        </div>

        {/* Staff Dashboard */}
        {/* <div>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
              Professional Staff Tools
            </h2>
            <p className="text-xl text-neutral-500 max-w-2xl mx-auto">
              Empowering our cleaners with modern technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-neutral-100 p-6 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CheckCircle className="w-8 h-8 text-primary-500 mb-4" />
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Check Requests</h3>
              <p className="text-sm text-neutral-500 mb-4">View upcoming appointments</p>
              <div className="bg-white p-3 rounded-xl border border-neutral-200">
                <div className="text-xs text-neutral-400 mb-1">Today</div>
                <div className="text-sm font-semibold text-neutral-900">3 appointments</div>
              </div>
            </div>

            <div className="bg-neutral-100 p-6 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <X className="w-8 h-8 text-secondary-500 mb-4" />
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Manage Bookings</h3>
              <p className="text-sm text-neutral-500 mb-4">Confirm, cancel, or refund</p>
              <div className="bg-white p-3 rounded-xl border border-neutral-200 flex space-x-2">
                <button className="text-xs bg-primary-500 text-white px-2 py-1 rounded">Confirm</button>
                <button className="text-xs bg-neutral-200 text-neutral-600 px-2 py-1 rounded">Cancel</button>
              </div>
            </div>

            <div className="bg-neutral-100 p-6 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <Clock className="w-8 h-8 text-primary-500 mb-4" />
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Availability</h3>
              <p className="text-sm text-neutral-500 mb-4">Set your working hours</p>
              <div className="bg-white p-3 rounded-xl border border-neutral-200">
                <div className="text-xs text-neutral-400 mb-1">This Week</div>
                <div className="text-sm font-semibold text-neutral-900">32 hours available</div>
              </div>
            </div>

            <div className="bg-neutral-100 p-6 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <BarChart3 className="w-8 h-8 text-secondary-500 mb-4" />
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Earnings</h3>
              <p className="text-sm text-neutral-500 mb-4">Track your income</p>
              <div className="bg-white p-3 rounded-xl border border-neutral-200">
                <div className="text-xs text-neutral-400 mb-1">This Month</div>
                <div className="text-sm font-semibold text-neutral-900">$1,240</div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default DashboardPreviews;