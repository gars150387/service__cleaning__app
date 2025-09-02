import { Eye, EyeOff, Mail, X } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { initiateAuth, authenticateUser, registerUser, AuthError } from '../services/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: (token: string) => void;
  email: string;
  customerName: string;
}

type AuthStep = 'checking' | 'login' | 'register';

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthenticated,
  email,
  customerName,
}) => {
  const [authStep, setAuthStep] = useState<AuthStep>('checking');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user exists when modal opens
  useEffect(() => {
    if (isOpen && email) {
      checkUserExists();
    }
  }, [isOpen, email]);

  const checkUserExists = async () => {
    if (!email) {
      setError('Email is required');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAuthStep('checking');

    try {
      const { userExists } = await initiateAuth(email);
      setAuthStep(userExists ? 'login' : 'register');
    } catch (err) {
      console.error('Error checking user existence:', err);
      setError('Failed to verify email. Please try again.');
      setAuthStep('register'); // Default to register on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!password) {
      setError('Password is required');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await authenticateUser(email, password);
      onAuthenticated(result.token);
      onClose();
    } catch (err) {
      const authError = err as AuthError;
      setError(authError.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!password) {
      setError('Password is required');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await registerUser(email, password);
      onAuthenticated(result.token);
      onClose();
    } catch (err) {
      const authError = err as AuthError;
      setError(authError.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authStep === 'login') {
      handleLogin();
    } else if (authStep === 'register') {
      handleRegister();
    }
  };

  const resetModal = () => {
    setPassword('');
    setConfirmPassword('');
    setShowPassword(false);
    setError(null);
    setAuthStep('checking');
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative">
        <button
          title="Close modal"
          onClick={handleClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 transition-colors"
          disabled={isLoading}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            {authStep === 'checking' && 'Verifying Account'}
            {authStep === 'login' && 'Welcome Back!'}
            {authStep === 'register' && 'Create Account'}
          </h2>
          <p className="text-neutral-600 text-sm">
            {authStep === 'checking' && 'Please wait while we check your account...'}
            {authStep === 'login' && 'Please enter your password to continue.'}
            {authStep === 'register' && 'Create a secure account to proceed with your booking.'}
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-neutral-50 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-neutral-400" />
              <div>
                <p className="font-medium text-neutral-900">{customerName}</p>
                <p className="text-sm text-neutral-600">{email}</p>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {authStep === 'checking' && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            </div>
          )}

          {(authStep === 'login' || authStep === 'register') && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder={authStep === 'login' ? 'Enter your password' : 'Create a password'}
                    required
                    disabled={isLoading}
                    minLength={authStep === 'register' ? 6 : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {authStep === 'register' && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Confirm your password"
                    required
                    disabled={isLoading}
                    minLength={6}
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                  isLoading
                    ? 'bg-neutral-400 cursor-not-allowed'
                    : 'bg-primary-500 hover:bg-primary-600 hover:scale-105'
                } text-white`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {authStep === 'login' ? 'Signing In...' : 'Creating Account...'}
                  </div>
                ) : (
                  authStep === 'login' ? 'Sign In & Continue' : 'Create Account & Continue'
                )}
              </button>
            </form>
          )}

          {authStep === 'login' && (
            <div className="text-center">
              <button
                onClick={() => setAuthStep('register')}
                className="text-sm text-primary-600 hover:text-primary-700 underline"
                disabled={isLoading}
              >
                Don't have an account? Create one instead
              </button>
            </div>
          )}

          <div className="text-center">
            <p className="text-xs text-neutral-500">
              🔒 Your information is encrypted and secure.
              <br />
              {authStep === 'register' && 'Your account will be created automatically.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;