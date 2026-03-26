import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-text-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🔧</span>
              <span className="font-display font-bold text-xl">
                VintageParts India
              </span>
            </div>
            <p className="text-gray-300 mb-4">
              India's first marketplace connecting buyers and sellers of discontinued automobile spare parts. 
              Find rare parts for your vintage bikes and cars.
            </p>
            <div className="flex items-center space-x-2">
              <span>Made in India</span>
              <span className="text-xl">🇮🇳</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/browse" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Browse Parts
                </Link>
              </li>
              <li>
                <Link to="/add-part" className="text-gray-300 hover:text-white transition-colors duration-200">
                  List a Part
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Join Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/browse?category=bike" className="text-gray-300 hover:text-white transition-colors duration-200">
                  🏍️ Bikes & Two-wheelers
                </Link>
              </li>
              <li>
                <Link to="/browse?category=car" className="text-gray-300 hover:text-white transition-colors duration-200">
                  🚗 Cars & Four-wheelers
                </Link>
              </li>
              <li>
                <span className="text-gray-300">Engine Parts</span>
              </li>
              <li>
                <span className="text-gray-300">Electrical Parts</span>
              </li>
              <li>
                <span className="text-gray-300">Body Parts</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © 2024 VintageParts India. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;