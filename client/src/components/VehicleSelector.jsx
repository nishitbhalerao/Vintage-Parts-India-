import React from 'react';
import { motion } from 'framer-motion';

const VehicleSelector = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    {
      id: 'bike',
      name: 'Bikes / Two-wheelers',
      icon: '🏍️',
      description: 'Find parts for motorcycles, scooters, and mopeds'
    },
    {
      id: 'car',
      name: 'Cars / Four-wheelers',
      icon: '🚗',
      description: 'Find parts for cars, SUVs, and commercial vehicles'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {categories.map((category) => (
        <motion.div
          key={category.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`card p-6 cursor-pointer transition-all duration-200 ${
            selectedCategory === category.id
              ? 'ring-2 ring-primary-blue bg-primary-light'
              : 'hover:shadow-lg'
          }`}
          onClick={() => onCategoryChange(category.id)}
        >
          <div className="text-center">
            <div className="text-6xl mb-4">{category.icon}</div>
            <h3 className="font-display font-semibold text-xl text-text-navy mb-2">
              {category.name}
            </h3>
            <p className="text-text-muted text-sm">
              {category.description}
            </p>
            {selectedCategory === category.id && (
              <div className="mt-4">
                <div className="inline-flex items-center justify-center w-6 h-6 bg-primary-blue rounded-full">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default VehicleSelector;