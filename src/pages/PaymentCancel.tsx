import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle, ArrowLeft } from 'lucide-react';

const PaymentCancel: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-lg p-8 text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-10 h-10 text-red-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-neutral-900 mb-4">
          Payment Cancelled
        </h1>
        
        <p className="text-neutral-600 mb-8">
          Your payment was cancelled. No charges were made to your account.
        </p>
        
        <div className="space-y-3">
          <Link
            to="/book"
            className="inline-flex items-center justify-center w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Try Again
          </Link>
          
          <Link
            to="/"
            className="inline-flex items-center justify-center w-full bg-neutral-200 hover:bg-neutral-300 text-neutral-700 py-3 rounded-2xl font-semibold transition-all duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;