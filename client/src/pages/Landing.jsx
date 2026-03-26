import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedBackground from '../components/AnimatedBackground';
import VehicleSelector from '../components/VehicleSelector';
import PartCard from '../components/PartCard';
import { partsAPI } from '../services/api';

const Landing = () => {
  const [featuredParts, setFeaturedParts] = useState([]);
  const [stats, setStats] = useState({
    totalParts: 1200,
    totalSellers: 800,
    categories: 2
  });

  useEffect(() => {
    fetchFeaturedParts();
  }, []);

  const fetchFeaturedParts = async () => {
    try {
      const response = await partsAPI.getParts({ limit: 6 });
      setFeaturedParts(response.data.parts);
    } catch (error) {
      console.error('Error fetching featured parts:', error);
    }
  };

  const handleCategorySelect = (category) => {
    window.location.href = `/browse?category=${category}`;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <AnimatedBackground />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl text-text-navy mb-6">
              Find Rare Parts for
              <br />
              <span className="text-primary-blue">Discontinued Vehicles</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-text-muted mb-8 max-w-3xl mx-auto">
              India's first marketplace connecting buyers and sellers of discontinued automobile spare parts
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/browse" className="btn-primary text-lg px-8 py-4">
                Browse Parts
              </Link>
              <Link to="/add-part" className="btn-secondary text-lg px-8 py-4">
                List a Part
              </Link>
            </div>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row justify-center items-center gap-8 text-text-navy"
            >
              <div className="text-center">
                <div className="font-mono font-bold text-2xl text-primary-blue">
                  {stats.totalParts.toLocaleString()}+
                </div>
                <div className="text-sm text-text-muted">Parts Listed</div>
              </div>
              <div className="hidden sm:block w-px h-8 bg-border-light"></div>
              <div className="text-center">
                <div className="font-mono font-bold text-2xl text-primary-blue">
                  {stats.totalSellers.toLocaleString()}+
                </div>
                <div className="text-sm text-text-muted">Sellers</div>
              </div>
              <div className="hidden sm:block w-px h-8 bg-border-light"></div>
              <div className="text-center">
                <div className="font-mono font-bold text-2xl text-primary-blue">
                  Bikes & Cars
                </div>
                <div className="text-sm text-text-muted">Categories</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-text-navy mb-4">
              How It Works
            </h2>
            <p className="text-xl text-text-muted max-w-2xl mx-auto">
              Simple steps to find or sell discontinued auto parts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Search',
                description: 'Browse our extensive catalog of discontinued parts by vehicle make, model, or part type.',
                icon: '🔍'
              },
              {
                step: '02',
                title: 'Connect',
                description: 'Contact sellers directly through phone or WhatsApp to discuss availability and pricing.',
                icon: '📞'
              },
              {
                step: '03',
                title: 'Get Your Part',
                description: 'Arrange pickup or delivery and get your vintage vehicle back on the road.',
                icon: '🔧'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <div className="font-mono text-primary-blue text-sm font-bold mb-2">
                  STEP {item.step}
                </div>
                <h3 className="font-display font-semibold text-xl text-text-navy mb-3">
                  {item.title}
                </h3>
                <p className="text-text-muted">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Categories */}
      <section className="py-20 bg-background-offWhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-text-navy mb-4">
              Choose Your Vehicle Category
            </h2>
            <p className="text-xl text-text-muted max-w-2xl mx-auto">
              Find parts for your specific type of vehicle
            </p>
          </div>

          <VehicleSelector onCategoryChange={handleCategorySelect} />
        </div>
      </section>

      {/* Featured Listings */}
      {featuredParts.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-text-navy mb-4">
                Featured Listings
              </h2>
              <p className="text-xl text-text-muted max-w-2xl mx-auto">
                Latest parts added to our marketplace
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredParts.map((part) => (
                <PartCard key={part._id} part={part} />
              ))}
            </div>

            <div className="text-center">
              <Link to="/browse" className="btn-primary text-lg px-8 py-4">
                View All Parts
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Landing;