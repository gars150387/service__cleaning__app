import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Home } from 'lucide-react';

const PaymentSuccess: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-lg p-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-neutral-900 mb-4">
          Payment Successful!
        </h1>
        
        <p className="text-neutral-600 mb-8">
          Thank you for your booking. We'll send you a confirmation email shortly with all the details.
        </p>
        
        <Link
          to="/"
          className="inline-flex items-center justify-center w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105"
        >
          <Home className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;