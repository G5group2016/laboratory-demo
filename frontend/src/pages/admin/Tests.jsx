import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useGetTestsQuery, useCreateTestMutation, useUpdateTestMutation, useDeleteTestMutation } from '../../store/api';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiX, FiCheck } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const categories = [
  'Blood Test', 'Urine Test', 'Thyroid Test', 'Diabetes Test',
  'Liver Function', 'Kidney Function', 'Heart Profile', 'Hormone Test',
  'Vitamin Test', 'Allergy Test', 'COVID Test', 'Cancer Screening', 'Other'
];

const Tests = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [editingTest, setEditingTest] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { data, isLoading } = useGetTestsQuery({
    search: search || undefined,
    category: activeCategory === 'All' ? undefined : activeCategory,
    limit: 100, // Show a larger list for management
  });

  const [createTest] = useCreateTestMutation();
  const [updateTest] = useUpdateTestMutation();
  const [deleteTest] = useDeleteTestMutation();

  const tests = data?.data || [];

  const { register, handleSubmit, reset, setValue } = useForm();

  const handleOpenCreate = () => {
    setEditingTest(null);
    reset({
      name: '',
      category: 'Blood Test',
      description: '',
      shortDescription: '',
      price: 0,
      discountedPrice: '',
      duration: '24 hours',
      sampleType: 'Blood',
      preparation: 'No special preparation required',
      isFeatured: false,
      isActive: true,
      isHomeCollection: true,
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (test) => {
    setEditingTest(test);
    reset({
      name: test.name,
      category: test.category,
      description: test.description || '',
      shortDescription: test.shortDescription || '',
      price: test.price,
      discountedPrice: test.discountedPrice || '',
      duration: test.duration || '24 hours',
      sampleType: test.sampleType || 'Blood',
      preparation: test.preparation || 'No special preparation required',
      isFeatured: test.isFeatured,
      isActive: test.isActive,
      isHomeCollection: test.isHomeCollection,
    });
    setIsFormOpen(true);
  };

  const onSubmit = async (formData) => {
    try {
      if (editingTest) {
        await updateTest({ id: editingTest._id, body: formData }).unwrap();
        toast.success('Test updated successfully');
      } else {
        await createTest(formData).unwrap();
        toast.success('Test created successfully');
      }
      setIsFormOpen(false);
      reset();
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to save test');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this test?')) {
      try {
        await deleteTest(id).unwrap();
        toast.success('Test deleted successfully');
      } catch (err) {
        toast.error('Failed to delete test');
      }
    }
  };

  return (
    <>
      <Helmet><title>Tests Management — MedLab Admin</title></Helmet>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">Manage Diagnostic Tests</h1>
            <p className="text-[var(--text-secondary)] text-sm">Add, edit, or remove tests in the catalog.</p>
          </div>
          <button
            onClick={handleOpenCreate}
            className="flex items-center justify-center gap-1.5 px-5 py-3 gradient-primary text-white font-semibold rounded-2xl shadow-md hover:shadow-primary transition-all duration-300 w-fit"
          >
            <FiPlus /> Add New Test
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-3xl p-5 shadow-card border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-sm">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by test name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-base pl-11 py-2.5"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto">
            <button
              onClick={() => setActiveCategory('All')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all ${
                activeCategory === 'All'
                  ? 'gradient-primary text-white'
                  : 'bg-gray-50 text-[var(--text-secondary)] hover:bg-blue-50 hover:text-[var(--primary)]'
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
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
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : tests.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center shadow-card border border-gray-100">
            <p className="text-[var(--text-secondary)]">No tests found.</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-card border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-[var(--text-muted)] text-left border-b border-gray-100">
                    <th className="px-6 py-4 font-medium">Test Name</th>
                    <th className="px-6 py-4 font-medium">Category</th>
                    <th className="px-6 py-4 font-medium">Price</th>
                    <th className="px-6 py-4 font-medium">Sample / Time</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {tests.map((test) => (
                    <tr key={test._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-[var(--text-primary)]">{test.name}</p>
                          <p className="text-[var(--text-muted)] text-xs line-clamp-1">{test.shortDescription}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[var(--text-secondary)] font-medium text-xs bg-gray-100 px-2.5 py-1 rounded-xl">{test.category}</span>
                      </td>
                      <td className="px-6 py-4 font-medium text-[var(--text-primary)]">
                        <div>
                          <span className="font-bold">₹{test.discountedPrice || test.price}</span>
                          {test.discountedPrice && (
                            <span className="text-[var(--text-muted)] text-xs line-through ml-2.5">₹{test.price}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-xs text-[var(--text-secondary)]">
                          <p>{test.sampleType}</p>
                          <p className="text-[var(--text-muted)] mt-0.5">{test.duration}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {test.isFeatured && (
                            <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-1.5 py-0.5 rounded-md">Featured</span>
                          )}
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                            test.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {test.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleOpenEdit(test)}
                            className="p-2 text-gray-500 hover:text-[var(--primary)] hover:bg-blue-50 rounded-xl transition-all"
                          >
                            <FiEdit2 size={15} />
                          </button>
                          <button
                            onClick={() => handleDelete(test._id)}
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
          <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-[var(--text-primary)]">{editingTest ? 'Edit Test' : 'Add New Test'}</h3>
              <button onClick={() => setIsFormOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <FiX size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="overflow-y-auto p-6 space-y-4 flex-1 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">Test Name *</label>
                  <input {...register('name', { required: true })} className="w-full input-base" placeholder="Complete Blood Count (CBC)" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">Category *</label>
                  <select {...register('category', { required: true })} className="w-full input-base">
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">Sample Type *</label>
                  <input {...register('sampleType', { required: true })} className="w-full input-base" placeholder="Blood, Urine etc." />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">Regular Price (₹) *</label>
                  <input type="number" {...register('price', { required: true, min: 0 })} className="w-full input-base" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">Discounted Price (₹)</label>
                  <input type="number" {...register('discountedPrice')} className="w-full input-base" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">Report Turnaround *</label>
                  <input {...register('duration', { required: true })} className="w-full input-base" placeholder="24 hours, 48 hours" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">Short Description</label>
                <input {...register('shortDescription')} className="w-full input-base" placeholder="Brief summary of the test's purpose..." />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">Detailed Description</label>
                <textarea rows={3} {...register('description')} className="w-full input-base py-3" placeholder="Explain what the test checks, target audience, importance..." />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">Preparation Instructions</label>
                <input {...register('preparation')} className="w-full input-base" placeholder="e.g. 12 hours fasting required. Do not consume alcohol." />
              </div>

              <div className="flex flex-wrap gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-medium text-[var(--text-secondary)]">
                  <input type="checkbox" {...register('isFeatured')} className="w-4 h-4 rounded text-[var(--primary)]" />
                  <span>Featured Test</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-medium text-[var(--text-secondary)]">
                  <input type="checkbox" {...register('isHomeCollection')} className="w-4 h-4 rounded text-[var(--primary)]" />
                  <span>Available for Home Collection</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-medium text-[var(--text-secondary)]">
                  <input type="checkbox" {...register('isActive')} className="w-4 h-4 rounded text-[var(--primary)]" />
                  <span>Active & Visible</span>
                </label>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button type="button" onClick={() => setIsFormOpen(false)} className="px-5 py-2.5 rounded-xl border border-gray-200 font-semibold text-[var(--text-secondary)] hover:bg-gray-50 transition-colors">Cancel</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl gradient-primary text-white font-semibold hover:shadow-primary transition-colors flex items-center gap-1.5"><FiCheck /> {editingTest ? 'Save Changes' : 'Create Test'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Tests;
