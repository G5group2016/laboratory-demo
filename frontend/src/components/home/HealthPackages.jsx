import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiClock, FiCheck, FiStar } from 'react-icons/fi';
import { FaFlask, FaHome } from 'react-icons/fa';
import { SectionWrapper, SectionHeader, AnimatedCard } from '../ui/Animations';
import { useGetPackagesQuery } from '../../store/api';

const fallbackPackages = [
  {
    _id: '1', name: 'Basic Health Checkup', category: 'Basic',
    testsIncluded: ['CBC', 'Blood Sugar', 'Urine Routine', 'Lipid Profile', 'Liver Function'],
    testsCount: 25, price: 1499, discountedPrice: 999, discountPercent: 33,
    reportTime: '24 hours', badge: 'Best Value', isFeatured: true,
  },
  {
    _id: '2', name: "Women's Wellness Package", category: "Women's Wellness",
    testsIncluded: ['CBC', 'Thyroid Profile', 'Vitamin D', 'Vitamin B12', 'Iron Studies', 'Hormonal Profile'],
    testsCount: 52, price: 3499, discountedPrice: 2499, discountPercent: 29,
    reportTime: '48 hours', badge: 'Popular', isFeatured: true,
  },
  {
    _id: '3', name: "Men's Wellness Package", category: "Men's Wellness",
    testsIncluded: ['CBC', 'Lipid Profile', 'Testosterone', 'PSA', 'Liver Function', 'Kidney Function'],
    testsCount: 48, price: 2999, discountedPrice: 2199, discountPercent: 27,
    reportTime: '24 hours', badge: 'Best Seller', isFeatured: true,
  },
  {
    _id: '4', name: 'Senior Citizen Package', category: 'Senior Citizen',
    testsIncluded: ['CBC', 'Lipid Profile', 'Thyroid', 'Blood Sugar', 'Kidney Function', 'Vitamin Panel'],
    testsCount: 68, price: 3999, discountedPrice: 2799, discountPercent: 30,
    reportTime: '48 hours', badge: 'Recommended', isFeatured: true,
  },
  {
    _id: '5', name: 'Executive Health Package', category: 'Executive',
    testsIncluded: ['CBC', 'Complete Metabolic Panel', 'Thyroid', 'Vitamin Panel', 'Cardiac Risk', 'Cancer Markers'],
    testsCount: 95, price: 6999, discountedPrice: 4999, discountPercent: 29,
    reportTime: '48 hours', badge: 'Premium', isFeatured: true,
  },
  {
    _id: '6', name: 'Cardiac Risk Package', category: 'Heart',
    testsIncluded: ['Lipid Profile', 'hs-CRP', 'Homocysteine', 'ECG', 'Troponin I', 'Lipoprotein (a)'],
    testsCount: 28, price: 2499, discountedPrice: 1899, discountPercent: 24,
    reportTime: '24 hours', badge: 'New', isFeatured: false,
  },
];

const badgeColors = {
  'Best Value': 'bg-green-500',
  'Popular': 'bg-[var(--primary)]',
  'Best Seller': 'bg-orange-500',
  'Recommended': 'bg-purple-500',
  'Premium': 'bg-gradient-to-r from-yellow-500 to-orange-500',
  'New': 'bg-cyan-500',
  'Corporate': 'bg-slate-600',
};

const HealthPackages = () => {
  const { data } = useGetPackagesQuery({ featured: true, limit: 6 });
  const packages = data?.data?.length > 0 ? data.data : fallbackPackages;

  return (
    <section className="section-py bg-white">
      <div className="container-custom">
        <SectionWrapper>
          <SectionHeader
            label="Health Packages"
            title="Popular Health Packages"
            subtitle="Comprehensive diagnostic panels at unbeatable value. Select the package that suits your health goals."
          />
        </SectionWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {packages.map(({
            _id, name, category, testsIncluded = [], testsCount,
            price, discountedPrice, discountPercent, reportTime, badge
          }, i) => (
            <AnimatedCard
              key={_id}
              delay={i * 0.1}
              className="group relative bg-white rounded-3xl shadow-card hover:shadow-card-hover transition-all duration-500 border border-gray-100 overflow-hidden flex flex-col"
            >
              {/* Badge */}
              {badge && (
                <div className={`absolute top-4 right-4 z-10 text-white text-xs font-bold px-3 py-1.5 rounded-xl ${badgeColors[badge] || 'bg-[var(--primary)]'}`}>
                  {badge}
                </div>
              )}

              {/* Header */}
              <div className="p-6 pb-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-b border-blue-50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                    <FaFlask className="text-white" size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-medium">{category}</p>
                    <h3 className="font-bold text-[var(--text-primary)] text-lg leading-tight">{name}</h3>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-end gap-3 mb-2">
                  <span className="text-3xl font-bold text-[var(--primary)]">₹{discountedPrice}</span>
                  {price !== discountedPrice && (
                    <span className="text-lg text-[var(--text-muted)] line-through mb-0.5">₹{price}</span>
                  )}
                  {discountPercent > 0 && (
                    <span className="text-green-600 font-bold text-sm bg-green-50 px-2 py-0.5 rounded-lg">
                      {discountPercent}% OFF
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-[var(--text-muted)]">
                  <span className="flex items-center gap-1">
                    <FaFlask size={11} className="text-[var(--primary)]" />
                    {testsCount}+ parameters
                  </span>
                  <span className="flex items-center gap-1">
                    <FiClock size={11} className="text-[var(--primary)]" />
                    {reportTime}
                  </span>
                </div>
              </div>

              {/* Tests Included */}
              <div className="p-6 flex-1">
                <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">
                  Tests Include:
                </p>
                <ul className="space-y-2">
                  {(testsIncluded || []).slice(0, 5).map((test) => (
                    <li key={test} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                      <FiCheck size={14} className="text-green-500 shrink-0" />
                      {test}
                    </li>
                  ))}
                  {testsIncluded.length > 5 && (
                    <li className="text-xs text-[var(--primary)] font-medium pl-5">
                      + {testsIncluded.length - 5} more tests included
                    </li>
                  )}
                </ul>

                {/* Home Collection */}
                <div className="flex items-center gap-2 mt-4 text-sm text-green-600">
                  <FaHome size={12} />
                  <span>Home collection available</span>
                </div>
              </div>

              {/* CTA */}
              <div className="px-6 pb-6">
                <Link
                  to={`/book-test?package=${_id}`}
                  className="w-full flex items-center justify-center gap-2 py-3.5 gradient-primary text-white rounded-2xl font-semibold group-hover:shadow-primary transition-all duration-300"
                >
                  <FaFlask size={14} />
                  Book Package
                  <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </AnimatedCard>
          ))}
        </div>

        <SectionWrapper className="mt-10 text-center">
          <Link
            to="/packages"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[var(--primary)] text-[var(--primary)] rounded-2xl font-semibold hover:bg-[var(--primary)] hover:text-white transition-all duration-300"
          >
            View All Packages
            <FiArrowRight />
          </Link>
        </SectionWrapper>
      </div>
    </section>
  );
};

export default HealthPackages;
