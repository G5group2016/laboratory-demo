import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaFlask, FaMicroscope, FaDna, FaShieldAlt, FaCertificate, FaTint, FaBolt
} from 'react-icons/fa';
import { FiArrowRight, FiCheckCircle, FiStar } from 'react-icons/fi';
import CountUpModule from 'react-countup';
const CountUp = CountUpModule.default || CountUpModule;

const trustBadges = [
  { icon: FaCertificate, label: 'ISO Certified', color: '#0B6EFD' },
  { icon: FaShieldAlt, label: 'NABL Accredited', color: '#22C55E' },
  { icon: FaBolt, label: 'Fast Reports', color: '#F59E0B' },
  { icon: FiCheckCircle, label: '99% Accurate', color: '#7C3AED' },
];

const floatingIcons = [
  { icon: FaMicroscope, x: '5%', y: '20%', size: 32, delay: 0, color: 'rgba(11,110,253,0.6)' },
  { icon: FaDna, x: '85%', y: '15%', size: 36, delay: 0.5, color: 'rgba(0,212,255,0.6)' },
  { icon: FaFlask, x: '90%', y: '60%', size: 28, delay: 1, color: 'rgba(124,58,237,0.6)' },
  { icon: FaTint, x: '8%', y: '65%', size: 26, delay: 1.5, color: 'rgba(239,68,68,0.6)' },
];

const stats = [
  { value: 10, suffix: '+', label: 'Years Experience' },
  { value: 250, suffix: 'K+', label: 'Tests Completed' },
  { value: 50, suffix: '+', label: 'Expert Staff' },
  { value: 40, suffix: '+', label: 'Branches' },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0A1628]">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero opacity-90" />

      {/* Animated background patterns */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: '4s' }} />
      </div>

      {/* Floating Icons */}
      {floatingIcons.map(({ icon: Icon, x, y, size, delay, color }, i) => (
        <motion.div
          key={i}
          className="absolute hidden xl:flex items-center justify-center w-14 h-14 rounded-2xl"
          style={{ left: x, top: y, backgroundColor: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 3, delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Icon style={{ color, fontSize: size }} />
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="container-custom relative z-10 pt-10 pb-20">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white/80 text-sm font-medium">NABL Accredited | ISO Certified Lab</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-white mb-6"
            >
              Accurate
              <br />
              <span
                className="text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #00D4FF 0%, #7C3AED 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Diagnostics.
              </span>
              <br />
              Trusted Healthcare.
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-white/70 text-xl leading-relaxed mb-8 max-w-lg"
            >
              Advanced laboratory testing with world-class technology, experienced specialists, 
              and fast, reliable results delivered to your fingertips.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <Link
                to="/book-test"
                className="inline-flex items-center gap-3 px-8 py-4 gradient-primary text-white rounded-2xl font-semibold text-lg hover:shadow-glow hover:scale-105 transition-all duration-300"
              >
                <FaFlask size={18} />
                Book a Test
                <FiArrowRight />
              </Link>
              <Link
                to="/packages"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-2xl font-semibold text-lg hover:bg-white/20 hover:scale-105 transition-all duration-300"
              >
                View Packages
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              {trustBadges.map(({ icon: Icon, label, color }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-3 py-2"
                >
                  <Icon style={{ color, fontSize: 14 }} />
                  <span className="text-white/80 text-sm font-medium">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Stats Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden xl:block"
          >
            <div className="relative">
              {/* Main Stats Panel */}
              <div className="glass rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center">
                    <FaMicroscope className="text-white text-2xl" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">MedLab Diagnostics</p>
                    <p className="text-white font-semibold">World-Class Lab Results</p>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {stats.map(({ value, suffix, label }) => (
                    <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                      <div className="text-3xl font-bold text-white mb-1">
                        <CountUp end={value} duration={2.5} enableScrollSpy scrollSpyOnce />
                        {suffix}
                      </div>
                      <p className="text-white/60 text-xs">{label}</p>
                    </div>
                  ))}
                </div>

                {/* Rating */}
                <div className="flex items-center justify-between bg-white/5 rounded-2xl p-4">
                  <div>
                    <p className="text-white font-semibold">Patient Rating</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <FiStar key={i} className="text-yellow-400 fill-yellow-400" size={14} />
                      ))}
                      <span className="text-white/60 text-sm ml-1">(12,500+ reviews)</span>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white">4.9</div>
                </div>

                {/* Quick Book */}
                <Link
                  to="/book-test"
                  className="mt-4 w-full flex items-center justify-center gap-2 py-4 gradient-primary rounded-2xl text-white font-semibold hover:shadow-primary transition-all duration-300"
                >
                  <FaFlask />
                  Book a Test Now
                  <FiArrowRight />
                </Link>
              </div>

              {/* Floating pill badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -right-4 glass rounded-2xl px-4 py-2 border border-white/20"
              >
                <div className="flex items-center gap-2 text-white">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">Report Ready!</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, delay: 1, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 -left-6 glass rounded-2xl px-4 py-3 border border-white/20"
              >
                <p className="text-white/60 text-xs mb-0.5">Home Collection</p>
                <p className="text-white font-semibold text-sm">Available at your doorstep</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Stats Row — Mobile visible */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="xl:hidden mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {stats.map(({ value, suffix, label }) => (
            <div key={label} className="glass rounded-2xl p-4 text-center border border-white/10">
              <div className="text-2xl font-bold text-white mb-1">
                <CountUp end={value} duration={2.5} enableScrollSpy scrollSpyOnce />
                {suffix}
              </div>
              <p className="text-white/60 text-xs">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" className="w-full fill-[var(--background)]" preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
