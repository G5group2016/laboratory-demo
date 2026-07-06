import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useGetAdminBlogsQuery, useCreateBlogMutation, useUpdateBlogMutation, useDeleteBlogMutation } from '../../store/api';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCheck, FiCalendar, FiClock } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const categories = ['Health Tips', 'Disease Prevention', 'Nutrition', 'Lab Technology', 'Patient Stories', 'News'];

const Blogs = () => {
  const [editingBlog, setEditingBlog] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');

  const { data, isLoading } = useGetAdminBlogsQuery({});
  const [createBlog] = useCreateBlogMutation();
  const [updateBlog] = useUpdateBlogMutation();
  const [deleteBlog] = useDeleteBlogMutation();

  const blogs = data?.data || [];

  const { register, handleSubmit, reset } = useForm();

  const handleOpenCreate = () => {
    setEditingBlog(null);
    setPhotoFile(null);
    setPhotoPreview('');
    reset({
      title: '',
      excerpt: '',
      content: '',
      category: 'Health Tips',
      tags: '',
      authorName: '',
      readTime: '5 min read',
      isPublished: true,
      isFeatured: false,
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (blog) => {
    setEditingBlog(blog);
    setPhotoFile(null);
    setPhotoPreview(blog.image || '');
    reset({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      category: blog.category,
      tags: blog.tags?.join(', ') || '',
      authorName: blog.authorName || '',
      readTime: blog.readTime || '5 min read',
      isPublished: blog.isPublished,
      isFeatured: blog.isFeatured,
    });
    setIsFormOpen(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (formData) => {
    // The backend uses upload.single('image') for blog image uploads
    // Let's build a FormData body
    const body = new FormData();
    body.append('title', formData.title);
    body.append('excerpt', formData.excerpt);
    body.append('content', formData.content);
    body.append('category', formData.category);
    body.append('authorName', formData.authorName);
    body.append('readTime', formData.readTime);
    body.append('isPublished', formData.isPublished);
    body.append('isFeatured', formData.isFeatured);

    const tagsArr = formData.tags.split(',').map(s => s.trim()).filter(Boolean);
    tagsArr.forEach(t => body.append('tags[]', t));

    if (photoFile) {
      body.append('image', photoFile);
    }

    try {
      if (editingBlog) {
        await updateBlog({ id: editingBlog._id, body }).unwrap();
        toast.success('Blog article updated successfully');
      } else {
        await createBlog(body).unwrap();
        toast.success('Blog article created successfully');
      }
      setIsFormOpen(false);
      reset();
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to save blog article');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog article?')) {
      try {
        await deleteBlog(id).unwrap();
        toast.success('Blog deleted successfully');
      } catch (err) {
        toast.error('Failed to delete blog article');
      }
    }
  };

  return (
    <>
      <Helmet><title>Blog Articles — MedLab Admin</title></Helmet>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">Manage Health Blog</h1>
            <p className="text-[var(--text-secondary)] text-sm">Write, publish, and schedule medical education articles.</p>
          </div>
          <button
            onClick={handleOpenCreate}
            className="flex items-center justify-center gap-1.5 px-5 py-3 gradient-primary text-white font-semibold rounded-2xl shadow-md hover:shadow-primary transition-all duration-300 w-fit"
          >
            <FiPlus /> Create Article
          </button>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : blogs.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center shadow-card border border-gray-100">
            <p className="text-[var(--text-secondary)]">No articles found.</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-card border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-[var(--text-muted)] text-left border-b border-gray-100">
                    <th className="px-6 py-4 font-medium">Article Title</th>
                    <th className="px-6 py-4 font-medium">Category</th>
                    <th className="px-6 py-4 font-medium">Author</th>
                    <th className="px-6 py-4 font-medium">Published Date</th>
                    <th className="px-6 py-4 font-medium">Read Time</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {blogs.map((blog) => (
                    <tr key={blog._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="max-w-md">
                          <p className="font-semibold text-[var(--text-primary)] truncate">{blog.title}</p>
                          <p className="text-[var(--text-muted)] text-xs line-clamp-1">{blog.excerpt}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[var(--text-secondary)] font-medium text-xs bg-gray-100 px-2.5 py-1 rounded-xl">{blog.category}</span>
                      </td>
                      <td className="px-6 py-4 text-[var(--text-secondary)] font-medium">{blog.authorName || 'Staff Writer'}</td>
                      <td className="px-6 py-4 text-[var(--text-muted)]">
                        {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Draft'}
                      </td>
                      <td className="px-6 py-4 text-[var(--text-secondary)]">{blog.readTime}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {blog.isFeatured && (
                            <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded-md">Featured</span>
                          )}
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            blog.isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {blog.isPublished ? 'Published' : 'Draft'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleOpenEdit(blog)}
                            className="p-2 text-gray-500 hover:text-[var(--primary)] hover:bg-blue-50 rounded-xl transition-all"
                          >
                            <FiEdit2 size={15} />
                          </button>
                          <button
                            onClick={() => handleDelete(blog._id)}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                          >
                            <FiTrash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-[var(--text-primary)]">{editingBlog ? 'Edit Blog Article' : 'Create Blog Article'}</h3>
              <button onClick={() => setIsFormOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <FiX size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="overflow-y-auto p-6 space-y-4 flex-1 text-sm">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-3">
                  <label className="block text-sm font-semibold text-[var(--text-primary)] mb-1">Article Title *</label>
                  <input {...register('title', { required: true })} className="w-full input-base" placeholder="Understanding Your Complete Blood Count Report" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] mb-1">Category *</label>
                  <select {...register('category', { required: true })} className="w-full input-base">
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] mb-1">Author Name</label>
                  <input {...register('authorName')} className="w-full input-base" placeholder="Dr. Priya Sharma" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] mb-1">Estimated Read Time</label>
                  <input {...register('readTime')} className="w-full input-base" placeholder="5 min read" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-1">Tags (comma separated)</label>
                <input {...register('tags')} className="w-full input-base" placeholder="cbc, blood test, report guide, health wellness" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-1">Article Image (upload file)</label>
                <div className="flex gap-4 items-center">
                  <input type="file" accept="image/*" onChange={handleFileChange} className="file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                  {photoPreview && <img src={photoPreview} alt="Preview" className="w-16 h-16 rounded-xl object-cover border border-gray-200" />}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-1">Excerpt (max 300 characters) *</label>
                <textarea rows={2} {...register('excerpt', { required: true, maxLength: 300 })} className="w-full input-base py-2.5" placeholder="A brief hook summary for search pages and listings..." />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-1">Article Body (Supports HTML) *</label>
                <textarea rows={12} {...register('content', { required: true })} className="w-full input-base py-3 font-mono text-xs leading-relaxed" placeholder="<p>Write your detailed article body here...</p>" />
              </div>

              <div className="flex gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-medium text-[var(--text-secondary)]">
                  <input type="checkbox" {...register('isFeatured')} className="w-4 h-4 rounded text-[var(--primary)]" />
                  <span>Featured Post</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-medium text-[var(--text-secondary)]">
                  <input type="checkbox" {...register('isPublished')} className="w-4 h-4 rounded text-[var(--primary)]" />
                  <span>Publish Immediately</span>
                </label>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button type="button" onClick={() => setIsFormOpen(false)} className="px-5 py-2.5 rounded-xl border border-gray-200 font-semibold text-[var(--text-secondary)] hover:bg-gray-50 transition-colors">Cancel</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl gradient-primary text-white font-semibold hover:shadow-primary transition-colors flex items-center gap-1.5"><FiCheck /> {editingBlog ? 'Save Changes' : 'Create Article'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Blogs;
