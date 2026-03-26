import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 animated-bg" />
      
      {/* Floating circles */}
      <div className="floating-circle" />
      <div className="floating-circle" />
      <div className="floating-circle" />
      
      {/* Dot pattern overlay */}
      <div className="absolute inset-0 dot-pattern opacity-30" />
    </div>
  );
};

export default AnimatedBackground;