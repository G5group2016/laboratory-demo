import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaMicroscope, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube,
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaHeartbeat
} from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';

const footerLinks = {
  quickLinks: [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Our Doctors', path: '/doctors' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Testimonials', path: '/testimonials' },
    { label: 'Careers', path: '/contact' },
    { label: 'FAQs', path: '/faqs' },
  ],
  services: [
    { label: 'Blood Tests', path: '/tests?category=Blood+Test' },
    { label: 'Thyroid Profile', path: '/tests?category=Thyroid+Test' },
    { label: 'Diabetes Tests', path: '/tests?category=Diabetes+Test' },
    { label: 'Heart Profile', path: '/tests?category=Heart+Profile' },
    { label: 'Health Packages', path: '/packages' },
    { label: 'Home Collection', path: '/book-test' },
    { label: 'Corporate Health', path: '/packages' },
  ],
  legal: [
    { label: 'Privacy Policy', path: '/contact' },
    { label: 'Terms of Service', path: '/contact' },
    { label: 'Refund Policy', path: '/contact' },
    { label: 'Disclaimer', path: '/contact' },
  ],
};

const socialLinks = [
  { icon: FaFacebook, href: '#', color: '#1877F2', label: 'Facebook' },
  { icon: FaTwitter, href: '#', color: '#1DA1F2', label: 'Twitter' },
  { icon: FaInstagram, href: '#', color: '#E1306C', label: 'Instagram' },
  { icon: FaLinkedin, href: '#', color: '#0A66C2', label: 'LinkedIn' },
  { icon: FaYoutube, href: '#', color: '#FF0000', label: 'YouTube' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A1628] text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10 mb-8 mt-5">
        <div className="container-custom py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold mb-1 text-white">📬 Stay Health-Informed</h3>
              <p className="text-white/60 text-sm mb-5">Get health tips, lab updates & exclusive offers in your inbox.</p>
            </div>
            <form className="flex gap-3 w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 md:w-64 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--primary)] transition-colors"
              />
              <button
                type="submit"
                className="px-5 py-3 gradient-primary rounded-xl font-medium text-sm hover:shadow-primary transition-all duration-300 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-5 group">
              <div className="w-11 h-11 gradient-primary rounded-xl flex items-center justify-center shadow-primary group-hover:shadow-glow transition-all duration-300">
                <FaMicroscope className="text-white text-xl" />
              </div>
              <div>
                <span className="font-bold text-xl font-poppins">
                  Med<span className="text-[var(--accent)]">Lab</span>
                </span>
                <div className="text-xs text-white/50 tracking-wider">DIAGNOSTICS</div>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              India's most trusted diagnostic laboratory chain with NABL accreditation, 
              ISO certification, and 250,000+ tests completed across 40+ branches.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a href="tel:1800XXXXXXXX" className="flex items-center gap-3 text-sm text-white/70 hover:text-[var(--accent)] transition-colors group">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-[var(--primary)] transition-colors">
                  <FaPhone size={12} />
                </div>
                1800-XXX-XXXX (Toll Free)
              </a>
              <a href="mailto:info@medlab.com" className="flex items-center gap-3 text-sm text-white/70 hover:text-[var(--accent)] transition-colors group">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-[var(--primary)] transition-colors">
                  <FaEnvelope size={12} />
                </div>
                info@medlabdiagnostics.com
              </a>
              <div className="flex items-center gap-3 text-sm text-white/70">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                  <FaMapMarkerAlt size={12} />
                </div>
                123 Medical Hub, Bandra West, Mumbai – 400 050
              </div>
            </div>

            {/* Accreditation Badges */}
            <div className="flex gap-3 mt-6">
              {['NABL', 'ISO', 'CAP'].map((badge) => (
                <div key={badge} className="px-3 py-1.5 bg-white/10 rounded-lg text-xs font-bold text-white/80 border border-white/20">
                  {badge}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-5 text-base">Quick Links</h4>
            <ul className="space-y-2.5">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.path + link.label}>
                  <Link
                    to={link.path}
                    className="flex items-center gap-2 text-sm text-white/60 hover:text-[var(--accent)] transition-colors group"
                  >
                    <FiArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-4 group-hover:ml-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="font-semibold text-white mb-5 text-base">Our Services</h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.path + link.label}>
                  <Link
                    to={link.path}
                    className="flex items-center gap-2 text-sm text-white/60 hover:text-[var(--accent)] transition-colors group"
                  >
                    <FiArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-4 group-hover:ml-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency & Social */}
          <div>
            <h4 className="font-semibold text-white mb-5 text-base">Emergency Contact</h4>
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-2 text-red-400 font-semibold mb-1">
                <FaHeartbeat className="animate-pulse" />
                24/7 Emergency Line
              </div>
              <a href="tel:+918000XXXXXX" className="text-2xl font-bold text-white hover:text-red-300 transition-colors">
                +91 8000-XXX-XXX
              </a>
              <p className="text-white/50 text-xs mt-1">Available round the clock</p>
            </div>

            {/* Social Links */}
            <h4 className="font-semibold text-white mb-4 text-sm">Follow Us</h4>
            <div className="flex gap-3 mb-6">
              {socialLinks.map(({ icon: Icon, href, color, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -3 }}
                  className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors"
                  style={{ '--hover-color': color }}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>

            {/* App Download */}
            <div className="space-y-2">
              <p className="text-white/50 text-xs font-medium uppercase tracking-wider mb-3">Download App</p>
              {['App Store', 'Google Play'].map((store) => (
                <a
                  key={store}
                  href="#"
                  className="flex items-center gap-2 px-4 py-2.5 bg-white/10 rounded-xl text-sm hover:bg-white/20 transition-colors border border-white/10"
                >
                  <span className="text-white/70 font-medium">{store}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
            <p>© {currentYear} MedLab Diagnostics. All rights reserved.</p>
            <div className="flex items-center gap-5">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className="hover:text-white/80 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
