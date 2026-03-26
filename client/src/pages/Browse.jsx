import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { partsAPI } from '../services/api';
import PartCard from '../components/PartCard';
import SearchBar from '../components/SearchBar';
import SkeletonLoader from '../components/SkeletonLoader';

const Browse = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    search: searchParams.get('search') || '',
    make: searchParams.get('make') || '',
    partCategory: searchParams.get('partCategory') || '',
    condition: searchParams.get('condition') || '',
    sortBy: searchParams.get('sortBy') || 'createdAt',
    sortOrder: searchParams.get('sortOrder') || 'desc',
    page: parseInt(searchParams.get('page')) || 1
  });

  const vehicleMakes = [
    'Hero Honda', 'Bajaj', 'Yamaha', 'TVS', 'Kinetic', 'LML', 'Rajdoot',
    'Hindustan Motors', 'Premier', 'Maruti', 'Fiat', 'Tata', 'Daewoo'
  ];

  const partCategories = [
    'Engine', 'Electrical', 'Filters', 'Body', 'Brakes', 'Suspension', 'Transmission', 'Other'
  ];

  const conditions = ['new', 'used', 'refurbished'];

  useEffect(() => {
    fetchParts();
  }, [filters]);

  useEffect(() => {
    // Update URL params when filters change
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    setSearchParams(params);
  }, [filters, setSearchParams]);

  const fetchParts = async () => {
    setLoading(true);
    try {
      const response = await partsAPI.getParts(filters);
      setParts(response.data.parts);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error fetching parts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1 // Reset to first page when filters change
    }));
  };

  const handleSearch = (searchTerm) => {
    handleFilterChange('search', searchTerm);
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      search: '',
      make: '',
      partCategory: '',
      condition: '',
      sortBy: 'createdAt',
      sortOrder: 'desc',
      page: 1
    });
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
          <h1 className="font-display font-bold text-3xl md:text-4xl text-text-navy mb-4">
            Browse Parts
          </h1>
          <SearchBar onSearch={handleSearch} />
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:w-1/4"
          >
            <div className="card p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-semibold text-lg text-text-navy">
                  Filters
                </h3>
                <button
                  onClick={clearFilters}
                  className="text-primary-blue hover:text-blue-700 text-sm font-medium transition-colors duration-200"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-6">
                {/* Vehicle Category */}
                <div>
                  <label className="block text-sm font-medium text-text-navy mb-3">
                    Vehicle Category
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: '', label: 'All Categories' },
                      { value: 'bike', label: '🏍️ Bikes' },
                      { value: 'car', label: '🚗 Cars' }
                    ].map((option) => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          value={option.value}
                          checked={filters.category === option.value}
                          onChange={(e) => handleFilterChange('category', e.target.value)}
                          className="h-4 w-4 text-primary-blue focus:ring-primary-blue border-border-light"
                        />
                        <span className="ml-2 text-sm text-text-navy">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Vehicle Make */}
                <div>
                  <label className="block text-sm font-medium text-text-navy mb-3">
                    Vehicle Make
                  </label>
                  <select
                    value={filters.make}
                    onChange={(e) => handleFilterChange('make', e.target.value)}
                    className="input-field text-sm"
                  >
                    <option value="">All Makes</option>
                    {vehicleMakes.map((make) => (
                      <option key={make} value={make}>{make}</option>
                    ))}
                  </select>
                </div>

                {/* Part Category */}
                <div>
                  <label className="block text-sm font-medium text-text-navy mb-3">
                    Part Category
                  </label>
                  <select
                    value={filters.partCategory}
                    onChange={(e) => handleFilterChange('partCategory', e.target.value)}
                    className="input-field text-sm"
                  >
                    <option value="">All Categories</option>
                    {partCategories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Condition */}
                <div>
                  <label className="block text-sm font-medium text-text-navy mb-3">
                    Condition
                  </label>
                  <div className="space-y-2">
                    {conditions.map((condition) => (
                      <label key={condition} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.condition === condition}
                          onChange={(e) => handleFilterChange('condition', e.target.checked ? condition : '')}
                          className="h-4 w-4 text-primary-blue focus:ring-primary-blue border-border-light rounded"
                        />
                        <span className="ml-2 text-sm text-text-navy capitalize">{condition}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Sort and Results Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6"
            >
              <p className="text-text-muted mb-4 sm:mb-0">
                {pagination.totalParts ? (
                  <>Showing {parts.length} of {pagination.totalParts} parts</>
                ) : (
                  'No parts found'
                )}
              </p>

              <select
                value={`${filters.sortBy}-${filters.sortOrder}`}
                onChange={(e) => {
                  const [sortBy, sortOrder] = e.target.value.split('-');
                  setFilters(prev => ({ ...prev, sortBy, sortOrder }));
                }}
                className="input-field w-auto text-sm"
              >
                <option value="createdAt-desc">Latest First</option>
                <option value="createdAt-asc">Oldest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="views-desc">Most Viewed</option>
              </select>
            </motion.div>

            {/* Parts Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <SkeletonLoader type="card" count={6} />
              </div>
            ) : parts.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {parts.map((part) => (
                  <PartCard key={part._id} part={part} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="card p-12 text-center"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="font-display font-semibold text-xl text-text-navy mb-2">
                  No parts found
                </h3>
                <p className="text-text-muted mb-6">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={clearFilters}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
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
      </div>
    </div>
  );
};

export default Browse;