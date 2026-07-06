import React from 'react';
import CountUpModule from 'react-countup';
const CountUp = CountUpModule.default || CountUpModule;
import { motion } from 'framer-motion';
import { FiAward, FiUsers, FiActivity, FiMapPin, FiCheckCircle, FiClock } from 'react-icons/fi';
import { SectionWrapper } from '../ui/Animations';

const stats = [
  { icon: FiAward, value: 10, suffix: '+', label: 'Years of Excellence', description: 'Trusted since 2014', color: '#0B6EFD' },
  { icon: FiActivity, value: 250, suffix: 'K+', label: 'Tests Completed', description: 'Accurate diagnostics', color: '#22C55E' },
  { icon: FiUsers, value: 50, suffix: '+', label: 'Expert Specialists', description: 'Board certified doctors', color: '#7C3AED' },
  { icon: FiCheckCircle, value: 99, suffix: '%', label: 'Accuracy Rate', description: 'AI-verified results', color: '#F59E0B' },
  { icon: FiMapPin, value: 40, suffix: '+', label: 'Branches', description: 'Pan India presence', color: '#EF4444' },
  { icon: FiClock, value: 24, suffix: '/7', label: 'Support Available', description: 'Always here for you', color: '#00D4FF' },
];

const StatsSection = () => {
  return (
    <section className="section-py relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0B6EFD 0%, #0854CC 50%, #7C3AED 100%)' }}>
      {/* Decorative circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/3 rounded-full" />
      </div>

      <div className="container-custom relative z-10">
        <SectionWrapper className="text-center mb-12">
          <div className="section-label bg-white/20 text-white mx-auto">Our Impact</div>
          <h2 className="text-white mt-2">Numbers That Define Us</h2>
          <p className="text-white/70 mt-4 max-w-xl mx-auto">
            Every number tells a story of trust, accuracy, and commitment to transforming healthcare diagnostics in India.
          </p>
        </SectionWrapper>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map(({ icon: Icon, value, suffix, label, description, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="relative group bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-5 text-center hover:bg-white/20 transition-all duration-400 cursor-default"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 bg-white/10 group-hover:bg-white/20 transition-colors">
                <Icon size={22} className="text-white" />
              </div>

              {/* Counter */}
              <div className="text-3xl font-bold text-white mb-1">
                <CountUp
                  end={value}
                  duration={2.5}
                  enableScrollSpy
                  scrollSpyOnce
                />
                <span>{suffix}</span>
              </div>

              <p className="text-white font-semibold text-sm mb-1">{label}</p>
              <p className="text-white/50 text-xs">{description}</p>

              {/* Bottom accent */}
              <div
                className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
