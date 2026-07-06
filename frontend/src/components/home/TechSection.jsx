import React from 'react';
import { motion } from 'framer-motion';
import { FaMicroscope, FaRobot, FaFileAlt, FaGlobe, FaBolt, FaShieldAlt } from 'react-icons/fa';
import { SectionWrapper, SectionHeader, AnimatedCard } from '../ui/Animations';

const techs = [
  { icon: FaMicroscope, title: 'Automated Analyzers', description: 'State-of-the-art Siemens & Roche automated analyzers for maximum precision and throughput.', color: '#0B6EFD' },
  { icon: FaRobot, title: 'AI Diagnostics', description: 'Machine learning algorithms cross-check results for anomalies, ensuring accuracy beyond human error.', color: '#7C3AED' },
  { icon: FaFileAlt, title: 'Digital Reporting', description: 'LIS-integrated digital reports with trend analysis and comparison to previous results.', color: '#22C55E' },
  { icon: FaGlobe, title: 'International Standards', description: 'CAP-accredited processes following ISO 15189:2022 and WHO guidelines for quality assurance.', color: '#F59E0B' },
  { icon: FaBolt, title: 'STAT Testing', description: 'Emergency STAT testing with results in under 2 hours for critical clinical decisions.', color: '#EF4444' },
  { icon: FaShieldAlt, title: 'Biosafety Level 3', description: 'BSL-3 certified containment for handling infectious samples with maximum safety protocols.', color: '#00D4FF' },
];

const TechSection = () => (
  <section className="section-py bg-white">
    <div className="container-custom">
      <SectionWrapper>
        <SectionHeader
          label="Technology"
          title="World-Class Lab Technology"
          subtitle="We invest in the best equipment and technology to ensure your results are accurate, fast, and actionable."
        />
      </SectionWrapper>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {techs.map(({ icon: Icon, title, description, color }, i) => (
          <AnimatedCard
            key={title}
            delay={i * 0.08}
            className="group flex items-start gap-5 bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover border border-gray-100 transition-all duration-400"
          >
            <div
              className="w-13 h-13 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300"
              style={{ background: `${color}15`, minWidth: '52px', minHeight: '52px' }}
            >
              <Icon size={24} style={{ color }} />
            </div>
            <div>
              <h3 className="font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--primary)] transition-colors">{title}</h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{description}</p>
            </div>
          </AnimatedCard>
        ))}
      </div>
    </div>
  </section>
);

export default TechSection;
