import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from './store/authSlice';
import PublicLayout from './components/common/PublicLayout';
import AdminLayout from './components/admin/AdminLayout';
import LoadingSpinner from './components/ui/LoadingSpinner';
import ScrollToTop from './components/common/ScrollToTop';

// Lazy-loaded public pages
const Home = lazy(() => import('./pages/public/Home'));
const About = lazy(() => import('./pages/public/About'));
const Tests = lazy(() => import('./pages/public/Tests'));
const Packages = lazy(() => import('./pages/public/Packages'));
const Doctors = lazy(() => import('./pages/public/Doctors'));
const Blog = lazy(() => import('./pages/public/Blog'));
const BlogDetail = lazy(() => import('./pages/public/BlogDetail'));
const Gallery = lazy(() => import('./pages/public/Gallery'));
const Contact = lazy(() => import('./pages/public/Contact'));
const BookTest = lazy(() => import('./pages/public/BookTest'));
const FAQs = lazy(() => import('./pages/public/FAQs'));
const Testimonials = lazy(() => import('./pages/public/Testimonials'));
const NotFound = lazy(() => import('./pages/public/NotFound'));
const Login = lazy(() => import('./pages/public/Login'));
const Register = lazy(() => import('./pages/public/Register'));

// Lazy-loaded admin pages
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminTests = lazy(() => import('./pages/admin/Tests'));
const AdminPackages = lazy(() => import('./pages/admin/Packages'));
const AdminDoctors = lazy(() => import('./pages/admin/Doctors'));
const AdminBookings = lazy(() => import('./pages/admin/Bookings'));
const AdminBlogs = lazy(() => import('./pages/admin/Blogs'));
const AdminUsers = lazy(() => import('./pages/admin/Users'));
const AdminContacts = lazy(() => import('./pages/admin/Contacts'));
const AdminGallery = lazy(() => import('./pages/admin/Gallery'));

// Protected admin route
const AdminRoute = ({ children }) => {
  const user = useSelector(selectCurrentUser);
  if (!user || !['admin', 'receptionist'].includes(user.role)) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

import { Navigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/tests" element={<Tests />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book-test" element={<BookTest />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="tests" element={<AdminTests />} />
            <Route path="packages" element={<AdminPackages />} />
            <Route path="doctors" element={<AdminDoctors />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="blogs" element={<AdminBlogs />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="contacts" element={<AdminContacts />} />
            <Route path="gallery" element={<AdminGallery />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
