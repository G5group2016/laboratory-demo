import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMicroscope } from 'react-icons/fa';
import { FiArrowLeft, FiHome, FiBookOpen } from 'react-icons/fi';

const NotFound = () => (
  <>
    <Helmet><title>404 — Page Not Found | MedLab Diagnostics</title></Helmet>
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="w-24 h-24 gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-primary"
        >
          <FaMicroscope className="text-white text-5xl" />
        </motion.div>
        <h1 className="text-8xl font-black gradient-text mb-4">404</h1>
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Page Not Found</h2>
        <p className="text-[var(--text-secondary)] mb-8">
          The page you're looking for has moved, been removed, or doesn't exist. 
          Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="inline-flex items-center justify-center gap-2 px-6 py-3 gradient-primary text-white rounded-2xl font-semibold hover:shadow-primary transition-all duration-300">
            <FiHome /> Back to Home
          </Link>
          <Link to="/tests" className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-[var(--primary)] text-[var(--primary)] rounded-2xl font-semibold hover:bg-blue-50 transition-all duration-300">
            <FiBookOpen /> Browse Tests
          </Link>
        </div>
      </div>
    </div>
  </>
);

export default NotFound;
