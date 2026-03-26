import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl">🔧</span>
            <span className="font-display font-bold text-xl text-text-navy">
              VintageParts India
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-text-navy hover:text-primary-blue transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/browse"
              className="text-text-navy hover:text-primary-blue transition-colors duration-200"
            >
              Browse Parts
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/add-part"
                  className="text-text-navy hover:text-primary-blue transition-colors duration-200"
                >
                  Add a Part
                </Link>
                <Link
                  to="/my-listings"
                  className="text-text-navy hover:text-primary-blue transition-colors duration-200"
                >
                  My Listings
                </Link>
                {user?.isAdmin && (
                  <Link
                    to="/admin"
                    className="text-warning hover:text-red-600 transition-colors duration-200 font-medium"
                  >
                    🛡️ Admin
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 text-text-navy hover:text-primary-blue transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-primary-blue rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium">{user?.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-text-muted hover:text-text-navy transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-text-navy hover:text-primary-blue transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-text-navy hover:text-primary-blue transition-colors duration-200"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-border-light">
              <Link
                to="/"
                className="block px-3 py-2 text-text-navy hover:text-primary-blue transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/browse"
                className="block px-3 py-2 text-text-navy hover:text-primary-blue transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Parts
              </Link>
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="block px-3 py-2 text-text-navy hover:text-primary-blue transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/add-part"
                    className="block px-3 py-2 text-text-navy hover:text-primary-blue transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Add a Part
                  </Link>
                  <Link
                    to="/my-listings"
                    className="block px-3 py-2 text-text-navy hover:text-primary-blue transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Listings
                  </Link>
                  {user?.isAdmin && (
                    <Link
                      to="/admin"
                      className="block px-3 py-2 text-warning hover:text-red-600 transition-colors duration-200 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      🛡️ Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-text-muted hover:text-text-navy transition-colors duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-text-navy hover:text-primary-blue transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 text-primary-blue font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;