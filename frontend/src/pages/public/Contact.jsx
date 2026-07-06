import React from 'react';
import { Helmet } from 'react-helmet-async';
import ContactSection from '../../components/home/ContactSection';

const Contact = () => (
  <>
    <Helmet>
      <title>Contact Us — MedLab Diagnostics</title>
      <meta name="description" content="Get in touch with MedLab Diagnostics. Call, email, or visit us. 24/7 emergency support available." />
    </Helmet>
    <div className="bg-gradient-to-r from-[#0A1628] to-[#0B6EFD] pt-16 pb-24">
      <div className="container-custom text-center">
        <div className="section-label bg-white/20 text-white mx-auto mb-4">📞 Contact</div>
        <h1 className="text-white mb-4">Get In Touch</h1>
        <p className="text-white/70 max-w-lg mx-auto">Our friendly team is available 24/7 to assist you with bookings, reports, and general enquiries.</p>
      </div>
    </div>
    <div className="-mt-10">
      <ContactSection />
    </div>
  </>
);

export default Contact;
