import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { partsAPI } from '../services/api';
import SkeletonLoader from '../components/SkeletonLoader';

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, available, sold

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await partsAPI.getMyListings();
      setListings(response.data);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        await partsAPI.deletePart(id);
        setListings(prev => prev.filter(listing => listing._id !== id));
      } catch (error) {
        console.error('Error deleting listing:', error);
        alert('Failed to delete listing');
      }
    }
  };

  const toggleAvailability = async (id, currentStatus) => {
    try {
      const formData = new FormData();
      formData.append('isAvailable', !currentStatus);
      
      await partsAPI.updatePart(id, formData);
      setListings(prev => prev.map(listing => 
        listing._id === id 
          ? { ...listing, isAvailable: !currentStatus }
          : listing
      ));
    } catch (error) {
      console.error('Error updating listing:', error);
      alert('Failed to update listing');
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const getVehicleIcon = (category) => {
    return category === 'bike' ? '🏍️' : '🚗';
  };

  const filteredListings = listings.filter(listing => {
    if (filter === 'available') return listing.isAvailable;
    if (filter === 'sold') return !listing.isAvailable;
    return true;
  });

  const stats = {
    total: listings.length,
    available: listings.filter(l => l.isAvailable).length,
    sold: listings.filter(l => !l.isAvailable).length,
    totalViews: listings.reduce((sum, l) => sum + l.views, 0)
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background-offWhite py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SkeletonLoader type="list" count={5} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-offWhite py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8"
        >
          <div>
            <h1 className="font-display font-bold text-3xl md:text-4xl text-text-navy mb-2">
              My Listings
            </h1>
            <p className="text-text-muted">
              Manage your parts listings
            </p>
          </div>
          <Link to="/add-part" className="btn-primary mt-4 sm:mt-0">
            Add New Part
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="card p-4 text-center">
            <div className="font-mono font-bold text-2xl text-text-navy">{stats.total}</div>
            <div className="text-sm text-text-muted">Total Listings</div>
          </div>
          <div className="card p-4 text-center">
            <div className="font-mono font-bold text-2xl text-success">{stats.available}</div>
            <div className="text-sm text-text-muted">Available</div>
          </div>
          <div className="card p-4 text-center">
            <div className="font-mono font-bold text-2xl text-text-muted">{stats.sold}</div>
            <div className="text-sm text-text-muted">Sold</div>
          </div>
          <div className="card p-4 text-center">
            <div className="font-mono font-bold text-2xl text-primary-blue">{stats.totalViews}</div>
            <div className="text-sm text-text-muted">Total Views</div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex space-x-4 mb-6"
        >
          {[
            { key: 'all', label: 'All Listings' },
            { key: 'available', label: 'Available' },
            { key: 'sold', label: 'Sold' }
          ].map((filterOption) => (
            <button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                filter === filterOption.key
                  ? 'bg-primary-blue text-white'
                  : 'bg-white text-text-navy hover:bg-gray-50'
              }`}
            >
              {filterOption.label}
            </button>
          ))}
        </motion.div>

        {/* Listings */}
        {filteredListings.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            {filteredListings.map((listing) => (
              <div key={listing._id} className="card p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Image */}
                  <div className="w-full md:w-32 h-32 flex-shrink-0">
                    {listing.images && listing.images.length > 0 ? (
                      <img
                        src={`http://localhost:5000${listing.images[0]}`}
                        alt={listing.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-3xl">{getVehicleIcon(listing.vehicleCategory)}</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
                      <div>
                        <h3 className="font-display font-semibold text-xl text-text-navy mb-2">
                          {listing.title}
                        </h3>
                        <p className="text-text-muted mb-2">
                          {listing.vehicleMake} {listing.vehicleModel}
                          {listing.vehicleYear && ` (${listing.vehicleYear})`}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-text-muted">
                          <span>{listing.views} views</span>
                          <span>Listed {new Date(listing.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <div className="text-right mt-4 sm:mt-0">
                        <div className="font-mono font-bold text-xl text-primary-blue mb-2">
                          {formatPrice(listing.price)}
                        </div>
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          listing.isAvailable 
                            ? 'bg-success/10 text-success' 
                            : 'bg-gray-100 text-text-muted'
                        }`}>
                          {listing.isAvailable ? 'Available' : 'Sold'}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      <Link
                        to={`/parts/${listing._id}`}
                        className="btn-secondary text-sm px-4 py-2"
                      >
                        View Details
                      </Link>
                      
                      <button
                        onClick={() => toggleAvailability(listing._id, listing.isAvailable)}
                        className={`text-sm px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                          listing.isAvailable
                            ? 'bg-gray-100 text-text-navy hover:bg-gray-200'
                            : 'bg-success text-white hover:bg-green-600'
                        }`}
                      >
                        {listing.isAvailable ? 'Mark as Sold' : 'Mark as Available'}
                      </button>
                      
                      <button
                        onClick={() => handleDelete(listing._id)}
                        className="text-sm px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition-colors duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="card p-12 text-center"
          >
            <div className="text-6xl mb-4">📦</div>
            <h3 className="font-display font-semibold text-xl text-text-navy mb-2">
              {filter === 'all' ? 'No listings yet' : `No ${filter} listings`}
            </h3>
            <p className="text-text-muted mb-6">
              {filter === 'all' 
                ? 'Start by creating your first listing'
                : `You don't have any ${filter} listings at the moment`
              }
            </p>
            {filter === 'all' && (
              <Link to="/add-part" className="btn-primary">
                Create Your First Listing
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyListings;