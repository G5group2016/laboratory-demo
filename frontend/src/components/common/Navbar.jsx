import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMenu, FiX, FiSearch, FiUser, FiChevronDown, FiPhone, FiLogOut
} from 'react-icons/fi';
import { FaFlask, FaMicroscope } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, selectIsAuthenticated, logout } from '../../store/authSlice';
import toast from 'react-hot-toast';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Tests', path: '/tests' },
  { label: 'Packages', path: '/packages' },
  { label: 'Health Checkups', path: '/packages', exact: false },
  { label: 'Doctors', path: '/doctors' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef(null);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // Detect scroll for glassmorphism effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/tests?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/');
  };

  const isHeroPage = location.pathname === '/';

  return (
    <>
      {/* Top Bar */}
      <div className="hidden md:block bg-[var(--primary)] text-white py-2">
        <div className="container-custom flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:1800XXXXXXXX" className="flex items-center gap-2 hover:text-cyan-200 transition-colors">
              <FiPhone size={14} />
              <span>1800-XXX-XXXX (Toll Free)</span>
            </a>
            <span className="opacity-60">|</span>
            <span className="opacity-80">Mon–Sat: 7AM–9PM | Sun: 8AM–6PM</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-green-300">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse inline-block" />
              Reports Online 24/7
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <motion.nav
        initial={false}
        animate={{
          backgroundColor: isScrolled || !isHeroPage
            ? 'rgba(255,255,255,0.95)'
            : 'rgba(10,22,40,0.45)',
          backdropFilter: 'blur(20px)',
          boxShadow: isScrolled || !isHeroPage
            ? '0 4px 30px rgba(11,110,253,0.1)'
            : '0 2px 20px rgba(0,0,0,0.25)',
        }}
        transition={{ duration: 0.3 }}
        className="sticky top-0 z-50 border-b border-white/10"
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-[72px]">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-primary group-hover:shadow-glow transition-all duration-300 group-hover:scale-110">
                <FaMicroscope className="text-white text-xl" />
              </div>
              <div>
                <span
                  className={`font-bold text-xl font-poppins tracking-tight transition-colors duration-300 ${
                    isScrolled || !isHeroPage ? 'text-[var(--text-primary)]' : 'text-white'
                  }`}
                >
                  Med<span className={isScrolled || !isHeroPage ? 'text-[var(--primary)]' : 'text-cyan-300'}>Lab</span>
                </span>
                <div className={`text-xs font-medium tracking-wider transition-colors duration-300 ${
                  isScrolled || !isHeroPage ? 'text-[var(--text-muted)]' : 'text-white/80'
                }`}>
                  DIAGNOSTICS
                </div>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path + link.label}
                  to={link.path}
                  end={link.exact !== false}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? isScrolled || !isHeroPage ? 'text-[var(--primary)] bg-blue-50' : 'text-white bg-white/20'
                        : isScrolled || !isHeroPage
                        ? 'text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-blue-50'
                        : 'text-white hover:text-white hover:bg-white/15'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="relative hidden md:block" ref={searchRef}>
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className={`p-2.5 rounded-lg transition-all duration-200 ${
                    isScrolled || !isHeroPage
                      ? 'text-[var(--text-secondary)] hover:bg-blue-50 hover:text-[var(--primary)]'
                      : 'text-white hover:text-white hover:bg-white/15'
                  }`}
                  aria-label="Search"
                >
                  <FiSearch size={20} />
                </button>
                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.form
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      onSubmit={handleSearch}
                      className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-xl p-4 border border-blue-100"
                    >
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Search tests, packages..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="input-base flex-1"
                          autoFocus
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 gradient-primary text-white rounded-xl font-medium text-sm hover:shadow-primary transition-all duration-300"
                        >
                          Go
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>

              {/* User Menu */}
              <div className="relative hidden md:block" ref={userMenuRef}>
                {isAuthenticated ? (
                  <>
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isScrolled || !isHeroPage
                          ? 'text-[var(--text-secondary)] hover:bg-blue-50'
                          : 'text-white hover:bg-white/15'
                      }`}
                    >
                      <div className="w-7 h-7 gradient-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {user?.name?.charAt(0).toUpperCase()}
                      </div>
                      <span className="max-w-[100px] truncate">{user?.name?.split(' ')[0]}</span>
                      <FiChevronDown size={14} />
                    </button>
                    <AnimatePresence>
                      {isUserMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute right-0 top-12 w-52 bg-white rounded-2xl shadow-xl border border-blue-50 py-2 overflow-hidden"
                        >
                          {['admin', 'receptionist'].includes(user?.role) && (
                            <Link
                              to="/admin"
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--text-secondary)] hover:bg-blue-50 hover:text-[var(--primary)] transition-colors"
                            >
                              <FaFlask size={14} />
                              Admin Dashboard
                            </Link>
                          )}
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                          >
                            <FiLogOut size={14} />
                            Logout
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className={`p-2.5 rounded-lg transition-all duration-200 ${
                      isScrolled || !isHeroPage
                        ? 'text-[var(--text-secondary)] hover:bg-blue-50 hover:text-[var(--primary)]'
                        : 'text-white hover:text-white hover:bg-white/15'
                    }`}
                    aria-label="Login"
                  >
                    <FiUser size={20} />
                  </Link>
                )}
              </div>

              {/* Book Test CTA */}
              <Link
                to="/book-test"
                className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 gradient-primary text-white rounded-xl text-sm font-semibold shadow-primary hover:shadow-glow hover:scale-105 transition-all duration-300"
              >
                <FaFlask size={14} />
                Book Test
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2.5 rounded-xl transition-all duration-200 ${
                  isScrolled || !isHeroPage
                    ? 'text-[var(--text-primary)] hover:bg-blue-50'
                    : 'text-white hover:bg-white/10'
                }`}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
                      <FiX size={24} />
                    </motion.div>
                  ) : (
                    <motion.div key="open" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}>
                      <FiMenu size={24} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[min(320px,90vw)] bg-white shadow-2xl flex flex-col lg:hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <Link to="/" className="flex items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center">
                    <FaMicroscope className="text-white" />
                  </div>
                  <span className="font-bold text-lg text-[var(--text-primary)]">
                    Med<span className="text-[var(--primary)]">Lab</span>
                  </span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Search */}
              <div className="p-4 border-b border-gray-100">
                <form onSubmit={handleSearch} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Search tests..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-base text-sm"
                  />
                  <button type="submit" className="px-3 py-2 gradient-primary text-white rounded-xl">
                    <FiSearch />
                  </button>
                </form>
              </div>

              {/* Nav Links */}
              <nav className="flex-1 overflow-y-auto p-4">
                <div className="space-y-1">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.path + link.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <NavLink
                        to={link.path}
                        end={link.exact !== false}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                            isActive
                              ? 'text-[var(--primary)] bg-blue-50 font-semibold'
                              : 'text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-blue-50'
                          }`
                        }
                      >
                        {link.label}
                      </NavLink>
                    </motion.div>
                  ))}
                </div>
              </nav>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-gray-100 space-y-3">
                <Link
                  to="/book-test"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 gradient-primary text-white rounded-xl font-semibold shadow-primary"
                >
                  <FaFlask />
                  Book a Test
                </Link>
                {isAuthenticated ? (
                  <button
                    onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                    className="w-full py-3 border-2 border-red-100 text-red-500 rounded-xl font-medium hover:bg-red-50 transition-colors text-sm"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 border-2 border-blue-100 text-[var(--primary)] rounded-xl font-medium hover:bg-blue-50 transition-colors text-sm"
                  >
                    <FiUser />
                    Login / Register
                  </Link>
                )}
                <a
                  href="tel:1800XXXXXXXX"
                  className="flex items-center justify-center gap-2 text-sm text-[var(--text-secondary)] py-2"
                >
                  <FiPhone className="text-green-500" />
                  1800-XXX-XXXX (Emergency)
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
