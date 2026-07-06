import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCalendar } from 'react-icons/fi';
import { SectionWrapper, SectionHeader, AnimatedCard } from '../ui/Animations';
import { useGetBlogsQuery } from '../../store/api';

const fallbackBlogs = [
  {
    _id: '1',
    title: '10 Signs You Should Get a Blood Test Done Immediately',
    excerpt: 'Many serious conditions can be detected early with simple blood tests. Learn the warning signs that indicate you need lab work done today.',
    category: 'Health Tips',
    readTime: '5 min read',
    slug: 'blood-test-signs',
    image: '',
    publishedAt: new Date('2024-10-15'),
    authorName: 'Dr. Priya Sharma',
  },
  {
    _id: '2',
    title: 'Understanding Your Thyroid: A Complete Guide to Thyroid Testing',
    excerpt: 'Thyroid disorders affect millions worldwide. This guide explains TSH, T3, T4 tests and what your results mean for your health.',
    category: 'Disease Prevention',
    readTime: '7 min read',
    slug: 'thyroid-testing-guide',
    image: '',
    publishedAt: new Date('2024-10-10'),
    authorName: 'Dr. Rajesh Kumar',
  },
  {
    _id: '3',
    title: 'The Importance of Regular Health Checkups After 40',
    excerpt: 'After the age of 40, regular health checkups become essential. Discover which tests are recommended and how frequently you should get screened.',
    category: 'Health Tips',
    readTime: '6 min read',
    slug: 'health-checkups-after-40',
    image: '',
    publishedAt: new Date('2024-10-05'),
    authorName: 'Dr. Ananya Patel',
  },
];

const categoryColors = {
  'Health Tips': { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-100' },
  'Disease Prevention': { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100' },
  'Nutrition': { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-100' },
  'Lab Technology': { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-100' },
  'Patient Stories': { bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-100' },
  'News': { bg: 'bg-cyan-50', text: 'text-cyan-600', border: 'border-cyan-100' },
};

const BlogSection = () => {
  const { data } = useGetBlogsQuery({ featured: true, limit: 3 });
  const blogs = data?.data?.length > 0 ? data.data : fallbackBlogs;

  const placeholderImages = [
    'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&q=80',
    'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&q=80',
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80',
  ];

  return (
    <section className="section-py bg-[var(--background)]">
      <div className="container-custom">
        <SectionWrapper>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <SectionHeader
              label="Health Blog"
              title="Latest Health Tips & Articles"
              subtitle="Stay informed with expert-written articles on health, diagnostics, and wellness."
              center={false}
            />
            <Link
              to="/blog"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 border-2 border-[var(--primary)] text-[var(--primary)] rounded-2xl font-semibold hover:bg-[var(--primary)] hover:text-white transition-all duration-300 text-sm"
            >
              View All Articles <FiArrowRight />
            </Link>
          </div>
        </SectionWrapper>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map(({ _id, title, excerpt, category, readTime, slug, image, publishedAt, authorName }, i) => {
            const colors = categoryColors[category] || categoryColors['Health Tips'];
            const imgSrc = image || placeholderImages[i % placeholderImages.length];

            return (
              <AnimatedCard
                key={_id}
                delay={i * 0.1}
                className="group bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 border border-gray-100 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={imgSrc}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  {/* Category badge */}
                  <div className={`absolute top-3 left-3 px-3 py-1 rounded-xl text-xs font-bold border ${colors.bg} ${colors.text} ${colors.border}`}>
                    {category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-xs text-[var(--text-muted)] mb-3">
                    <span className="flex items-center gap-1">
                      <FiCalendar size={11} />
                      {new Date(publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                    <span>·</span>
                    <span>{readTime}</span>
                    {authorName && (
                      <>
                        <span>·</span>
                        <span>{authorName}</span>
                      </>
                    )}
                  </div>

                  <h3 className="font-bold text-[var(--text-primary)] text-lg leading-tight mb-3 group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                    {title}
                  </h3>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed line-clamp-3 flex-1">
                    {excerpt}
                  </p>

                  <Link
                    to={`/blog/${slug}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] hover:gap-3 transition-all duration-200"
                  >
                    Read Full Article <FiArrowRight size={14} />
                  </Link>
                </div>
              </AnimatedCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
