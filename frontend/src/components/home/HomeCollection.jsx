import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { FaCalendarAlt, FaUserNurse, FaVials, FaFileAlt, FaArrowDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { SectionWrapper, SectionHeader, FadeLeft, FadeRight } from '../ui/Animations';

const steps = [
  {
    step: '01',
    icon: FaCalendarAlt,
    title: 'Book Online',
    description: 'Choose your test or package, select preferred date & time, and confirm your booking in under 2 minutes.',
    color: '#0B6EFD',
    bg: 'rgba(11,110,253,0.1)',
  },
  {
    step: '02',
    icon: FaUserNurse,
    title: 'Technician Visits Home',
    description: 'Our certified phlebotomist arrives at your doorstep at your scheduled time with sterile equipment.',
    color: '#7C3AED',
    bg: 'rgba(124,58,237,0.1)',
  },
  {
    step: '03',
    icon: FaVials,
    title: 'Sample Collection',
    description: 'Painless, hygienic sample collection following strict biosafety protocols. Takes just 5 minutes.',
    color: '#EF4444',
    bg: 'rgba(239,68,68,0.1)',
  },
  {
    step: '04',
    icon: FaFileAlt,
    title: 'Digital Report Delivered',
    description: 'Accurate, AI-verified reports delivered via email & SMS. Also accessible through our portal.',
    color: '#22C55E',
    bg: 'rgba(34,197,94,0.1)',
  },
];

const HomeCollection = () => {
  return (
    <section className="section-py relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0A1628 0%, #0B1E3E 50%, #0B2560 100%)' }}>
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <SectionWrapper>
          <SectionHeader
            label="🏠 Home Collection"
            title="Lab at Your Doorstep"
            subtitle="Skip the waiting rooms. Our certified technicians come to you — same quality, maximum convenience."
            light
          />
        </SectionWrapper>

        {/* Timeline Steps */}
        <div className="relative">
          {/* Connecting line — desktop */}
          <div className="absolute top-12 left-0 right-0 hidden lg:block">
            <div className="h-0.5 mx-auto" style={{
              maxWidth: '75%',
              background: 'linear-gradient(90deg, rgba(11,110,253,0.5), rgba(124,58,237,0.5), rgba(239,68,68,0.5), rgba(34,197,94,0.5))',
            }} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map(({ step, icon: Icon, title, description, color, bg }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="flex flex-col items-center text-center"
              >
                {/* Step number circle */}
                <div className="relative mb-6">
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center border-2 z-10 relative"
                    style={{
                      background: `radial-gradient(circle at center, ${color}25, ${color}10)`,
                      borderColor: `${color}40`,
                      boxShadow: `0 0 30px ${color}25`,
                    }}
                  >
                    <Icon size={36} style={{ color }} />
                  </div>
                  {/* Step number badge */}
                  <div
                    className="absolute -top-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white z-20"
                    style={{ background: color }}
                  >
                    {i + 1}
                  </div>
                  {/* Down arrow for mobile */}
                  {i < steps.length - 1 && (
                    <FaArrowDown className="text-white/20 text-xl absolute -bottom-8 left-1/2 -translate-x-1/2 lg:hidden" />
                  )}
                </div>

                <h3 className="text-white font-bold text-lg mb-3">{title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <SectionWrapper className="mt-14 text-center">
          <div className="glass rounded-3xl p-8 max-w-2xl mx-auto border border-white/10">
            <p className="text-white/60 text-sm mb-2">Ready for hassle-free diagnostics?</p>
            <h3 className="text-white text-2xl font-bold mb-6">Book Your Home Collection Now</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/book-test?collection=home"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 gradient-primary text-white rounded-2xl font-semibold hover:shadow-primary hover:scale-105 transition-all duration-300"
              >
                Book Home Collection
                <FiArrowRight />
              </Link>
              <a
                href="tel:1800XXXXXXXX"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white rounded-2xl font-semibold hover:bg-white/10 transition-all duration-300"
              >
                Call 1800-XXX-XXXX
              </a>
            </div>
            <p className="text-white/40 text-xs mt-4">✓ Available 7 days a week &nbsp;·&nbsp; ✓ No extra charges &nbsp;·&nbsp; ✓ Within 60 mins</p>
          </div>
        </SectionWrapper>
      </div>
    </section>
  );
};

export default HomeCollection;
