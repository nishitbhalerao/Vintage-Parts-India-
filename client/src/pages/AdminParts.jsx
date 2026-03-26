import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { adminAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const AdminParts = () => {
  const { user } = useAuth();
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    status: 'all',
    verification: 'all',
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  // Redirect if not admin
  if (!user?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    fetchParts();
  }, [filters]);

  const fetchParts = async () => {
    setLoading(true);
    try {
      const response = await adminAPI.getAllParts(filters);
      setParts(response.data.parts);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error fetching parts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePart = async (partId, partTitle) => {
    if (window.confirm(`Are you sure you want to delete "${partTitle}"?`)) {
      try {
        await adminAPI.deletePart(partId);
        setParts(prev => prev.filter(p => p._id !== partId));
        alert('Part deleted successfully');
      } catch (error) {
        console.error('Error deleting part:', error);
        alert('Failed to delete part');
      }
    }
  };

  const handleToggleFeatured = async (partId) => {
    try {
      await adminAPI.togglePartFeatured(partId);
      setParts(prev => prev.map(p => 
        p._id === partId ? { ...p, isFeatured: !p.isFeatured } : p
      ));
    } catch (error) {
      console.error('Error toggling featured:', error);
      alert('Failed to update featured status');
    }
  };

  const handleVerificationUpdate = async (partId, status, notes = '') => {
    try {
      await adminAPI.updatePartVerification(partId, {
        verificationStatus: status,
        adminNotes: notes
      });
      setParts(prev => prev.map(p => 
        p._id === partId ? { ...p, verificationStatus: status, adminNotes: notes } : p
      ));
    } catch (error) {
      console.error('Error updating verification:', error);
      alert('Failed to update verification status');
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1
    }));
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  const getVerificationBadgeColor = (status) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-background-offWhite py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <nav className="flex items-center space-x-2 text-sm text-text-muted mb-4">
                <Link to="/admin" className="hover:text-primary-blue">Admin</Link>
                <span>/</span>
                <span className="text-text-navy">Parts</span>
              </nav>
              <h1 className="font-display font-bold text-3xl md:text-4xl text-text-navy mb-2">
                📦 Parts Management
              </h1>
              <p className="text-text-muted">
                Manage, verify, and moderate all parts listings
              </p>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="card p-6 mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-navy mb-2">
                Search Parts
              </label>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                placeholder="Title, make, model..."
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-navy mb-2">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="input-field"
              >
                <option value="all">All Categories</option>
                <option value="bike">Bikes</option>
                <option value="car">Cars</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-navy mb-2">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="input-field"
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="sold">Sold</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-navy mb-2">
                Verification
              </label>
              <select
                value={filters.verification}
                onChange={(e) => handleFilterChange('verification', e.target.value)}
                className="input-field"
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="verified">Verified</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-navy mb-2">
                Sort By
              </label>
              <select
                value={`${filters.sortBy}-${filters.sortOrder}`}
                onChange={(e) => {
                  const [sortBy, sortOrder] = e.target.value.split('-');
                  setFilters(prev => ({ ...prev, sortBy, sortOrder }));
                }}
                className="input-field"
              >
                <option value="createdAt-desc">Newest First</option>
                <option value="createdAt-asc">Oldest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="views-desc">Most Viewed</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Results Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <p className="text-text-muted">
            Showing {parts.length} of {pagination.totalParts || 0} parts
          </p>
        </motion.div>

        {/* Parts List */}
        {loading ? (
          <div className="card p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue mx-auto"></div>
            <p className="text-text-muted mt-4">Loading parts...</p>
          </div>
        ) : parts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            {parts.map((part) => (
              <div key={part._id} className="card p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Image */}
                  <div className="w-full lg:w-32 h-32 flex-shrink-0">
                    {part.images && part.images.length > 0 ? (
                      <img
                        src={`http://localhost:5000${part.images[0]}`}
                        alt={part.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-3xl">
                          {part.vehicleCategory === 'bike' ? '🏍️' : '🚗'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-col lg:flex-row justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-display font-semibold text-lg text-text-navy">
                            {part.title}
                          </h3>
                          {part.isFeatured && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              ⭐ Featured
                            </span>
                          )}
                        </div>
                        
                        <p className="text-text-muted mb-2">
                          {part.vehicleMake} {part.vehicleModel} • {part.partCategory}
                        </p>
                        
                        <div className="flex items-center space-x-4 text-sm text-text-muted mb-3">
                          <span>By: {part.seller?.name}</span>
                          <span>{part.views} views</span>
                          <span>{new Date(part.createdAt).toLocaleDateString()}</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getVerificationBadgeColor(part.verificationStatus)}`}>
                            {part.verificationStatus}
                          </span>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            part.isAvailable ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {part.isAvailable ? 'Available' : 'Sold'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-right mt-4 lg:mt-0">
                        <div className="font-mono font-bold text-xl text-primary-blue mb-2">
                          {formatPrice(part.price)}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      <Link
                        to={`/parts/${part._id}`}
                        className="btn-secondary text-sm px-4 py-2"
                      >
                        View Details
                      </Link>
                      
                      <button
                        onClick={() => handleToggleFeatured(part._id)}
                        className={`text-sm px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                          part.isFeatured
                            ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                            : 'bg-gray-100 text-text-navy hover:bg-gray-200'
                        }`}
                      >
                        {part.isFeatured ? 'Unfeature' : 'Feature'}
                      </button>

                      {part.verificationStatus === 'pending' && (
                        <>
                          <button
                            onClick={() => handleVerificationUpdate(part._id, 'verified')}
                            className="text-sm px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium hover:bg-green-200 transition-colors duration-200"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => {
                              const notes = prompt('Rejection reason (optional):');
                              handleVerificationUpdate(part._id, 'rejected', notes || '');
                            }}
                            className="text-sm px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition-colors duration-200"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      
                      <button
                        onClick={() => handleDeletePart(part._id, part.title)}
                        className="text-sm px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition-colors duration-200"
                      >
                        Delete
                      </button>
                    </div>

                    {part.adminNotes && (
                      <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm text-yellow-800">
                          <strong>Admin Notes:</strong> {part.adminNotes}
                        </p>
                      </div>
                    )}
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
              No parts found
            </h3>
            <p className="text-text-muted">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center mt-8"
          >
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={!pagination.hasPrev}
                className="px-4 py-2 border border-border-light rounded-lg text-text-navy hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Previous
              </button>
              
              <span className="px-4 py-2 text-text-muted">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              
              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={!pagination.hasNext}
                className="px-4 py-2 border border-border-light rounded-lg text-text-navy hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Next
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminParts;