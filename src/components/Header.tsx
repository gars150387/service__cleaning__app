import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      // If not on home page, navigate to home first
      window.location.href = `/#${sectionId}`;
    } else {
      // If on home page, scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-neutral-200 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="bg-primary-500 p-2 rounded-xl mr-3">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-neutral-900">CleanPro</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('services')} 
              className="text-neutral-600 hover:text-primary-500 transition-colors duration-300"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')} 
              className="text-neutral-600 hover:text-primary-500 transition-colors duration-300"
            >
              How It Works
            </button>
            <Link 
              to="/pricing" 
              className="text-neutral-600 hover:text-primary-500 transition-colors duration-300"
            >
              Pricing
            </Link>
            {/* <button 
              onClick={() => scrollToSection('testimonials')} 
              className="text-neutral-600 hover:text-primary-500 transition-colors duration-300"
            >
              Reviews
            </button> */}
            <Link 
              to="/book" 
              className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            >
              Book Now
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-neutral-900" />
            ) : (
              <Menu className="w-6 h-6 text-neutral-900" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-neutral-200 pt-4">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('services')} 
                className="text-neutral-600 hover:text-primary-500 transition-colors duration-300 text-left"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')} 
                className="text-neutral-600 hover:text-primary-500 transition-colors duration-300 text-left"
              >
                How It Works
              </button>
              <Link 
                to="/pricing" 
                className="text-neutral-600 hover:text-primary-500 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              {/* <button 
                onClick={() => scrollToSection('testimonials')} 
                className="text-neutral-600 hover:text-primary-500 transition-colors duration-300 text-left"
              >
                Reviews
              </button> */}
              <Link 
                to="/book" 
                className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 w-full text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Book Now
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;