import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizes = { sm: 'w-8 h-8', md: 'w-14 h-14', lg: 'w-20 h-20' };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
      <div className="relative">
        <div className={`${sizes[size]} rounded-full border-4 border-blue-100 border-t-[var(--primary)] animate-spin`} />
        <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-[var(--accent)] animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
      </div>
      {text && <p className="text-[var(--text-muted)] text-sm font-medium">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
