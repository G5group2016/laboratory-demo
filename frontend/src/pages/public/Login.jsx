import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { FaMicroscope } from 'react-icons/fa';
import { useLoginMutation } from '../../store/api';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/authSlice';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await login(data).unwrap();
      dispatch(setCredentials({ user: res.user, token: res.token }));
      toast.success(`Welcome back, ${res.user.name}!`);
      navigate(res.user.role === 'admin' || res.user.role === 'receptionist' ? '/admin' : '/');
    } catch (err) {
      toast.error(err?.data?.message || 'Login failed. Check your credentials.');
    }
  };

  const fillDemoCredentials = () => {
    setValue('email', 'admin@labdemo.com');
    setValue('password', 'Admin@123456');
  };

  return (
    <>
      <Helmet><title>Login — MedLab Diagnostics</title></Helmet>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-primary">
              <FaMicroscope className="text-white text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">Welcome Back</h2>
            <p className="text-[var(--text-secondary)] mt-1">Sign in to your MedLab account</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Email Address</label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input 
                    {...register('email', { required: true, pattern: /\S+@\S+\.\S+/ })} 
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                    placeholder="your@email.com" 
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">Valid email required</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Password</label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                  <input 
                    {...register('password', { required: true, minLength: 6 })} 
                    type="password" 
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                    placeholder="Enter your password" 
                  />
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">Password required (min 6 chars)</p>}
              </div>

              <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center gap-2 py-4 gradient-primary text-white rounded-2xl font-semibold hover:shadow-primary transition-all duration-300 disabled:opacity-60">
                {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><span>Sign In</span><FiArrowRight /></>}
              </button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-100 text-sm text-[var(--text-secondary)]">
              <p className="font-medium text-[var(--primary)] mb-1">Demo Admin Credentials:</p>
              <p>Email: admin@labdemo.com</p>
              <p>Password: Admin@123456</p>
              <button 
                onClick={fillDemoCredentials}
                className="mt-2 text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-full transition-colors"
              >
                Fill credentials
              </button>
            </div>

            <p className="text-center mt-5 text-sm text-[var(--text-secondary)]">
              Don't have an account?{' '}
              <Link to="/register" className="text-[var(--primary)] font-semibold hover:underline">Register here</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Login;