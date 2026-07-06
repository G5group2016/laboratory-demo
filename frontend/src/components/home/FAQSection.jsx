import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus, FiArrowRight } from 'react-icons/fi';
import { SectionWrapper, SectionHeader } from '../ui/Animations';

const faqs = [
  {
    q: 'How do I book a test at MedLab?',
    a: 'You can book a test online through our website, call our toll-free number 1800-XXX-XXXX, or visit any of our 40+ branches. For home collection, simply select the option during booking.',
  },
  {
    q: 'Is home sample collection available in my city?',
    a: 'We offer home collection in 100+ cities across India including Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Pune, and more. Check availability during booking by entering your pincode.',
  },
  {
    q: 'How long does it take to receive my report?',
    a: 'Most routine tests are completed within 4–12 hours. Specialized tests may take 24–48 hours. You will receive an SMS and email notification as soon as your report is ready.',
  },
  {
    q: 'Is MedLab NABL accredited?',
    a: 'Yes, all MedLab laboratories are NABL accredited and ISO 15189:2022 certified. We follow strict quality control protocols and participate in international proficiency testing programs.',
  },
  {
    q: 'Can I access my reports online?',
    a: 'Absolutely! All reports are available digitally through our patient portal. You can download, print, or share your reports with doctors directly from the portal.',
  },
  {
    q: 'Do I need to fast before a blood test?',
    a: 'Fasting requirements depend on the test. Tests like blood glucose, lipid profile, and liver function generally require 8–12 hours of fasting. Your booking confirmation will mention specific instructions.',
  },
  {
    q: 'How do I reschedule or cancel a booking?',
    a: 'You can reschedule or cancel your booking up to 2 hours before the scheduled collection time through the patient portal or by calling our helpline. Cancellations made in time are fully refunded.',
  },
  {
    q: 'What payment methods are accepted?',
    a: 'We accept all major payment modes including UPI, credit/debit cards, net banking, and cash. Corporate clients can also opt for invoiced billing.',
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="section-py bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Left sticky panel */}
          <div className="lg:col-span-2 lg:sticky lg:top-28">
            <SectionWrapper>
              <div className="section-label">FAQs</div>
              <h2 className="mt-2 mb-4">Frequently Asked Questions</h2>
              <p className="text-[var(--text-secondary)] mb-6">
                Everything you need to know about MedLab Diagnostics. Can't find your answer? Reach out to us directly.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 gradient-primary text-white rounded-2xl font-semibold hover:shadow-primary transition-all duration-300"
              >
                Ask a Question
                <FiArrowRight />
              </Link>

              {/* Decorative box */}
              <div className="mt-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-6 border border-blue-100">
                <p className="font-bold text-[var(--text-primary)] mb-2">Still have questions?</p>
                <p className="text-[var(--text-secondary)] text-sm mb-4">Our support team is available 24/7</p>
                <div className="space-y-2">
                  <a href="tel:1800XXXXXXXX" className="flex items-center gap-2 text-sm text-[var(--primary)] font-medium hover:underline">
                    📞 1800-XXX-XXXX (Toll Free)
                  </a>
                  <a href="mailto:support@medlab.com" className="flex items-center gap-2 text-sm text-[var(--primary)] font-medium hover:underline">
                    ✉️ support@medlabdiagnostics.com
                  </a>
                </div>
              </div>
            </SectionWrapper>
          </div>

          {/* Right FAQ Accordion */}
          <div className="lg:col-span-3 space-y-3">
            {faqs.map(({ q, a }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  openIndex === i ? 'border-[var(--primary)] shadow-md' : 'border-gray-100'
                }`}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left hover:bg-blue-50/50 transition-colors group"
                >
                  <span className={`font-semibold text-base transition-colors ${openIndex === i ? 'text-[var(--primary)]' : 'text-[var(--text-primary)] group-hover:text-[var(--primary)]'}`}>
                    {q}
                  </span>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${openIndex === i ? 'gradient-primary text-white' : 'bg-blue-50 text-[var(--primary)]'}`}>
                    {openIndex === i ? <FiMinus size={16} /> : <FiPlus size={16} />}
                  </div>
                </button>

                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5">
                        <div className="w-12 h-0.5 bg-[var(--primary)] rounded-full mb-3 opacity-30" />
                        <p className="text-[var(--text-secondary)] leading-relaxed">{a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
