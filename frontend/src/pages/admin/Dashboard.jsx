import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import CountUpModule from 'react-countup';
const CountUp = CountUpModule.default || CountUpModule;
import {
  FiActivity, FiUsers, FiCheckCircle, FiClock, FiTrendingUp, FiDollarSign,
  FiCalendar, FiArrowRight
} from 'react-icons/fi';
import { FaFlask } from 'react-icons/fa';
import { useGetDashboardStatsQuery, useGetAllBookingsQuery } from '../../store/api';
import { Link } from 'react-router-dom';

const statusColors = {
  pending: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', dot: 'bg-yellow-400' },
  confirmed: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-400' },
  completed: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', dot: 'bg-green-400' },
  cancelled: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-400' },
  sample_collected: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', dot: 'bg-purple-400' },
  processing: { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200', dot: 'bg-cyan-400' },
};

const Dashboard = () => {
  const { data: statsData } = useGetDashboardStatsQuery();
  const { data: bookingsData } = useGetAllBookingsQuery({ limit: 8 });
  const stats = statsData?.data;
  const recentBookings = bookingsData?.data || [];

  const kpiCards = [
    { label: 'Total Bookings', value: stats?.totalBookings || 0, icon: FiActivity, color: '#0B6EFD', bg: 'rgba(11,110,253,0.1)', change: '+12%' },
    { label: 'Pending', value: stats?.pendingBookings || 0, icon: FiClock, color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', change: 'Active' },
    { label: 'Completed', value: stats?.completedBookings || 0, icon: FiCheckCircle, color: '#22C55E', bg: 'rgba(34,197,94,0.1)', change: '+8%' },
    { label: 'Revenue (Paid)', value: stats?.totalRevenue || 0, icon: FiDollarSign, color: '#7C3AED', bg: 'rgba(124,58,237,0.1)', prefix: '₹', change: '+15%' },
  ];

  return (
    <>
      <Helmet><title>Dashboard — MedLab Admin</title></Helmet>

      <div className="space-y-6">
        {/* Welcome banner */}
        <div className="bg-gradient-to-r from-[#0B6EFD] to-[#7C3AED] rounded-3xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-1">Welcome back! 👋</h1>
          <p className="text-white/70">Here's what's happening at MedLab today.</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiCards.map(({ label, value, icon: Icon, color, bg, prefix, change }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl p-5 shadow-card border border-gray-100 relative overflow-hidden group hover:shadow-card-hover transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: bg }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-lg">{change}</span>
              </div>
              <div className="text-2xl font-bold text-[var(--text-primary)] mb-1">
                {prefix || ''}<CountUp end={value} duration={2} separator="," enableScrollSpy scrollSpyOnce />
              </div>
              <p className="text-[var(--text-muted)] text-sm">{label}</p>
              {/* Decorative */}
              <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full opacity-10 group-hover:opacity-20 transition-opacity" style={{ background: color }} />
            </motion.div>
          ))}
        </div>

        {/* Booking Status Breakdown */}
        {stats?.bookingsByStatus && stats.bookingsByStatus.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100">
            <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">Bookings by Status</h2>
            <div className="flex flex-wrap gap-3">
              {stats.bookingsByStatus.map(({ _id, count }) => {
                const colors = statusColors[_id] || statusColors.pending;
                return (
                  <div key={_id} className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${colors.bg} ${colors.border}`}>
                    <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
                    <span className={`capitalize font-medium text-sm ${colors.text}`}>{_id.replace('_', ' ')}</span>
                    <span className={`font-bold ${colors.text}`}>{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Recent Bookings */}
        <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-[var(--text-primary)]">Recent Bookings</h2>
            <Link to="/admin/bookings" className="text-sm text-[var(--primary)] font-medium flex items-center gap-1 hover:underline">
              View All <FiArrowRight size={14} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-[var(--text-muted)]">
                  <th className="text-left px-6 py-3 font-medium">Booking ID</th>
                  <th className="text-left px-6 py-3 font-medium">Patient</th>
                  <th className="text-left px-6 py-3 font-medium">Test</th>
                  <th className="text-left px-6 py-3 font-medium">Date</th>
                  <th className="text-left px-6 py-3 font-medium">Amount</th>
                  <th className="text-left px-6 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentBookings.length > 0 ? recentBookings.map((booking) => {
                  const colors = statusColors[booking.status] || statusColors.pending;
                  return (
                    <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs text-[var(--primary)]">{booking.bookingId}</td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-[var(--text-primary)]">{booking.patientName}</p>
                          <p className="text-[var(--text-muted)] text-xs">{booking.patientPhone}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[var(--text-secondary)]">{booking.testName || '—'}</td>
                      <td className="px-6 py-4 text-[var(--text-secondary)]">
                        {new Date(booking.preferredDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </td>
                      <td className="px-6 py-4 font-semibold text-[var(--text-primary)]">₹{booking.totalAmount || '—'}</td>
                      <td className="px-6 py-4">
                        <span className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold border w-fit ${colors.bg} ${colors.text} ${colors.border}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                          {booking.status.replace('_', ' ')}
                        </span>
                      </td>
                    </tr>
                  );
                }) : (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-[var(--text-muted)]">No bookings yet. Seed the database to see demo data.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Add Test', icon: FaFlask, path: '/admin/tests', color: '#0B6EFD' },
            { label: 'Add Package', icon: FiActivity, path: '/admin/packages', color: '#7C3AED' },
            { label: 'Manage Bookings', icon: FiCalendar, path: '/admin/bookings', color: '#22C55E' },
            { label: 'View Enquiries', icon: FiUsers, path: '/admin/contacts', color: '#EF4444' },
          ].map(({ label, icon: Icon, path, color }) => (
            <Link
              key={label}
              to={path}
              className="bg-white rounded-2xl p-5 shadow-card border border-gray-100 hover:shadow-card-hover transition-all duration-300 flex flex-col items-center gap-3 text-center group"
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform" style={{ background: `${color}15` }}>
                <Icon size={20} style={{ color }} />
              </div>
              <span className="text-sm font-medium text-[var(--text-secondary)] group-hover:text-[var(--primary)] transition-colors">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
