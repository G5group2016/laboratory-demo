import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useGetDoctorsQuery, useCreateDoctorMutation, useUpdateDoctorMutation, useDeleteDoctorMutation } from '../../store/api';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCheck, FiUser, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const Doctors = () => {
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');

  const { data, isLoading } = useGetDoctorsQuery({});
  const [createDoctor] = useCreateDoctorMutation();
  const [updateDoctor] = useUpdateDoctorMutation();
  const [deleteDoctor] = useDeleteDoctorMutation();

  const doctors = data?.data || [];

  const { register, handleSubmit, reset } = useForm();

  const handleOpenCreate = () => {
    setEditingDoctor(null);
    setPhotoFile(null);
    setPhotoPreview('');
    reset({
      name: '',
      email: '',
      phone: '',
      qualification: '',
      specialization: '',
      experience: 0,
      bio: '',
      languages: 'English, Hindi',
      linkedin: '',
      twitter: '',
      isFeatured: false,
      isActive: true,
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (doc) => {
    setEditingDoctor(doc);
    setPhotoFile(null);
    setPhotoPreview(doc.photo || '');
    reset({
      name: doc.name,
      email: doc.email || '',
      phone: doc.phone || '',
      qualification: doc.qualification,
      specialization: doc.specialization,
      experience: doc.experience || 0,
      bio: doc.bio || '',
      languages: doc.languages?.join(', ') || 'English, Hindi',
      linkedin: doc.socialLinks?.linkedin || '',
      twitter: doc.socialLinks?.twitter || '',
      isFeatured: doc.isFeatured,
      isActive: doc.isActive,
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
    const body = new FormData();
    body.append('name', formData.name);
    body.append('email', formData.email);
    body.append('phone', formData.phone);
    body.append('qualification', formData.qualification);
    body.append('specialization', formData.specialization);
    body.append('experience', formData.experience);
    body.append('bio', formData.bio);
    body.append('isActive', formData.isActive);
    body.append('isFeatured', formData.isFeatured);

    const langs = formData.languages.split(',').map(s => s.trim()).filter(Boolean);
    langs.forEach(lang => body.append('languages[]', lang));

    body.append('socialLinks[linkedin]', formData.linkedin);
    body.append('socialLinks[twitter]', formData.twitter);

    if (photoFile) {
      body.append('photo', photoFile);
    }

    try {
      if (editingDoctor) {
        await updateDoctor({ id: editingDoctor._id, body }).unwrap();
        toast.success('Doctor updated successfully');
      } else {
        await createDoctor(body).unwrap();
        toast.success('Doctor created successfully');
      }
      setIsFormOpen(false);
      reset();
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to save doctor details');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      try {
        await deleteDoctor(id).unwrap();
        toast.success('Doctor deleted successfully');
      } catch (err) {
        toast.error('Failed to delete doctor');
      }
    }
  };

  return (
    <>
      <Helmet><title>Doctors Management — MedLab Admin</title></Helmet>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">Manage Specialists</h1>
            <p className="text-[var(--text-secondary)] text-sm">Add or edit diagnostic team profiles.</p>
          </div>
          <button
            onClick={handleOpenCreate}
            className="flex items-center justify-center gap-1.5 px-5 py-3 gradient-primary text-white font-semibold rounded-2xl shadow-md hover:shadow-primary transition-all duration-300 w-fit"
          >
            <FiPlus /> Add New Doctor
          </button>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : doctors.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center shadow-card border border-gray-100">
            <p className="text-[var(--text-secondary)]">No doctor profiles found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doc) => (
              <div key={doc._id} className="bg-white rounded-3xl border border-gray-100 shadow-card overflow-hidden flex flex-col justify-between">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    {doc.photo ? (
                      <img src={doc.photo} alt={doc.name} className="w-16 h-16 rounded-2xl object-cover border border-gray-100" />
                    ) : (
                      <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-[var(--primary)] border border-blue-100">
                        <FiUser size={24} />
                      </div>
                    )}
                    <div>
                      <h3 className="font-bold text-[var(--text-primary)] text-lg leading-tight">{doc.name}</h3>
                      <p className="text-[var(--text-muted)] text-xs font-semibold uppercase tracking-wider mt-0.5">{doc.specialization}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-[var(--text-secondary)]">
                    <p><strong>Qualification:</strong> {doc.qualification}</p>
                    <p><strong>Experience:</strong> {doc.experience} Years</p>
                    <p className="line-clamp-2 text-xs"><strong>Bio:</strong> {doc.bio}</p>
                  </div>
                </div>
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex gap-2">
                    {doc.isFeatured && (
                      <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded-md">Featured</span>
                    )}
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      doc.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {doc.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleOpenEdit(doc)}
                      className="p-2 text-gray-500 hover:text-[var(--primary)] hover:bg-white rounded-xl transition-all border border-transparent hover:border-gray-200"
                    >
                      <FiEdit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(doc._id)}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-white rounded-xl transition-all border border-transparent hover:border-gray-200"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-[var(--text-primary)]">{editingDoctor ? 'Edit Doctor Profile' : 'Add New Doctor'}</h3>
              <button onClick={() => setIsFormOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <FiX size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="overflow-y-auto p-6 space-y-4 flex-1 text-sm">
              <div className="flex flex-col sm:flex-row gap-5 items-center">
                <div className="relative group cursor-pointer">
                  {photoPreview ? (
                    <img src={photoPreview} alt="Preview" className="w-24 h-24 rounded-3xl object-cover border-2 border-[var(--primary)]" />
                  ) : (
                    <div className="w-24 h-24 bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center text-[var(--text-muted)] hover:border-blue-400 transition-colors">
                      <FiUser size={30} />
                      <span className="text-[10px] mt-1 font-semibold">Upload Photo</span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
                <div className="flex-1 grid grid-cols-2 gap-4 w-full">
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold text-[var(--text-primary)] mb-1">Doctor Name *</label>
                    <input {...register('name', { required: true })} className="w-full input-base" placeholder="Dr. Sarah Connor" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[var(--text-primary)] mb-1">Specialization *</label>
                    <input {...register('specialization', { required: true })} className="w-full input-base" placeholder="Clinical Biochemist" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[var(--text-primary)] mb-1">Qualification *</label>
                    <input {...register('qualification', { required: true })} className="w-full input-base" placeholder="MD, PhD (Biochemistry)" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] mb-1">Years Experience *</label>
                  <input type="number" {...register('experience', { required: true })} className="w-full input-base" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] mb-1">Email Address</label>
                  <input type="email" {...register('email')} className="w-full input-base" placeholder="dr@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] mb-1">Phone Number</label>
                  <input {...register('phone')} className="w-full input-base" placeholder="+91 99999..." />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-1">Languages (comma separated)</label>
                <input {...register('languages')} className="w-full input-base" placeholder="English, Hindi, Marathi" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] mb-1">LinkedIn Profile Link</label>
                  <input {...register('linkedin')} className="w-full input-base" placeholder="https://linkedin.com/in/..." />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] mb-1">Twitter Profile Link</label>
                  <input {...register('twitter')} className="w-full input-base" placeholder="https://twitter.com/..." />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-1">Biography</label>
                <textarea rows={3} {...register('bio')} className="w-full input-base py-3" placeholder="Brief summary of experience, field of research, published works..." />
              </div>

              <div className="flex gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-medium text-[var(--text-secondary)]">
                  <input type="checkbox" {...register('isFeatured')} className="w-4 h-4 rounded text-[var(--primary)]" />
                  <span>Featured Profile</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-medium text-[var(--text-secondary)]">
                  <input type="checkbox" {...register('isActive')} className="w-4 h-4 rounded text-[var(--primary)]" />
                  <span>Active & Visible</span>
                </label>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button type="button" onClick={() => setIsFormOpen(false)} className="px-5 py-2.5 rounded-xl border border-gray-200 font-semibold text-[var(--text-secondary)] hover:bg-gray-50 transition-colors">Cancel</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl gradient-primary text-white font-semibold hover:shadow-primary transition-colors flex items-center gap-1.5"><FiCheck /> {editingDoctor ? 'Save Changes' : 'Create Profile'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Doctors;
