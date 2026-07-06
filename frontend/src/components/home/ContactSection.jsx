import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPhone, FiMapPin, FiMail, FiArrowRight } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useSubmitContactMutation } from '../../store/api';
import toast from 'react-hot-toast';
import { SectionWrapper, SectionHeader } from '../ui/Animations';

const contactInfo = [
  {
    icon: FiPhone,
    title: 'Call Us',
    lines: ['1800-XXX-XXXX (Toll Free)', '+91 9800-XXX-XXX (Emergency)'],
    color: '#0B6EFD',
    bg: 'rgba(11,110,253,0.1)',
  },
  {
    icon: FiMail,
    title: 'Email Us',
    lines: ['info@medlabdiagnostics.com', 'support@medlabdiagnostics.com'],
    color: '#7C3AED',
    bg: 'rgba(124,58,237,0.1)',
  },
  {
    icon: FiMapPin,
    title: 'Visit Us',
    lines: ['123 Medical Hub, Bandra West,', 'Mumbai – 400 050, Maharashtra'],
    color: '#22C55E',
    bg: 'rgba(34,197,94,0.1)',
  },
  {
    icon: FaWhatsapp,
    title: 'WhatsApp',
    lines: ['+91 9800-XXX-XXX', 'Mon–Sat: 8AM–8PM'],
    color: '#25D366',
    bg: 'rgba(37,211,102,0.1)',
  },
];

const ContactSection = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [submitContact, { isLoading }] = useSubmitContactMutation();

  const onSubmit = async (data) => {
    try {
      await submitContact(data).unwrap();
      toast.success('Message sent! We\'ll respond within 24 hours.');
      reset();
    } catch {
      toast.error('Failed to send. Please try again or call us.');
    }
  };

  return (
    <section className="section-py bg-[var(--background)]">
      <div className="container-custom">
        <SectionWrapper>
          <SectionHeader
            label="Get In Touch"
            title="Contact Us"
            subtitle="Have questions? Our team is here to help. Reach out and we'll get back to you within 24 hours."
          />
        </SectionWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left — Contact Cards + Map */}
          <div className="lg:col-span-2 space-y-4">
            {contactInfo.map(({ icon: Icon, title, lines, color, bg }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
                className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-card border border-gray-100 hover:shadow-card-hover transition-shadow duration-300"
              >
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0" style={{ background: bg }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <div>
                  <p className="font-semibold text-[var(--text-primary)] mb-1 text-sm">{title}</p>
                  {lines.map((line) => (
                    <p key={line} className="text-[var(--text-secondary)] text-sm">{line}</p>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Embedded Map */}
            <div className="rounded-2xl overflow-hidden shadow-card border border-gray-100 h-48">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.8!2d72.82717!3d19.0596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9ac1e57bd!2sBandra+West%2C+Mumbai!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="MedLab Diagnostics Location"
              />
            </div>
          </div>

          {/* Right — Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 bg-white rounded-3xl p-8 shadow-card border border-gray-100"
          >
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Full Name *</label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    className="input-base"
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Phone Number</label>
                  <input
                    {...register('phone')}
                    className="input-base"
                    placeholder="+91 9800-XXX-XXX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Email Address *</label>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' },
                  })}
                  className="input-base"
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Subject</label>
                <select {...register('subject')} className="input-base">
                  <option value="">Select a subject</option>
                  <option>Booking Query</option>
                  <option>Report Issue</option>
                  <option>Home Collection</option>
                  <option>Corporate Partnership</option>
                  <option>General Enquiry</option>
                  <option>Complaint / Feedback</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Message *</label>
                <textarea
                  {...register('message', { required: 'Message is required', minLength: { value: 20, message: 'At least 20 characters' } })}
                  rows={4}
                  className="input-base resize-none"
                  placeholder="Tell us how we can help you..."
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-4 gradient-primary text-white rounded-2xl font-semibold hover:shadow-primary transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Send Message <FiArrowRight /></>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
