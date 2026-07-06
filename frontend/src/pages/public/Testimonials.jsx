import React from 'react';
import { Helmet } from 'react-helmet-async';
import TestimonialsSection from '../../components/home/TestimonialsSection';

const Testimonials = () => (
  <>
    <Helmet>
      <title>Patient Testimonials — MedLab Diagnostics</title>
      <meta name="description" content="Read what 250,000+ patients say about MedLab Diagnostics services and accuracy." />
    </Helmet>
    <div className="bg-gradient-to-r from-[#0A1628] to-[#0B6EFD] pt-16 pb-24">
      <div className="container-custom text-center">
        <div className="section-label bg-white/20 text-white mx-auto mb-4">⭐ Testimonials</div>
        <h1 className="text-white mb-4">What Our Patients Say</h1>
        <p className="text-white/70 max-w-lg mx-auto">Trusted by 250,000+ patients across India. Real stories, real experiences.</p>
      </div>
    </div>
    <div className="-mt-10 bg-white pt-10">
      <TestimonialsSection />
    </div>
  </>
);

export default Testimonials;
