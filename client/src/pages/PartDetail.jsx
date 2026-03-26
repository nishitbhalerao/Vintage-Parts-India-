import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { partsAPI } from '../services/api';
import PartCard from '../components/PartCard';
import SkeletonLoader from '../components/SkeletonLoader';

const PartDetail = () => {
  const { id } = useParams();
  const [part, setPart] = useState(null);
  const [similarParts, setSimilarParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPartDetail();
  }, [id]);

  const fetchPartDetail = async () => {
    try {
      const response = await partsAPI.getPartById(id);
      setPart(response.data);
      
      // Fetch similar parts
      const similarResponse = await partsAPI.getParts({
        category: response.data.vehicleCategory,
        limit: 4
      });
      setSimilarParts(similarResponse.data.parts.filter(p => p._id !== id));
    } catch (error) {
      setError('Part not found');
      console.error('Error fetching part:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'new':
        return 'bg-success text-white';
      case 'used':
        return 'bg-warning text-white';
      case 'refurbished':
        return 'bg-primary-blue text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getVehicleIcon = (category) => {
    return category === 'bike' ? '🏍️' : '🚗';
  };

  const generateWhatsAppMessage = () => {
    const message = `Hi, I found your listing on VintageParts India. I'm interested in ${part.title} for ${formatPrice(part.price)}. Is it still available?`;
    return `https://wa.me/91${part.sellerPhone}?text=${encodeURIComponent(message)}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background-offWhite py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SkeletonLoader type="text" count={10} />
        </div>
      </div>
    );
  }

  if (error || !part) {
    return (
      <div className="min-h-screen bg-background-offWhite flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="font-display font-bold text-2xl text-text-navy mb-2">
            Part Not Found
          </h2>
          <p className="text-text-muted mb-6">
            The part you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/browse" className="btn-primary">
            Browse Other Parts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-offWhite py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <div className="flex items-center space-x-2 text-sm text-text-muted">
            <Link to="/" className="hover:text-primary-blue transition-colors duration-200">
              Home
            </Link>
            <span>/</span>
            <Link to="/browse" className="hover:text-primary-blue transition-colors duration-200">
              Browse Parts
            </Link>
            <span>/</span>
            <span className="text-text-navy">{part.title}</span>
          </div>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="card p-0 overflow-hidden mb-6"
            >
              <div className="relative">
                {part.images && part.images.length > 0 ? (
                  <>
                    <img
                      src={`http://localhost:5000${part.images[currentImageIndex]}`}
                      alt={part.title}
                      className="w-full h-96 object-cover"
                    />
                    {part.images.length > 1 && (
                      <>
                        <button
                          onClick={() => setCurrentImageIndex(prev => 
                            prev === 0 ? part.images.length - 1 : prev - 1
                          )}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors duration-200"
                        >
                          ←
                        </button>
                        <button
                          onClick={() => setCurrentImageIndex(prev => 
                            prev === part.images.length - 1 ? 0 : prev + 1
                          )}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors duration-200"
                        >
                          →
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-96 bg-gray-100 flex items-center justify-center">
                    <span className="text-8xl">{getVehicleIcon(part.vehicleCategory)}</span>
                  </div>
                )}

                {/* Image Indicators */}
                {part.images && part.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {part.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Thumbnail Strip */}
              {part.images && part.images.length > 1 && (
                <div className="p-4 flex space-x-2 overflow-x-auto">
                  {part.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors duration-200 ${
                        index === currentImageIndex ? 'border-primary-blue' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={`http://localhost:5000${image}`}
                        alt={`${part.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Part Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="card p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <h1 className="font-display font-bold text-2xl md:text-3xl text-text-navy">
                  {part.title}
                </h1>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-light text-primary-blue">
                    {getVehicleIcon(part.vehicleCategory)} {part.vehicleCategory === 'bike' ? 'Bike' : 'Car'}
                  </span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize ${getConditionColor(part.condition)}`}>
                    {part.condition}
                  </span>
                </div>
              </div>

              {/* Vehicle Info */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-text-navy">
                  {part.vehicleMake}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-text-navy">
                  {part.vehicleModel}
                </span>
                {part.vehicleYear && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-text-navy">
                    {part.vehicleYear}
                  </span>
                )}
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-text-navy">
                  {part.partCategory}
                </span>
              </div>

              {part.partNumber && (
                <div className="mb-6">
                  <span className="text-sm text-text-muted">Part Number: </span>
                  <span className="font-mono text-text-navy">{part.partNumber}</span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-display font-semibold text-lg text-text-navy mb-3">
                  Description
                </h3>
                <p className="text-text-muted leading-relaxed">
                  {part.description}
                </p>
              </div>

              <div className="flex items-center justify-between text-sm text-text-muted">
                <span>{part.views} views</span>
                <span>Listed {new Date(part.createdAt).toLocaleDateString()}</span>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Price & Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card p-6 sticky top-24"
            >
              <div className="text-center mb-6">
                <div className="font-mono font-bold text-3xl text-primary-blue mb-2">
                  {formatPrice(part.price)}
                </div>
                {part.negotiable && (
                  <span className="text-sm text-text-muted">Negotiable</span>
                )}
              </div>

              <div className="border-t border-border-light pt-6">
                <h3 className="font-display font-semibold text-lg text-text-navy mb-4">
                  Seller Information
                </h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-blue rounded-full flex items-center justify-center text-white font-medium">
                      {part.sellerName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-text-navy">{part.sellerName}</div>
                      <div className="text-sm text-text-muted">{part.sellerAddress}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <a
                    href={`tel:+91${part.sellerPhone}`}
                    className="block w-full btn-primary text-center"
                  >
                    📞 Call Seller
                  </a>
                  
                  <a
                    href={generateWhatsAppMessage()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full btn-secondary text-center"
                  >
                    💬 WhatsApp
                  </a>
                </div>

                <div className="mt-4 text-xs text-text-muted text-center">
                  Phone: +91 {part.sellerPhone}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Similar Parts */}
        {similarParts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12"
          >
            <h2 className="font-display font-bold text-2xl text-text-navy mb-6">
              Similar Parts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarParts.map((similarPart) => (
                <PartCard key={similarPart._id} part={similarPart} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PartDetail;