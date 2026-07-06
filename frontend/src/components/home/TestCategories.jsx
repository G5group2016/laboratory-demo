import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiClock } from 'react-icons/fi';
import { FaFlask } from 'react-icons/fa';
import { SectionWrapper, SectionHeader, AnimatedCard } from '../ui/Animations';
import { useGetTestsQuery } from '../../store/api';

const categoryIcons = {
  'Blood Test': '🩸',
  'Urine Test': '🧪',
  'Thyroid Test': '🦋',
  'Diabetes Test': '🍬',
  'Liver Function': '🫀',
  'Kidney Function': '🫘',
  'Heart Profile': '❤️',
  'Hormone Test': '⚡',
  'Vitamin Test': '💊',
  'Allergy Test': '🌿',
  'COVID Test': '🦠',
  'Cancer Screening': '🔬',
};

const categoryColors = {
  'Blood Test': { from: '#FF6B6B', to: '#FF8E53' },
  'Urine Test': { from: '#F59E0B', to: '#FCD34D' },
  'Thyroid Test': { from: '#7C3AED', to: '#A78BFA' },
  'Diabetes Test': { from: '#0B6EFD', to: '#00D4FF' },
  'Liver Function': { from: '#EF4444', to: '#FB923C' },
  'Kidney Function': { from: '#10B981', to: '#34D399' },
  'Heart Profile': { from: '#EF4444', to: '#F43F5E' },
  'Hormone Test': { from: '#F59E0B', to: '#FBBF24' },
  'Vitamin Test': { from: '#22C55E', to: '#4ADE80' },
  'Allergy Test': { from: '#84CC16', to: '#A3E635' },
  'COVID Test': { from: '#6366F1', to: '#818CF8' },
  'Cancer Screening': { from: '#0B6EFD', to: '#7C3AED' },
};

const TestCategories = () => {
  const { data, isLoading } = useGetTestsQuery({ featured: true, limit: 12 });
  const tests = data?.data || [];

  // Fallback static categories when API not connected
  const fallbackTests = [
    { _id: '1', name: 'Complete Blood Count', category: 'Blood Test', price: 299, discountedPrice: 249, duration: '6 hrs', slug: 'cbc' },
    { _id: '2', name: 'Thyroid Profile (T3,T4,TSH)', category: 'Thyroid Test', price: 699, discountedPrice: 549, duration: '12 hrs', slug: 'thyroid' },
    { _id: '3', name: 'HbA1c (Glycated Hemoglobin)', category: 'Diabetes Test', price: 399, discountedPrice: 349, duration: '6 hrs', slug: 'hba1c' },
    { _id: '4', name: 'Liver Function Test (LFT)', category: 'Liver Function', price: 599, discountedPrice: 499, duration: '12 hrs', slug: 'lft' },
    { _id: '5', name: 'Kidney Function Test (KFT)', category: 'Kidney Function', price: 599, discountedPrice: 499, duration: '12 hrs', slug: 'kft' },
    { _id: '6', name: 'Lipid Profile (Cholesterol)', category: 'Heart Profile', price: 499, discountedPrice: 399, duration: '12 hrs', slug: 'lipid' },
    { _id: '7', name: 'Vitamin D3 (25-OH)', category: 'Vitamin Test', price: 799, discountedPrice: 649, duration: '24 hrs', slug: 'vitamin-d3' },
    { _id: '8', name: 'Hormone Panel (Testosterone)', category: 'Hormone Test', price: 799, discountedPrice: 649, duration: '24 hrs', slug: 'hormone' },
    { _id: '9', name: 'Urine Routine Microscopy', category: 'Urine Test', price: 149, discountedPrice: 99, duration: '4 hrs', slug: 'urine' },
    { _id: '10', name: 'COVID-19 RT-PCR', category: 'COVID Test', price: 499, discountedPrice: 449, duration: '6 hrs', slug: 'covid' },
    { _id: '11', name: 'PSA (Prostate Antigen)', category: 'Cancer Screening', price: 799, discountedPrice: 649, duration: '24 hrs', slug: 'psa' },
    { _id: '12', name: 'Allergy Panel (20 Allergens)', category: 'Allergy Test', price: 2999, discountedPrice: 2499, duration: '48 hrs', slug: 'allergy' },
  ];

  const displayTests = tests.length > 0 ? tests : fallbackTests;

  return (
    <section className="section-py bg-[var(--background)]">
      <div className="container-custom">
        <SectionWrapper>
          <SectionHeader
            label="Our Tests"
            title="Explore Diagnostic Tests"
            subtitle="From routine blood panels to advanced molecular diagnostics — all under one roof."
          />
        </SectionWrapper>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {displayTests.map(({ _id, name, category, price, discountedPrice, duration, slug }, i) => {
            const colors = categoryColors[category] || { from: '#0B6EFD', to: '#00D4FF' };
            const emoji = categoryIcons[category] || '🔬';
            const discount = price && discountedPrice ? Math.round(((price - discountedPrice) / price) * 100) : 0;

            return (
              <AnimatedCard
                key={_id}
                delay={i * 0.05}
                className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 border border-gray-100 flex flex-col"
              >
                {/* Card Header with gradient */}
                <div
                  className="p-6 relative"
                  style={{
                    background: `linear-gradient(135deg, ${colors.from}15, ${colors.to}10)`,
                  }}
                >
                  {/* Discount badge */}
                  {discount > 0 && (
                    <div
                      className="absolute top-3 right-3 text-white text-xs font-bold px-2 py-1 rounded-lg"
                      style={{ background: `linear-gradient(135deg, ${colors.from}, ${colors.to})` }}
                    >
                      {discount}% OFF
                    </div>
                  )}

                  {/* Emoji icon */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300"
                    style={{ background: `linear-gradient(135deg, ${colors.from}20, ${colors.to}15)` }}
                  >
                    {emoji}
                  </div>

                  {/* Category badge */}
                  <div
                    className="inline-block text-xs font-semibold px-2.5 py-1 rounded-lg mb-2"
                    style={{
                      background: `linear-gradient(135deg, ${colors.from}20, ${colors.to}15)`,
                      color: colors.from,
                    }}
                  >
                    {category}
                  </div>

                  <h3 className="font-bold text-[var(--text-primary)] text-base leading-tight group-hover:text-[var(--primary)] transition-colors">
                    {name}
                  </h3>
                </div>

                {/* Card Footer */}
                <div className="p-4 mt-auto border-t border-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-[var(--primary)]">
                        ₹{discountedPrice || price}
                      </span>
                      {discountedPrice && price !== discountedPrice && (
                        <span className="text-sm text-[var(--text-muted)] line-through">₹{price}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-[var(--text-muted)] text-xs">
                      <FiClock size={11} />
                      <span>{duration}</span>
                    </div>
                  </div>

                  <Link
                    to={`/book-test?test=${_id}`}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 text-white"
                    style={{ background: `linear-gradient(135deg, ${colors.from}, ${colors.to})` }}
                  >
                    <FaFlask size={12} />
                    Book Now
                    <FiArrowRight size={12} />
                  </Link>
                </div>
              </AnimatedCard>
            );
          })}
        </div>

        {/* View All */}
        <SectionWrapper className="mt-10 text-center">
          <Link
            to="/tests"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[var(--primary)] text-[var(--primary)] rounded-2xl font-semibold hover:bg-[var(--primary)] hover:text-white transition-all duration-300"
          >
            View All Tests
            <FiArrowRight />
          </Link>
        </SectionWrapper>
      </div>
    </section>
  );
};

export default TestCategories;
