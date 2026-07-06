import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useGetAllBookingsQuery, useUpdateBookingMutation } from '../../store/api';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { FiSearch, FiFilter, FiEdit2, FiX, FiCheck, FiMail, FiPhone, FiCalendar, FiClock, FiMapPin, FiFileText } from 'react-icons/fi';
import toast from 'react-hot-toast';

const statusColors = {
  pending: 'bg-yellow-50 text-yellow-700 border-yellow-200 dot-yellow-400',
  confirmed: 'bg-blue-50 text-blue-700 border-blue-200 dot-blue-400',
  sample_collected: 'bg-purple-50 text-purple-700 border-purple-200 dot-purple-400',
  processing: 'bg-cyan-50 text-cyan-700 border-cyan-200 dot-cyan-400',
  completed: 'bg-green-50 text-green-700 border-green-200 dot-green-400',
  cancelled: 'bg-red-50 text-red-700 border-red-200 dot-red-400',
};

const Bookings = () => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  const { data, isLoading } = useGetAllBookingsQuery({
    search: search || undefined,
    status: status === 'All' ? undefined : status,
  });

  const [updateBooking] = useUpdateBookingMutation();
  const bookings = data?.data || [];

  const handleUpdateStatus = async (id, field, value) => {
    setUpdatingId(id);
    try {
      await updateBooking({ id, [field]: value }).unwrap();
      toast.success('Booking updated successfully');
      if (selectedBooking && selectedBooking._id === id) {
        setSelectedBooking(prev => ({ ...prev, [field]: value }));
      }
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to update booking');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedBooking) return;
    try {
      await updateBooking({ id: selectedBooking._id, adminNotes }).unwrap();
      toast.success('Admin notes updated');
      setSelectedBooking(prev => ({ ...prev, adminNotes }));
    } catch (err) {
      toast.error('Failed to update notes');
    }
  };

  return (
    <>
      <Helmet><title>Bookings Management — MedLab Admin</title></Helmet>

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">Manage Bookings</h1>
            <p className="text-[var(--text-secondary)] text-sm">View, track, and update patient test bookings.</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-3xl p-5 shadow-card border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-sm">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by ID, name, or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-base pl-11 py-2.5"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto">
            {['All', 'pending', 'confirmed', 'sample_collected', 'processing', 'completed', 'cancelled'].map((st) => (
              <button
                key={st}
                onClick={() => setStatus(st)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all ${
                  status === st
                    ? 'gradient-primary text-white'
                    : 'bg-gray-50 text-[var(--text-secondary)] hover:bg-blue-50 hover:text-[var(--primary)]'
                }`}
              >
                {st.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : bookings.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center shadow-card border border-gray-100">
            <p className="text-[var(--text-secondary)]">No bookings match the search criteria.</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-card border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-[var(--text-muted)] text-left border-b border-gray-100">
                    <th className="px-6 py-4 font-medium">Booking ID</th>
                    <th className="px-6 py-4 font-medium">Patient</th>
                    <th className="px-6 py-4 font-medium">Test / Package</th>
                    <th className="px-6 py-4 font-medium">Schedule</th>
                    <th className="px-6 py-4 font-medium">Method</th>
                    <th className="px-6 py-4 font-medium">Payment</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {bookings.map((booking) => {
                    const colorClass = statusColors[booking.status] || 'bg-gray-50 text-gray-700';
                    return (
                      <tr key={booking._id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 font-mono text-xs font-semibold text-[var(--primary)]">{booking.bookingId}</td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-[var(--text-primary)]">{booking.patientName}</p>
                            <p className="text-[var(--text-muted)] text-xs">{booking.patientPhone}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-[var(--text-secondary)]">{booking.testName}</p>
                            <p className="text-xs text-[var(--text-muted)] capitalize">{booking.bookingType}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-[var(--text-secondary)]">
                            <p className="font-medium">{new Date(booking.preferredDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                            <p className="text-xs text-[var(--text-muted)]">{booking.preferredTime}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-xl text-xs font-semibold ${
                            booking.isHomeCollection ? 'bg-orange-50 text-orange-700 border border-orange-100' : 'bg-green-50 text-green-700 border border-green-100'
                          }`}>
                            {booking.isHomeCollection ? '🏡 Home' : '🏥 Center'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-bold text-[var(--text-primary)]">₹{booking.totalAmount}</p>
                            <span className={`inline-block text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-md ${
                              booking.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {booking.paymentStatus}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${colorClass}`}>
                            {booking.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => {
                              setSelectedBooking(booking);
                              setAdminNotes(booking.adminNotes || '');
                            }}
                            className="p-2 text-gray-500 hover:text-[var(--primary)] hover:bg-blue-50 rounded-xl transition-all"
                          >
                            <FiEdit2 size={16} />
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

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-[var(--primary)]">{selectedBooking.bookingId}</span>
                <h3 className="text-lg font-bold text-[var(--text-primary)]">Booking Details</h3>
              </div>
              <button onClick={() => setSelectedBooking(null)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <FiX size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-2xl">
                  <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold mb-2">Patient Details</p>
                  <p className="font-bold text-[var(--text-primary)] text-base">{selectedBooking.patientName}</p>
                  <p className="text-[var(--text-secondary)] mt-1 flex items-center gap-1.5"><FiPhone size={12} /> {selectedBooking.patientPhone}</p>
                  <p className="text-[var(--text-secondary)] mt-1 flex items-center gap-1.5"><FiMail size={12} /> {selectedBooking.patientEmail}</p>
                  <p className="text-[var(--text-muted)] mt-1">{selectedBooking.patientAge} Years · <span className="capitalize">{selectedBooking.patientGender}</span></p>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl">
                  <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold mb-2">Schedule & Type</p>
                  <p className="font-bold text-[var(--text-primary)] text-base">{selectedBooking.testName}</p>
                  <p className="text-[var(--text-secondary)] mt-1 flex items-center gap-1.5"><FiCalendar size={12} /> {new Date(selectedBooking.preferredDate).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</p>
                  <p className="text-[var(--text-secondary)] mt-1 flex items-center gap-1.5"><FiClock size={12} /> {selectedBooking.preferredTime}</p>
                  <p className="text-[var(--text-muted)] mt-1 capitalize">{selectedBooking.bookingType} Booking</p>
                </div>
              </div>

              {selectedBooking.isHomeCollection && (
                <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl flex items-start gap-3">
                  <FiMapPin className="text-orange-500 shrink-0 mt-0.5" size={16} />
                  <div>
                    <p className="font-bold text-orange-800">Home Collection Address</p>
                    <p className="text-orange-700 mt-1">{selectedBooking.address}</p>
                  </div>
                </div>
              )}

              {selectedBooking.notes && (
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-start gap-3">
                  <FiFileText className="text-blue-500 shrink-0 mt-0.5" size={16} />
                  <div>
                    <p className="font-bold text-blue-800">Patient Notes</p>
                    <p className="text-blue-700 mt-1">{selectedBooking.notes}</p>
                  </div>
                </div>
              )}

              {/* Status Update Section */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">Update Booking Status</label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {['pending', 'confirmed', 'sample_collected', 'processing', 'completed', 'cancelled'].map((st) => (
                      <button
                        key={st}
                        onClick={() => handleUpdateStatus(selectedBooking._id, 'status', st)}
                        disabled={updatingId}
                        className={`py-2 rounded-xl text-xs font-bold border transition-all capitalize ${
                          selectedBooking.status === st
                            ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                            : 'bg-white text-[var(--text-secondary)] border-gray-200 hover:border-blue-400'
                        }`}
                      >
                        {st.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">Payment Status</label>
                    <select
                      value={selectedBooking.paymentStatus}
                      onChange={(e) => handleUpdateStatus(selectedBooking._id, 'paymentStatus', e.target.value)}
                      className="w-full input-base"
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="refunded">Refunded</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">Total Amount (₹)</label>
                    <input
                      type="number"
                      value={selectedBooking.totalAmount || ''}
                      onChange={(e) => handleUpdateStatus(selectedBooking._id, 'totalAmount', parseFloat(e.target.value))}
                      className="w-full input-base font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Admin Notes */}
              <div>
                <label className="block text-sm font-semibold text-[var(--text-primary)] mb-2">Admin Notes (internal only)</label>
                <textarea
                  rows={3}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  className="w-full input-base py-3"
                  placeholder="Add internal notes about reports, sample status, patient issues..."
                />
                <button
                  onClick={handleSaveNotes}
                  className="mt-2 flex items-center gap-1.5 px-4 py-2 bg-gray-800 text-white rounded-xl text-xs font-semibold hover:bg-gray-700 transition-colors"
                >
                  <FiCheck size={14} /> Save Notes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Bookings;
