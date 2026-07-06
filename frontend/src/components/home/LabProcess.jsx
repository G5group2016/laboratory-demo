import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { FaCalendarAlt, FaVials, FaMicroscope, FaCheckCircle, FaUserMd, FaMobileAlt } from 'react-icons/fa';
import { SectionWrapper, SectionHeader } from '../ui/Animations';

const steps = [
  { icon: FaCalendarAlt, step: '01', title: 'Book Online or Call', description: 'Book via website, app, or phone. Choose home collection or lab visit.', color: '#0B6EFD' },
  { icon: FaVials, step: '02', title: 'Sample Collection', description: 'Certified phlebotomist collects sample with sterile, single-use equipment.', color: '#7C3AED' },
  { icon: FaMicroscope, step: '03', title: 'Lab Analysis', description: 'Samples processed on automated analyzers in our NABL-accredited laboratory.', color: '#EF4444' },
  { icon: FaCheckCircle, step: '04', title: 'Quality Check', description: 'AI-powered cross-validation and manual review by experienced pathologists.', color: '#F59E0B' },
  { icon: FaUserMd, step: '05', title: 'Doctor Verification', description: 'Senior pathologist reviews and digitally signs the final report.', color: '#22C55E' },
  { icon: FaMobileAlt, step: '06', title: 'Digital Report', description: 'Report delivered via email, SMS, and patient portal. Share with your doctor instantly.', color: '#00D4FF' },
];

const LabProcess = () => (
  <section className="section-py bg-[var(--background)]">
    <div className="container-custom">
      <SectionWrapper>
        <SectionHeader
          label="Our Process"
          title="How It Works"
          subtitle="From booking to report — a seamless, transparent, and quality-assured process every step of the way."
        />
      </SectionWrapper>

      <div className="relative">
        {/* Connecting line — desktop */}
        <div className="hidden lg:block absolute top-14 left-[8.33%] right-[8.33%] h-0.5 bg-gradient-to-r from-[#0B6EFD] via-[#EF4444] to-[#00D4FF] opacity-30" />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative z-10">
          {steps.map(({ icon: Icon, step, title, description, color }, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="relative mb-4">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-md"
                  style={{ background: `linear-gradient(135deg, ${color}20, ${color}10)`, border: `2px solid ${color}30` }}
                >
                  <Icon size={28} style={{ color }} />
                </div>
                <div
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shadow"
                  style={{ background: color }}
                >
                  {i + 1}
                </div>
              </div>
              <h4 className="font-bold text-[var(--text-primary)] text-sm mb-2 group-hover:text-[var(--primary)] transition-colors">{title}</h4>
              <p className="text-[var(--text-muted)] text-xs leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default LabProcess;
