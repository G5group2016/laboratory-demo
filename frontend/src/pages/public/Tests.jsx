import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiClock, FiArrowRight } from 'react-icons/fi';
import { FaFlask } from 'react-icons/fa';
import { useGetTestsQuery } from '../../store/api';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { AnimatedCard } from '../../components/ui/Animations';

const categories = [
  'All', 'Blood Test', 'Urine Test', 'Thyroid Test', 'Diabetes Test',
  'Liver Function', 'Kidney Function', 'Heart Profile', 'Hormone Test',
  'Vitamin Test', 'Allergy Test', 'COVID Test', 'Cancer Screening',
];

const categoryColors = {
  'Blood Test': '#EF4444', 'Urine Test': '#F59E0B', 'Thyroid Test': '#7C3AED',
  'Diabetes Test': '#0B6EFD', 'Liver Function': '#EF4444', 'Kidney Function': '#10B981',
  'Heart Profile': '#EF4444', 'Hormone Test': '#F59E0B', 'Vitamin Test': '#22C55E',
  'Allergy Test': '#84CC16', 'COVID Test': '#6366F1', 'Cancer Screening': '#0B6EFD',
};

const Tests = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetTestsQuery({
    search: search || undefined,
    category: activeCategory === 'All' ? undefined : activeCategory,
    page,
    limit: 12,
  });

  const tests = data?.data || [];
  const totalPages = data?.pages || 1;

  return (
    <>
      <Helmet>
        <title>Diagnostic Tests — MedLab Diagnostics</title>
        <meta name="description" content="Browse 500+ diagnostic tests with transparent pricing. Book online with home collection." />
      </Helmet>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#0A1628] to-[#0B6EFD] pt-16 pb-24">
        <div className="container-custom text-center">
          <div className="section-label bg-white/20 text-white mx-auto mb-4">🔬 Diagnostic Tests</div>
          <h1 className="text-white mb-4">Find the Right Test</h1>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">Browse from 500+ tests with transparent pricing, fast turnaround, and home collection.</p>
          <div className="max-w-lg mx-auto relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-lg" />
            <input
              type="text"
              placeholder="Search tests by name, condition..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white text-[var(--text-primary)] text-base shadow-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>
        </div>
      </div>

      <div className="container-custom -mt-8 pb-20">
        {/* Category Filters */}
        <div className="bg-white rounded-3xl shadow-card p-4 mb-8 border border-gray-100">
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setPage(1); }}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? 'gradient-primary text-white shadow-sm'
                    : 'bg-gray-50 text-[var(--text-secondary)] hover:bg-blue-50 hover:text-[var(--primary)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-[var(--text-muted)] text-sm mb-6">
          Showing {tests.length} of {data?.total || 0} tests
          {activeCategory !== 'All' && ` in "${activeCategory}"`}
          {search && ` for "${search}"`}
        </p>

        {isLoading ? (
          <LoadingSpinner text="Loading tests..." />
        ) : tests.length === 0 ? (
          <div className="text-center py-20">
            <FaFlask className="text-6xl text-gray-200 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">No tests found</h3>
            <p className="text-[var(--text-secondary)]">Try a different search term or category</p>
            <button onClick={() => { setSearch(''); setActiveCategory('All'); }} className="mt-4 px-6 py-3 gradient-primary text-white rounded-2xl font-medium text-sm">Clear Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {tests.map((test, i) => {
              const color = categoryColors[test.category] || '#0B6EFD';
              const discount = test.price && test.discountedPrice
                ? Math.round(((test.price - test.discountedPrice) / test.price) * 100) : 0;
              return (
                <AnimatedCard
                  key={test._id}
                  delay={i * 0.04}
                  className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-400 border border-gray-100 flex flex-col"
                >
                  <div className="p-5 pb-3" style={{ background: `${color}08` }}>
                    {discount > 0 && (
                      <span className="inline-block mb-2 px-2 py-0.5 text-white text-xs font-bold rounded-lg" style={{ background: color }}>
                        {discount}% OFF
                      </span>
                    )}
                    <span className="block text-xs font-semibold mb-2" style={{ color }}>{test.category}</span>
                    <h3 className="font-bold text-[var(--text-primary)] text-sm leading-tight group-hover:text-[var(--primary)] transition-colors">{test.name}</h3>
                  </div>
                  <div className="p-5 pt-3 mt-auto">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-xl font-bold text-[var(--primary)]">₹{test.discountedPrice || test.price}</span>
                        {test.discountedPrice && test.price !== test.discountedPrice && (
                          <span className="ml-2 text-xs text-[var(--text-muted)] line-through">₹{test.price}</span>
                        )}
                      </div>
                      <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                        <FiClock size={11} />{test.duration}
                      </span>
                    </div>
                    <Link
                      to={`/book-test?test=${test._id}`}
                      className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:shadow-md"
                      style={{ background: `linear-gradient(135deg, ${color}, ${color}bb)` }}
                    >
                      <FaFlask size={12} /> Book Now <FiArrowRight size={12} />
                    </Link>
                  </div>
                </AnimatedCard>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-10 h-10 rounded-xl font-medium text-sm transition-all ${page === i + 1 ? 'gradient-primary text-white' : 'bg-white text-[var(--text-secondary)] border border-gray-200 hover:border-[var(--primary)]'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Tests;
