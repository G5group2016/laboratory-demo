import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import { useGetBlogQuery } from '../../store/api';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const BlogDetail = () => {
  const { slug } = useParams();
  const { data, isLoading, isError } = useGetBlogQuery(slug);
  const blog = data?.data;

  if (isLoading) return <div className="pt-24"><LoadingSpinner /></div>;
  if (isError || !blog) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Article Not Found</h2>
        <Link to="/blog" className="text-[var(--primary)] hover:underline flex items-center gap-2"><FiArrowLeft /> Back to Blog</Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{blog.title} — MedLab Diagnostics</title>
        <meta name="description" content={blog.excerpt} />
      </Helmet>
      <div className="bg-gradient-to-r from-[#0A1628] to-[#0B6EFD] pt-16 pb-24">
        <div className="container-custom max-w-4xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"><FiArrowLeft /> Back to Blog</Link>
          <span className="inline-block px-3 py-1 bg-white/20 text-white text-sm rounded-xl mb-4">{blog.category}</span>
          <h1 className="text-white mb-4">{blog.title}</h1>
          <div className="flex items-center gap-5 text-white/60 text-sm">
            {blog.authorName && <span className="flex items-center gap-1.5"><FiUser size={14} /> {blog.authorName}</span>}
            <span className="flex items-center gap-1.5"><FiCalendar size={14} /> {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-IN', { dateStyle: 'long' })}</span>
            <span className="flex items-center gap-1.5"><FiClock size={14} /> {blog.readTime}</span>
          </div>
        </div>
      </div>
      <div className="container-custom max-w-4xl -mt-10 pb-20">
        {blog.image && (
          <img src={blog.image} alt={blog.title} className="w-full rounded-3xl h-72 object-cover mb-8 shadow-xl" />
        )}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-card border border-gray-100">
          <div className="prose prose-lg max-w-none text-[var(--text-secondary)] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-8 border border-blue-100 text-center">
          <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">Ready to take charge of your health?</h3>
          <p className="text-[var(--text-secondary)] mb-5">Book a diagnostic test today and get results in as little as 4 hours.</p>
          <Link to="/book-test" className="inline-flex items-center gap-2 px-8 py-4 gradient-primary text-white rounded-2xl font-semibold hover:shadow-primary transition-all duration-300">
            Book a Test Now
          </Link>
        </div>
      </div>
    </>
  );
};

export default BlogDetail;
