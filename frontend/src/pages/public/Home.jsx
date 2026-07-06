import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../../components/home/HeroSection';
import WhyChooseUs from '../../components/home/WhyChooseUs';
import TestCategories from '../../components/home/TestCategories';
import HealthPackages from '../../components/home/HealthPackages';
import HomeCollection from '../../components/home/HomeCollection';
import DoctorsSection from '../../components/home/DoctorsSection';
import TestimonialsSection from '../../components/home/TestimonialsSection';
import StatsSection from '../../components/home/StatsSection';
import FAQSection from '../../components/home/FAQSection';
import BlogSection from '../../components/home/BlogSection';
import ContactSection from '../../components/home/ContactSection';
import PartnerLogos from '../../components/home/PartnerLogos';
import LabProcess from '../../components/home/LabProcess';
import TechSection from '../../components/home/TechSection';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>MedLab Diagnostics — Accurate Tests. Trusted Healthcare.</title>
        <meta name="description" content="India's most trusted NABL-accredited diagnostic laboratory. Book blood tests, health packages, and home collection online. Reports in 4–24 hours." />
        <meta name="keywords" content="blood test, health checkup, diagnostic lab, NABL accredited, home collection, thyroid test, diabetes test, health packages" />
        <meta property="og:title" content="MedLab Diagnostics — Accurate Tests. Trusted Healthcare." />
        <meta property="og:description" content="Advanced laboratory testing with world-class technology and experienced specialists." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://medlabdiagnostics.com/" />
      </Helmet>

      <HeroSection />
      <WhyChooseUs />
      <TestCategories />
      <HealthPackages />
      <HomeCollection />
      <LabProcess />
      <DoctorsSection />
      <TechSection />
      <TestimonialsSection />
      <StatsSection />
      <BlogSection />
      <PartnerLogos />
      <FAQSection />
      <ContactSection />
    </>
  );
};

export default Home;
