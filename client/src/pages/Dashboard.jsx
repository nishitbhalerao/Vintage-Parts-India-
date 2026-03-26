import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { partsAPI } from '../services/api';
import PartCard from '../components/PartCard';

const Dashboard = () => {
  const { user } = useAuth();
  const [recentListings, setRecentListings] = useState([]);
  const [stats, setStats] = useState({
    totalListings: 0,
    totalViews: 0,
    activeListings: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await partsAPI.getMyListings();
      const listings = response.data;
      
      setRecentListings(listings.slice(0, 3));
      setStats({
        totalListings: listings.length,
        totalViews: listings.reduce((sum, part) => sum + part.views, 0),
        activeListings: listings.filter(part => part.isAvailable).length
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const actionCards = [
    {
      title: 'Browse Parts',
      description: 'Find the part you need from our listings',
      icon: '🔍',
      link: '/browse',
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
    },
    {
      title: 'List a Part',
      description: 'Have a part to sell? Add it to our marketplace',
      icon: '➕',
      link: '/add-part',
      color: 'bg-green-50 border-green-200 hover:bg-green-100'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background-offWhite flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-offWhite py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="font-display font-bold text-3xl md:text-4xl text-text-navy mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-text-muted text-lg">
            Here's what's happening with your account
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-muted text-sm font-medium">Total Listings</p>
                <p className="font-mono font-bold text-2xl text-text-navy">{stats.totalListings}</p>
              </div>
              <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
                <span className="text-2xl">📦</span>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-muted text-sm font-medium">Total Views</p>
                <p className="font-mono font-bold text-2xl text-text-navy">{stats.totalViews}</p>
              </div>
              <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
                <span className="text-2xl">👁️</span>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-muted text-sm font-medium">Active Listings</p>
                <p className="font-mono font-bold text-2xl text-text-navy">{stats.activeListings}</p>
              </div>
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          {actionCards.map((card, index) => (
            <Link
              key={index}
              to={card.link}
              className={`card p-8 border-2 transition-all duration-300 hover:-translate-y-1 ${card.color}`}
            >
              <div className="text-center">
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="font-display font-semibold text-xl text-text-navy mb-2">
                  {card.title}
                </h3>
                <p className="text-text-muted">
                  {card.description}
                </p>
              </div>
            </Link>
          ))}
        </motion.div>

        {/* Recent Listings */}
        {recentListings.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-2xl text-text-navy">
                Your Recent Listings
              </h2>
              <Link
                to="/my-listings"
                className="text-primary-blue hover:text-blue-700 font-medium transition-colors duration-200"
              >
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentListings.map((part) => (
                <PartCard key={part._id} part={part} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {recentListings.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="card p-12 text-center"
          >
            <div className="text-6xl mb-4">🔧</div>
            <h3 className="font-display font-semibold text-xl text-text-navy mb-2">
              No listings yet
            </h3>
            <p className="text-text-muted mb-6">
              Start by listing your first part or browse available parts
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/add-part" className="btn-primary">
                List Your First Part
              </Link>
              <Link to="/browse" className="btn-secondary">
                Browse Parts
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;