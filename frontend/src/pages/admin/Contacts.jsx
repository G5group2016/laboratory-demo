import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useGetContactsQuery, useUpdateContactMutation } from '../../store/api';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { FiMail, FiEdit2, FiX, FiCheck, FiPhone, FiMessageCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

const statusColors = {
  new: 'bg-red-50 text-red-700 border-red-200 dot-red-500',
  in_progress: 'bg-yellow-50 text-yellow-700 border-yellow-200 dot-yellow-500',
  resolved: 'bg-green-50 text-green-700 border-green-200 dot-green-500',
};

const Contacts = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [status, setStatus] = useState('new');
  const [adminNotes, setAdminNotes] = useState('');

  const { data, isLoading } = useGetContactsQuery({});
  const [updateContact, { isLoading: isUpdating }] = useUpdateContactMutation();

  const enquiries = data?.data || [];

  const handleOpenEdit = (enq) => {
    setSelectedContact(enq);
    setStatus(enq.status || 'new');
    setAdminNotes(enq.adminNotes || '');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedContact) return;
    try {
      await updateContact({ id: selectedContact._id, body: { status, adminNotes } }).unwrap();
      toast.success('Enquiry updated successfully');
      setSelectedContact(null);
    } catch (err) {
      toast.error('Failed to update enquiry status');
    }
  };

  return (
    <>
      <Helmet><title>Patient Enquiries — MedLab Admin</title></Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Patient Enquiries</h1>
          <p className="text-[var(--text-secondary)] text-sm">View, track, and reply to customer contact form messages.</p>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : enquiries.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center shadow-card border border-gray-100">
            <FiMail className="text-5xl text-gray-300 mx-auto mb-4" />
            <p className="text-[var(--text-secondary)]">No patient enquiries found.</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-card border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-[var(--text-muted)] text-left border-b border-gray-100">
                    <th className="px-6 py-4 font-medium">Patient Name</th>
                    <th className="px-6 py-4 font-medium">Email</th>
                    <th className="px-6 py-4 font-medium">Phone</th>
                    <th className="px-6 py-4 font-medium">Subject</th>
                    <th className="px-6 py-4 font-medium">Message Excerpt</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium">Received At</th>
                    <th className="px-6 py-4 text-center font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {enquiries.map((enq) => {
                    const colors = statusColors[enq.status] || statusColors.new;
                    return (
                      <tr key={enq._id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 font-semibold text-[var(--text-primary)]">{enq.name}</td>
                        <td className="px-6 py-4 text-[var(--text-secondary)]">{enq.email}</td>
                        <td className="px-6 py-4 text-[var(--text-secondary)]">{enq.phone || '—'}</td>
                        <td className="px-6 py-4 font-medium text-[var(--text-primary)]">{enq.subject || 'General Inquiry'}</td>
                        <td className="px-6 py-4 text-[var(--text-muted)] max-w-xs truncate">{enq.message}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold border ${colors}`}>
                            {enq.status?.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-[var(--text-muted)]">
                          {new Date(enq.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => handleOpenEdit(enq)}
                            className="p-2 text-gray-500 hover:text-[var(--primary)] hover:bg-blue-50 rounded-xl transition-all"
                          >
                            <FiEdit2 size={15} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-[var(--text-primary)]">Enquiry Details</h3>
              <button onClick={() => setSelectedContact(null)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <FiX size={18} />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="overflow-y-auto p-6 space-y-4 flex-1 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-2xl">
                  <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold mb-1">Contact Info</p>
                  <p className="font-bold text-[var(--text-primary)] text-base">{selectedContact.name}</p>
                  <p className="text-[var(--text-secondary)] mt-1 flex items-center gap-1.5"><FiPhone size={12} /> {selectedContact.phone || 'No phone'}</p>
                  <p className="text-[var(--text-secondary)] mt-0.5 flex items-center gap-1.5"><FiMail size={12} /> {selectedContact.email}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl">
                  <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold mb-1">Subject</p>
                  <p className="font-bold text-[var(--text-primary)]">{selectedContact.subject || 'General Inquiry'}</p>
                  <p className="text-[var(--text-muted)] mt-1 text-xs">Received: {new Date(selectedContact.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl">
                <p className="font-bold text-blue-800 flex items-center gap-1.5 mb-1.5"><FiMessageCircle size={14} /> Patient Message</p>
                <p className="text-blue-700 whitespace-pre-wrap leading-relaxed">{selectedContact.message}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-1.5">Enquiry Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full input-base"
                >
                  <option value="new">New Enquiry</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved / Replied</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-1.5">Resolution Notes (internal)</label>
                <textarea
                  rows={4}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  className="w-full input-base py-3"
                  placeholder="Record call back summary, resolution steps taken..."
                />
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button type="button" onClick={() => setSelectedContact(null)} className="px-5 py-2.5 rounded-xl border border-gray-200 font-semibold text-[var(--text-secondary)] hover:bg-gray-50 transition-colors">Cancel</button>
                <button type="submit" disabled={isUpdating} className="px-5 py-2.5 rounded-xl gradient-primary text-white font-semibold hover:shadow-primary transition-colors flex items-center gap-1.5">
                  <FiCheck /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Contacts;
