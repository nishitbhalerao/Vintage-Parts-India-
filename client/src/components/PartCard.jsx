import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PartCard = ({ part }) => {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card p-0 overflow-hidden"
    >
      {/* Image */}
      <div className="relative h-48 bg-gray-100">
        {part.images && part.images.length > 0 ? (
          <img
            src={`http://localhost:5000${part.images[0]}`}
            alt={part.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = `data:image/svg+xml,${encodeURIComponent(`
                <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                  <rect width="200" height="200" fill="#f3f4f6"/>
                  <text x="100" y="100" text-anchor="middle" dy=".3em" font-size="60">
                    ${getVehicleIcon(part.vehicleCategory)}
                  </text>
                </svg>
              `)}`;
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <span className="text-6xl">{getVehicleIcon(part.vehicleCategory)}</span>
          </div>
        )}
        
        {/* Vehicle Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/90 text-text-navy">
            {getVehicleIcon(part.vehicleCategory)} {part.vehicleCategory === 'bike' ? 'Bike' : 'Car'}
          </span>
        </div>

        {/* Condition Badge */}
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize ${getConditionColor(part.condition)}`}>
            {part.condition}
          </span>
        </div>

        {/* Featured Badge */}
        {part.isFeatured && (
          <div className="absolute bottom-3 left-3">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-400 text-yellow-900">
              ⭐ Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display font-semibold text-lg text-text-navy mb-2 line-clamp-2">
          {part.title}
        </h3>
        
        <p className="text-text-muted text-sm mb-3">
          {part.vehicleMake} {part.vehicleModel}
          {part.vehicleYear && ` (${part.vehicleYear})`}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="font-mono font-bold text-xl text-primary-blue">
              {formatPrice(part.price)}
            </span>
            {part.negotiable && (
              <span className="text-xs text-text-muted ml-2">Negotiable</span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-text-muted mb-4">
          <span>{part.sellerName}</span>
          <span>{part.views} views</span>
        </div>

        <Link
          to={`/parts/${part._id}`}
          className="block w-full text-center btn-primary"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default PartCard;