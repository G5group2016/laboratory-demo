import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useGetPackagesQuery, useCreatePackageMutation, useUpdatePackageMutation, useDeletePackageMutation } from '../../store/api';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiX, FiCheck, FiChevronRight } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const categories = [
  'Basic', "Women's Wellness", "Men's Wellness", 'Senior Citizen',
  'Diabetes', 'Heart', 'Executive', 'Corporate', 'Other'
];

const badges = ['', 'Best Value', 'Popular', 'Best Seller', 'Recommended', 'Premium', 'New', 'Corporate'];

const Packages = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [editingPackage, setEditingPackage] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [testInput, setTestInput] = useState('');
  const [testsIncludedList, setTestsIncludedList] = useState([]);

  const { data, isLoading } = useGetPackagesQuery({
    limit: 100,
  });

  const [createPackage] = useCreatePackageMutation();
  const [updatePackage] = useUpdatePackageMutation();
  const [deletePackage] = useDeletePackageMutation();

  const packages = (data?.data || []).filter(pkg => {
    const matchesSearch = pkg.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || pkg.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const { register, handleSubmit, reset, setValue } = useForm();

  const handleOpenCreate = () => {
    setEditingPackage(null);
    setTestsIncludedList([]);
    setTestInput('');
    reset({
      name: '',
      category: 'Basic',
      description: '',
      price: 0,
      discountedPrice: '',
      testsCount: 0,
      reportTime: '24 hours',
      sampleType: 'Blood',
      badge: '',
      isHomeCollection: true,
      isFeatured: false,
      isActive: true,
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (pkg) => {
    setEditingPackage(pkg);
    setTestsIncludedList(pkg.testsIncluded || []);
    setTestInput('');
    reset({
      name: pkg.name,
      category: pkg.category,
      description: pkg.description || '',
      price: pkg.price,
      discountedPrice: pkg.discountedPrice || '',
      testsCount: pkg.testsCount || 0,
      reportTime: pkg.reportTime || '24 hours',
      sampleType: pkg.sampleType || 'Blood',
      badge: pkg.badge || '',
      isHomeCollection: pkg.isHomeCollection,
      isFeatured: pkg.isFeatured,
      isActive: pkg.isActive,
    });
    setIsFormOpen(true);
  };

  const handleAddTestTag = () => {
    if (testInput.trim()) {
      setTestsIncludedList([...testsIncludedList, testInput.trim()]);
      setTestInput('');
    }
  };

  const handleRemoveTestTag = (index) => {
    setTestsIncludedList(testsIncludedList.filter((_, i) => i !== index));
  };

  const onSubmit = async (formData) => {
    const discountPercent = formData.price > 0 && formData.discountedPrice
      ? Math.round(((formData.price - formData.discountedPrice) / formData.price) * 100)
      : 0;

    const payload = {
      ...formData,
      testsIncluded: testsIncludedList,
      discountPercent,
    };

    try {
      if (editingPackage) {
        await updatePackage({ id: editingPackage._id, body: payload }).unwrap();
        toast.success('Package updated successfully');
      } else {
        await createPackage(payload).unwrap();
        toast.success('Package created successfully');
      }
      setIsFormOpen(false);
      reset();
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to save package');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      try {
        await deletePackage(id).unwrap();
        toast.success('Package deleted successfully');
      } catch (err) {
        toast.error('Failed to delete package');
      }
    }
  };

  return (
    <>
      <Helmet><title>Packages Management — MedLab Admin</title></Helmet>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">Manage Health Packages</h1>
            <p className="text-[var(--text-secondary)] text-sm">Create and modify comprehensive diagnostic packages.</p>
          </div>
          <button
            onClick={handleOpenCreate}
            className="flex items-center justify-center gap-1.5 px-5 py-3 gradient-primary text-white font-semibold rounded-2xl shadow-md hover:shadow-primary transition-all duration-300 w-fit"
          >
            <FiPlus /> Add New Package
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-3xl p-5 shadow-card border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-sm">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search package name..."
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
        ) : packages.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center shadow-card border border-gray-100">
            <p className="text-[var(--text-secondary)]">No health packages found.</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-card border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-[var(--text-muted)] text-left border-b border-gray-100">
                    <th className="px-6 py-4 font-medium">Package Name</th>
                    <th className="px-6 py-4 font-medium">Category</th>
                    <th className="px-6 py-4 font-medium">Included Tests</th>
                    <th className="px-6 py-4 font-medium">Pricing</th>
                    <th className="px-6 py-4 font-medium">Parameters count</th>
                    <th className="px-6 py-4 font-medium">Status / Badge</th>
                    <th className="px-6 py-4 font-medium text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {packages.map((pkg) => (
                    <tr key={pkg._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-[var(--text-primary)]">{pkg.name}</p>
                          <p className="text-[var(--text-muted)] text-xs line-clamp-1">{pkg.description}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[var(--text-secondary)] font-medium text-xs bg-gray-100 px-2.5 py-1 rounded-xl">{pkg.category}</span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-[var(--text-secondary)] line-clamp-1 text-xs">{pkg.testsIncluded?.join(', ')}</p>
                      </td>
                      <td className="px-6 py-4 font-medium text-[var(--text-primary)]">
                        <div>
                          <span className="font-bold">₹{pkg.discountedPrice || pkg.price}</span>
                          {pkg.discountedPrice && (
                            <span className="text-[var(--text-muted)] text-xs line-through ml-2.5">₹{pkg.price}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-[var(--text-secondary)]">{pkg.testsCount} parameters</td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex gap-2">
                            {pkg.badge && (
                              <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-1.5 py-0.5 rounded-md">{pkg.badge}</span>
                            )}
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                              pkg.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {pkg.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                          {pkg.isFeatured && <p className="text-[10px] text-yellow-600 font-semibold">★ Featured Package</p>}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleOpenEdit(pkg)}
                            className="p-2 text-gray-500 hover:text-[var(--primary)] hover:bg-blue-50 rounded-xl transition-all"
                          >
                            <FiEdit2 size={15} />
                          </button>
                          <button
                            onClick={() => handleDelete(pkg._id)}
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
              <h3 className="text-lg font-bold text-[var(--text-primary)]">{editingPackage ? 'Edit Package' : 'Add New Package'}</h3>
              <button onClick={() => setIsFormOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <FiX size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="overflow-y-auto p-6 space-y-4 flex-1 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">Package Name *</label>
                  <input {...register('name', { required: true })} className="w-full input-base" placeholder="Women's Wellness Package" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">Category *</label>
                  <select {...register('category', { required: true })} className="w-full input-base">
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">Promo Badge</label>
                  <select {...register('badge')} className="w-full input-base">
                    {badges.map(b => <option key={b} value={b}>{b || 'None'}</option>)}
                  </select>
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
                  <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">Tests Parameters Count *</label>
                  <input type="number" {...register('testsCount', { required: true })} className="w-full input-base" placeholder="e.g. 52" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">Report Turnaround *</label>
                  <input {...register('reportTime', { required: true })} className="w-full input-base" placeholder="24 hours, 48 hours" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">Sample Type *</label>
                  <input {...register('sampleType', { required: true })} className="w-full input-base" placeholder="Blood, Urine, etc." />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">Included Tests Checklist</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={testInput}
                    onChange={(e) => setTestInput(e.target.value)}
                    className="flex-1 input-base"
                    placeholder="e.g. Thyroid Profile (Total T3, T4, TSH)"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTestTag();
                      }
                    }}
                  />
                  <button type="button" onClick={handleAddTestTag} className="px-4 bg-gray-800 text-white rounded-2xl font-bold hover:bg-gray-700 transition-colors">Add</button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {testsIncludedList.map((test, index) => (
                    <span key={index} className="inline-flex items-center gap-1 bg-blue-50 text-[var(--primary)] font-semibold text-xs px-3 py-1.5 rounded-xl border border-blue-100">
                      {test}
                      <button type="button" onClick={() => handleRemoveTestTag(index)} className="hover:text-red-500"><FiX size={12} /></button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">Detailed Description</label>
                <textarea rows={3} {...register('description')} className="w-full input-base py-3" placeholder="Explain the focus, importance, or targeted demographic for this wellness package..." />
              </div>

              <div className="flex flex-wrap gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-medium text-[var(--text-secondary)]">
                  <input type="checkbox" {...register('isFeatured')} className="w-4 h-4 rounded text-[var(--primary)]" />
                  <span>Featured Package</span>
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
                <button type="submit" className="px-5 py-2.5 rounded-xl gradient-primary text-white font-semibold hover:shadow-primary transition-colors flex items-center gap-1.5"><FiCheck /> {editingPackage ? 'Save Changes' : 'Create Package'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Packages;
