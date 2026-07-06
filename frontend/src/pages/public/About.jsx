import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaMicroscope, FaAward, FaUsers, FaHeart } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { SectionWrapper, FadeLeft, FadeRight } from '../../components/ui/Animations';

const About = () => (
  <>
    <Helmet>
      <title>About Us — MedLab Diagnostics</title>
      <meta name="description" content="Learn about MedLab Diagnostics — India's most trusted NABL-accredited laboratory network since 2014." />
    </Helmet>

    {/* Hero */}
    <div className="bg-gradient-to-r from-[#0A1628] to-[#0B6EFD] pt-16 pb-24">
      <div className="container-custom text-center">
        <div className="section-label bg-white/20 text-white mx-auto mb-4">🏥 About Us</div>
        <h1 className="text-white mb-4">India's Most Trusted<br />Diagnostic Laboratory</h1>
        <p className="text-white/70 max-w-xl mx-auto">Delivering accurate, affordable, and accessible diagnostics since 2014.</p>
      </div>
    </div>

    {/* Mission / Vision */}
    <div className="container-custom -mt-10 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <FadeLeft className="bg-white rounded-3xl p-8 shadow-card border border-gray-100">
          <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center mb-5">
            <FaMicroscope className="text-white text-xl" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Our Mission</h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            To make quality diagnostic healthcare accessible to every Indian — from metros to small towns — 
            through technology-driven testing, transparent pricing, and compassionate service.
          </p>
        </FadeLeft>
        <FadeRight className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 text-white shadow-xl">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-5">
            <FaHeart className="text-white text-xl" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
          <p className="text-white/80 leading-relaxed">
            To become the most respected name in Indian diagnostics — trusted by patients, recommended by doctors, 
            and recognized globally for quality, accuracy, and patient-first care.
          </p>
        </FadeRight>
      </div>

      {/* Story */}
      <SectionWrapper className="bg-white rounded-3xl p-10 shadow-card border border-gray-100 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="section-label mb-4">Our Story</div>
            <h2 className="mb-5">A Decade of Diagnostic Excellence</h2>
            <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
              MedLab Diagnostics was founded in 2014 by a group of senior pathologists who believed that 
              world-class diagnostic care should not be a privilege of the few — it should be available to everyone.
            </p>
            <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
              Starting with a single laboratory in Mumbai, we have grown to a network of 40+ state-of-the-art 
              facilities across 20+ cities, with home collection reaching 100+ cities across India.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Today, with 250,000+ tests completed and a 99% accuracy rate, we remain committed to our founding 
              principle: <em>Your health deserves the best diagnostics.</em>
            </p>
            <Link to="/contact" className="mt-6 inline-flex items-center gap-2 px-6 py-3 gradient-primary text-white rounded-2xl font-semibold hover:shadow-primary transition-all duration-300">
              Get In Touch <FiArrowRight />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: FaAward, value: 'NABL', label: 'ISO 15189 Accredited', color: '#0B6EFD' },
              { icon: FaMicroscope, value: '500+', label: 'Tests Available', color: '#7C3AED' },
              { icon: FaUsers, value: '50+', label: 'Expert Staff', color: '#22C55E' },
              { icon: FaHeart, value: '99%', label: 'Accuracy Rate', color: '#EF4444' },
            ].map(({ icon: Icon, value, label, color }) => (
              <div key={label} className="rounded-2xl p-5 text-center border-2" style={{ borderColor: `${color}20`, background: `${color}08` }}>
                <Icon size={28} style={{ color }} className="mx-auto mb-3" />
                <p className="text-2xl font-bold" style={{ color }}>{value}</p>
                <p className="text-[var(--text-secondary)] text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Accreditations */}
      <SectionWrapper className="text-center">
        <div className="section-label mx-auto mb-6">Accreditations & Certifications</div>
        <div className="flex flex-wrap justify-center gap-6">
          {['NABL Accredited', 'ISO 15189:2022', 'CAP Accredited', 'WHO GMP', 'CLIA Certified', 'ICMR Approved'].map((cert) => (
            <div key={cert} className="px-6 py-3 bg-white rounded-2xl shadow-card border border-gray-100 font-semibold text-[var(--text-primary)] text-sm">
              ✅ {cert}
            </div>
          ))}
        </div>
      </SectionWrapper>
    </div>
  </>
);

export default About;
