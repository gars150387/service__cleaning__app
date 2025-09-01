import React from 'react';
import { Sparkles, Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="bg-primary-500 p-2 rounded-xl mr-3">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">CleanPro</span>
            </div>
            <p className="text-neutral-400 mb-6 leading-relaxed max-w-md">
              Professional cleaning services that make your life easier. We're committed to delivering 
              exceptional results with eco-friendly practices and reliable service.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-6 h-6 text-neutral-400 hover:text-primary-500 cursor-pointer transition-colors duration-300" />
              <Twitter className="w-6 h-6 text-neutral-400 hover:text-primary-500 cursor-pointer transition-colors duration-300" />
              <Instagram className="w-6 h-6 text-neutral-400 hover:text-primary-500 cursor-pointer transition-colors duration-300" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-300">Home Cleaning</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-300">Office Cleaning</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-300">Deep Cleaning</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-300">Move-in/Move-out</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-300">Pricing</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-primary-500 mr-3" />
                <span className="text-neutral-400">(555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-primary-500 mr-3" />
                <span className="text-neutral-400">hello@cleanpro.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-primary-500 mr-3" />
                <span className="text-neutral-400">Serving Greater Metro Area</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-400 text-sm mb-4 md:mb-0">
              © 2025 CleanPro. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-300">Terms of Service</a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-300">Careers</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;