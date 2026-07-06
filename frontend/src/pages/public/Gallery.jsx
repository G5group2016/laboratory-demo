import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { motion } from 'framer-motion';
import { useGetGalleryQuery } from '../../store/api';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const categories = ['All', 'Laboratory', 'Equipment', 'Team', 'Facility', 'Events'];

const fallbackGallery = [
  { _id: '1', image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&q=80', caption: 'Main Laboratory', category: 'Laboratory' },
  { _id: '2', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80', caption: 'Advanced Equipment', category: 'Equipment' },
  { _id: '3', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80', caption: 'Our Expert Team', category: 'Team' },
  { _id: '4', image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80', caption: 'Blood Analysis Lab', category: 'Laboratory' },
  { _id: '5', image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80', caption: 'PCR Lab', category: 'Laboratory' },
  { _id: '6', image: 'https://images.unsplash.com/photo-1582560475093-ba66accbc7f6?w=800&q=80', caption: 'Modern Facility', category: 'Facility' },
  { _id: '7', image: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=800&q=80', caption: 'Reception Area', category: 'Facility' },
  { _id: '8', image: 'https://images.unsplash.com/photo-1588776814546-1ffbb3e1e35b?w=800&q=80', caption: 'Automated Analyzer', category: 'Equipment' },
  { _id: '9', image: 'https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=800&q=80', caption: 'Health Camp Event', category: 'Events' },
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const { data, isLoading } = useGetGalleryQuery({ category: activeCategory === 'All' ? undefined : activeCategory });
  const items = data?.data?.length > 0 ? data.data : fallbackGallery;

  const filtered = activeCategory === 'All' ? items : items.filter(i => i.category === activeCategory);
  const slides = filtered.map(i => ({ src: i.image, alt: i.caption }));

  return (
    <>
      <Helmet>
        <title>Gallery — MedLab Diagnostics</title>
        <meta name="description" content="Explore MedLab's world-class laboratory facilities, advanced equipment, and expert team." />
      </Helmet>
      <div className="bg-gradient-to-r from-[#0A1628] to-[#0B6EFD] pt-16 pb-24">
        <div className="container-custom text-center">
          <div className="section-label bg-white/20 text-white mx-auto mb-4">🖼️ Gallery</div>
          <h1 className="text-white mb-4">Our World-Class Facility</h1>
          <p className="text-white/70 max-w-lg mx-auto">Take a virtual tour of our state-of-the-art laboratories, modern equipment, and expert team.</p>
        </div>
      </div>
      <div className="container-custom -mt-8 pb-20">
        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap bg-white rounded-3xl shadow-card p-4 mb-8 border border-gray-100">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeCategory === cat ? 'gradient-primary text-white' : 'bg-gray-50 text-[var(--text-secondary)] hover:bg-blue-50 hover:text-[var(--primary)]'}`}>
              {cat}
            </button>
          ))}
        </div>

        {isLoading ? <LoadingSpinner /> : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {filtered.map(({ _id, image, caption }, i) => (
              <motion.div
                key={_id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
                className="group relative overflow-hidden rounded-2xl cursor-pointer break-inside-avoid"
                onClick={() => setLightboxIndex(i)}
              >
                <img
                  src={image}
                  alt={caption}
                  className="w-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm font-medium">{caption}</p>
                </div>
                <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-lg">+</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={slides}
      />
    </>
  );
};

export default Gallery;
