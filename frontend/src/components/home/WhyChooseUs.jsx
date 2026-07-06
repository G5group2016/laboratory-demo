import React from 'react';
import { motion } from 'framer-motion';
import {
  FaFlask, FaUserMd, FaHome, FaFileAlt, FaDollarSign, FaHeadset,
  FaAward, FaMicroscope, FaBolt, FaShieldVirus
} from 'react-icons/fa';
import { SectionWrapper, SectionHeader, AnimatedCard } from '../ui/Animations';

const features = [
  {
    icon: FaAward,
    title: 'Certified Laboratory',
    description: 'NABL accredited and ISO 15189 certified with international quality standards.',
    color: '#0B6EFD',
    bg: 'rgba(11,110,253,0.1)',
  },
  {
    icon: FaUserMd,
    title: 'Expert Pathologists',
    description: 'Team of 50+ highly qualified doctors and senior pathologists with decades of expertise.',
    color: '#22C55E',
    bg: 'rgba(34,197,94,0.1)',
  },
  {
    icon: FaHome,
    title: 'Home Sample Collection',
    description: 'Certified phlebotomists at your doorstep within 60 minutes of booking.',
    color: '#7C3AED',
    bg: 'rgba(124,58,237,0.1)',
  },
  {
    icon: FaFileAlt,
    title: 'Fast Online Reports',
    description: 'Digital reports delivered within 4–24 hours, accessible from anywhere on any device.',
    color: '#F59E0B',
    bg: 'rgba(245,158,11,0.1)',
  },
  {
    icon: FaDollarSign,
    title: 'Affordable Packages',
    description: 'Transparent pricing with no hidden charges. Up to 60% off on comprehensive packages.',
    color: '#EF4444',
    bg: 'rgba(239,68,68,0.1)',
  },
  {
    icon: FaHeadset,
    title: '24/7 Support',
    description: 'Round-the-clock customer support via phone, chat, and email. Never alone in your health journey.',
    color: '#00D4FF',
    bg: 'rgba(0,212,255,0.1)',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="section-py bg-white">
      <div className="container-custom">
        <SectionWrapper>
          <SectionHeader
            label="Why MedLab?"
            title="Why Thousands Choose Us"
            subtitle="We combine cutting-edge technology with compassionate care to deliver diagnostic excellence."
          />
        </SectionWrapper>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, description, color, bg }, i) => (
            <AnimatedCard
              key={title}
              delay={i * 0.1}
              className="group relative bg-white rounded-2xl p-7 shadow-card hover:shadow-card-hover transition-all duration-500 border border-gray-100 hover:border-transparent cursor-default overflow-hidden"
            >
              {/* Gradient border on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${color}15, ${color}05)`,
                  border: `2px solid ${color}30`,
                }}
              />

              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, ${color}, ${color}80)` }}
              />

              <div className="relative z-10">
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: bg }}
                >
                  <Icon size={26} style={{ color }} />
                </div>

                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3 group-hover:text-[var(--primary)] transition-colors duration-300">
                  {title}
                </h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            </AnimatedCard>
          ))}
        </div>

        {/* Bottom CTA */}
        <SectionWrapper className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 rounded-2xl px-8 py-4">
            <FaMicroscope className="text-[var(--primary)] text-xl" />
            <span className="text-[var(--text-secondary)]">Trusted by <strong className="text-[var(--primary)]">2,50,000+</strong> patients across India</span>
            <span className="text-[var(--text-muted)]">•</span>
            <span className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400">★</span>
              ))}
              <span className="text-[var(--text-secondary)] font-semibold ml-1">4.9/5</span>
            </span>
          </div>
        </SectionWrapper>
      </div>
    </section>
  );
};

export default WhyChooseUs;
