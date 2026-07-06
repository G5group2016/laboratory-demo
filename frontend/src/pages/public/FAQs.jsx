import React from 'react';
import { Helmet } from 'react-helmet-async';
import FAQSection from '../../components/home/FAQSection';
import ContactSection from '../../components/home/ContactSection';

const FAQs = () => (
  <>
    <Helmet>
      <title>FAQs — MedLab Diagnostics</title>
      <meta name="description" content="Frequently asked questions about MedLab Diagnostics services, bookings, and reports." />
    </Helmet>
    <div className="bg-gradient-to-r from-[#0A1628] to-[#0B6EFD] pt-16 pb-24">
      <div className="container-custom text-center">
        <div className="section-label bg-white/20 text-white mx-auto mb-4">❓ FAQs</div>
        <h1 className="text-white mb-4">Frequently Asked Questions</h1>
        <p className="text-white/70 max-w-lg mx-auto">Everything you need to know about MedLab's services, booking process, and reports.</p>
      </div>
    </div>
    <div className="-mt-10">
      <FAQSection />
    </div>
  </>
);

export default FAQs;
