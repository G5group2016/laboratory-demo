import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useGetGalleryQuery, useCreateGalleryItemMutation, useDeleteGalleryItemMutation } from '../../store/api';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { FiPlus, FiTrash2, FiX, FiCheck, FiImage } from 'react-icons/fi';
import toast from 'react-hot-toast';

const categories = ['Laboratory', 'Equipment', 'Team', 'Facility', 'Events'];

const Gallery = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState('Laboratory');
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const { data, isLoading } = useGetGalleryQuery({
    category: activeCategory === 'All' ? undefined : activeCategory
  });
  const [createGalleryItem, { isLoading: isCreating }] = useCreateGalleryItemMutation();
  const [deleteGalleryItem] = useDeleteGalleryItemMutation();

  const items = data?.data || [];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!photoFile) {
      toast.error('Please select an image file to upload');
      return;
    }
    const body = new FormData();
    body.append('caption', caption);
    body.append('category', category);
    body.append('image', photoFile);

    try {
      await createGalleryItem(body).unwrap();
      toast.success('Image added to gallery');
      setIsFormOpen(false);
      setCaption('');
      setCategory('Laboratory');
      setPhotoFile(null);
      setPhotoPreview('');
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to add image');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        await deleteGalleryItem(id).unwrap();
        toast.success('Image deleted from gallery');
      } catch (err) {
        toast.error('Failed to delete image');
      }
    }
  };

  return (
    <>
      <Helmet><title>Gallery Management — MedLab Admin</title></Helmet>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">Manage Laboratory Gallery</h1>
            <p className="text-[var(--text-secondary)] text-sm">Upload photos of equipment, facility, and medical events.</p>
          </div>
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center justify-center gap-1.5 px-5 py-3 gradient-primary text-white font-semibold rounded-2xl shadow-md hover:shadow-primary transition-all duration-300 w-fit"
          >
            <FiPlus /> Upload Photo
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto bg-white rounded-3xl shadow-card p-4 border border-gray-100">
          {['All', ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'gradient-primary text-white'
                  : 'bg-gray-50 text-[var(--text-secondary)] hover:bg-blue-50 hover:text-[var(--primary)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : items.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center shadow-card border border-gray-100">
            <FiImage className="text-5xl text-gray-300 mx-auto mb-4" />
            <p className="text-[var(--text-secondary)]">No photos found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => (
              <div key={item._id} className="group relative bg-white rounded-2xl overflow-hidden shadow-card border border-gray-100 aspect-square">
                <img src={item.image} alt={item.caption} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-4">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="self-end w-8 h-8 bg-red-600 hover:bg-red-700 text-white rounded-xl flex items-center justify-center shadow-md transition-colors"
                  >
                    <FiTrash2 size={14} />
                  </button>
                  <div>
                    <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">{item.category}</span>
                    <p className="text-white text-xs font-medium mt-1.5 line-clamp-2">{item.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-[var(--text-primary)]">Upload Photo to Gallery</h3>
              <button onClick={() => setIsFormOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <FiX size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-sm">
              <div>
                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">Image File *</label>
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl p-4 hover:border-blue-400 transition-colors cursor-pointer relative bg-gray-50">
                  <FiImage className="text-3xl text-gray-400 mb-2" />
                  <span className="text-xs text-[var(--text-secondary)] font-semibold">Click to select photo</span>
                  <input type="file" accept="image/*" onChange={handleFileChange} required className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
                {photoPreview && (
                  <img src={photoPreview} alt="Preview" className="w-full h-32 object-cover rounded-xl mt-3 border border-gray-200" />
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-1.5">Caption *</label>
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full input-base"
                  placeholder="e.g. Hematology Lab Analyzers"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-1.5">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full input-base"
                  required
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button type="button" onClick={() => setIsFormOpen(false)} className="px-5 py-2.5 rounded-xl border border-gray-200 font-semibold text-[var(--text-secondary)] hover:bg-gray-50 transition-colors">Cancel</button>
                <button type="submit" disabled={isCreating} className="px-5 py-2.5 rounded-xl gradient-primary text-white font-semibold hover:shadow-primary transition-colors flex items-center gap-1.5 disabled:opacity-60">
                  {isCreating ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><FiCheck /> Upload</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
