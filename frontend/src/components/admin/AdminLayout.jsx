import React, { useState } from 'react';
import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiGrid, FiActivity, FiPackage, FiUsers, FiBookOpen, FiImage,
  FiMail, FiSettings, FiMenu, FiX, FiLogOut, FiBell, FiChevronRight
} from 'react-icons/fi';
import { FaFlask, FaUserMd, FaMicroscope } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectCurrentUser } from '../../store/authSlice';
import toast from 'react-hot-toast';

const navItems = [
  { label: 'Dashboard', icon: FiGrid, path: '/admin' },
  { label: 'Bookings', icon: FiActivity, path: '/admin/bookings' },
  { label: 'Tests', icon: FaFlask, path: '/admin/tests' },
  { label: 'Packages', icon: FiPackage, path: '/admin/packages' },
  { label: 'Doctors', icon: FaUserMd, path: '/admin/doctors' },
  { label: 'Blog', icon: FiBookOpen, path: '/admin/blogs' },
  { label: 'Gallery', icon: FiImage, path: '/admin/gallery' },
  { label: 'Users', icon: FiUsers, path: '/admin/users' },
  { label: 'Enquiries', icon: FiMail, path: '/admin/contacts' },
];

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out');
    navigate('/login');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10">
        <Link to="/admin" className="flex items-center gap-3">
          <div className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center">
            <FaMicroscope className="text-white text-lg" />
          </div>
          {(isSidebarOpen || isMobileSidebarOpen) && (
            <div>
              <span className="text-white font-bold text-base">MedLab</span>
              <span className="block text-white/40 text-xs">Admin Panel</span>
            </div>
          )}
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map(({ label, icon: Icon, path }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/admin'}
            onClick={() => setIsMobileSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-white/20 text-white'
                  : 'text-white/60 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <Icon size={18} className="shrink-0" />
            {(isSidebarOpen || isMobileSidebarOpen) && (
              <>
                <span className="text-sm font-medium flex-1">{label}</span>
                <FiChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User section */}
      <div className="p-3 border-t border-white/10">
        <div className={`flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5 mb-2 ${!isSidebarOpen && !isMobileSidebarOpen ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 gradient-primary rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0">
            {user?.name?.charAt(0)}
          </div>
          {(isSidebarOpen || isMobileSidebarOpen) && (
            <div className="flex-1 overflow-hidden">
              <p className="text-white text-sm font-medium truncate">{user?.name}</p>
              <p className="text-white/40 text-xs capitalize">{user?.role}</p>
            </div>
          )}
        </div>
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/60 hover:bg-red-500/20 hover:text-red-300 transition-all duration-200 ${!isSidebarOpen && !isMobileSidebarOpen ? 'justify-center' : ''}`}
        >
          <FiLogOut size={16} />
          {(isSidebarOpen || isMobileSidebarOpen) && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[var(--background)] overflow-hidden">
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: isSidebarOpen ? 240 : 64 }}
        transition={{ duration: 0.3 }}
        className="hidden lg:flex flex-col flex-shrink-0 bg-[#0A1628] overflow-hidden"
      >
        <SidebarContent />
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSidebarOpen(false)}
              className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-64 bg-[#0A1628] flex flex-col"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-100 px-6 h-16 flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setIsSidebarOpen(!isSidebarOpen);
                setIsMobileSidebarOpen(!isMobileSidebarOpen);
              }}
              className="p-2 rounded-xl hover:bg-gray-100 text-[var(--text-secondary)] transition-colors"
            >
              <FiMenu size={20} />
            </button>
            <div className="hidden md:block">
              <h1 className="text-lg font-bold text-[var(--text-primary)]">Admin Panel</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-xl hover:bg-gray-100 text-[var(--text-secondary)] transition-colors">
              <FiBell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <Link to="/" className="text-sm text-[var(--primary)] font-medium hover:underline hidden md:block">← View Site</Link>
            <div className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center text-white font-bold text-sm">
              {user?.name?.charAt(0)}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
