import React from 'react';
import { motion } from 'framer-motion';

// Reusable fade-up animation wrapper for sections
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

const zoomIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
};

/**
 * SectionWrapper — wraps a section with scroll-triggered fade-up animation
 */
export const SectionWrapper = ({ children, className = '', id = '' }) => (
  <motion.div
    id={id}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.1 }}
    variants={fadeUp}
    className={className}
  >
    {children}
  </motion.div>
);

/**
 * AnimatedCard — card with hover lift and fade-up
 */
export const AnimatedCard = ({ children, className = '', delay = 0 }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.1 }}
    variants={fadeUp}
    custom={delay}
    whileHover={{ y: -8, transition: { duration: 0.3 } }}
    className={className}
  >
    {children}
  </motion.div>
);

/**
 * FadeLeft / FadeRight
 */
export const FadeLeft = ({ children, className = '' }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    variants={fadeLeft}
    className={className}
  >
    {children}
  </motion.div>
);

export const FadeRight = ({ children, className = '' }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    variants={fadeRight}
    className={className}
  >
    {children}
  </motion.div>
);

export const ZoomIn = ({ children, className = '' }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    variants={zoomIn}
    className={className}
  >
    {children}
  </motion.div>
);

/**
 * Section Header — reusable label + title + subtitle
 */
export const SectionHeader = ({ label, title, subtitle, center = true, light = false }) => (
  <div className={`mb-12 ${center ? 'text-center' : ''}`}>
    {label && (
      <div className={`section-label ${center ? 'mx-auto' : 'inline-flex'} ${light ? 'bg-white/20 text-white' : ''}`}>
        {label}
      </div>
    )}
    <h2 className={`${light ? 'text-white' : ''}`}>{title}</h2>
    {subtitle && (
      <p className={`mt-4 max-w-2xl text-lg ${center ? 'mx-auto' : ''} ${light ? 'text-white/70' : 'text-[var(--text-secondary)]'}`}>
        {subtitle}
      </p>
    )}
  </div>
);

export { fadeUp, fadeLeft, fadeRight, zoomIn };
