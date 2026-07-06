import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FiCalendar, FiClock, FiArrowRight, FiSearch } from 'react-icons/fi';
import { useGetBlogsQuery } from '../../store/api';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { AnimatedCard } from '../../components/ui/Animations';

const categories = ['All', 'Health Tips', 'Disease Prevention', 'Nutrition', 'Lab Technology', 'Patient Stories', 'News'];

const placeholderImages = [
  'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&q=80',
  'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&q=80',
  'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80',
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80',
  'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetBlogsQuery({
    category: activeCategory === 'All' ? undefined : activeCategory,
    search: search || undefined,
    page, limit: 9,
  });

  const blogs = data?.data || [];

  return (
    <>
      <Helmet>
        <title>Health Blog — MedLab Diagnostics</title>
        <meta name="description" content="Expert health tips, diagnostic guides, and wellness articles from MedLab specialists." />
      </Helmet>
      <div className="bg-gradient-to-r from-[#0A1628] to-[#0B6EFD] pt-16 pb-24">
        <div className="container-custom text-center">
          <div className="section-label bg-white/20 text-white mx-auto mb-4">📝 Health Blog</div>
          <h1 className="text-white mb-4">Health Tips & Articles</h1>
          <p className="text-white/70 mb-8 max-w-lg mx-auto">Expert-written health guides, diagnostic tips, and wellness insights from our medical team.</p>
          <div className="max-w-md mx-auto relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search articles..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white text-[var(--text-primary)] focus:outline-none" />
          </div>
        </div>
      </div>
      <div className="container-custom -mt-8 pb-20">
        {/* Category filters */}
        <div className="flex gap-2 flex-wrap bg-white rounded-3xl shadow-card p-4 mb-8 border border-gray-100">
          {categories.map((cat) => (
            <button key={cat} onClick={() => { setActiveCategory(cat); setPage(1); }}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeCategory === cat ? 'gradient-primary text-white' : 'bg-gray-50 text-[var(--text-secondary)] hover:bg-blue-50 hover:text-[var(--primary)]'}`}>
              {cat}
            </button>
          ))}
        </div>

        {isLoading ? <LoadingSpinner /> : blogs.length === 0 ? (
          <div className="text-center py-16 text-[var(--text-muted)]">No articles found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog, i) => (
              <AnimatedCard key={blog._id} delay={i * 0.07} className="group bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-400 border border-gray-100 flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img src={blog.image || placeholderImages[i % placeholderImages.length]} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <span className="absolute top-3 left-3 px-3 py-1 bg-[var(--primary)] text-white text-xs font-bold rounded-xl">{blog.category}</span>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 text-xs text-[var(--text-muted)] mb-3">
                    <span className="flex items-center gap-1"><FiCalendar size={11} />{new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    <span>·</span><span>{blog.readTime}</span>
                  </div>
                  <h3 className="font-bold text-[var(--text-primary)] text-lg leading-tight mb-3 group-hover:text-[var(--primary)] transition-colors line-clamp-2">{blog.title}</h3>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed line-clamp-3 flex-1">{blog.excerpt}</p>
                  <Link to={`/blog/${blog.slug}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] hover:gap-3 transition-all">
                    Read Article <FiArrowRight size={14} />
                  </Link>
                </div>
              </AnimatedCard>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Blog;
