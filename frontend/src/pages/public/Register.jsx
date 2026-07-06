import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiPhone, FiArrowRight } from 'react-icons/fi';
import { FaMicroscope } from 'react-icons/fa';
import { useRegisterMutation } from '../../store/api';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/authSlice';
import toast from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register_, { isLoading }] = useRegisterMutation();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await register_({ name: data.name, email: data.email, password: data.password, phone: data.phone }).unwrap();
      dispatch(setCredentials({ user: res.user, token: res.token }));
      toast.success('Account created successfully!');
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <>
      <Helmet><title>Register — MedLab Diagnostics</title></Helmet>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-primary">
              <FaMicroscope className="text-white text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">Create Account</h2>
            <p className="text-[var(--text-secondary)] mt-1">Join MedLab for easier bookings & reports</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {[
                { name: 'name', placeholder: 'Full Name', icon: FiUser, rules: { required: true } },
                { name: 'email', placeholder: 'Email Address', icon: FiMail, rules: { required: true, pattern: /\S+@\S+\.\S+/ } },
                { name: 'phone', placeholder: 'Phone Number', icon: FiPhone, rules: {} },
                { name: 'password', placeholder: 'Password (min 6 chars)', icon: FiLock, type: 'password', rules: { required: true, minLength: 6 } },
              ].map(({ name, placeholder, icon: Icon, type = 'text', rules }) => (
                <div key={name}>
                  <div className="relative">
                    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input {...register(name, rules)} type={type} className="input-base pl-11" placeholder={placeholder} />
                  </div>
                  {errors[name] && <p className="text-red-500 text-xs mt-1">{placeholder} is required</p>}
                </div>
              ))}

              <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center gap-2 py-4 gradient-primary text-white rounded-2xl font-semibold hover:shadow-primary transition-all duration-300 disabled:opacity-60">
                {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><span>Create Account</span><FiArrowRight /></>}
              </button>
            </form>
            <p className="text-center mt-5 text-sm text-[var(--text-secondary)]">
              Already have an account?{' '}
              <Link to="/login" className="text-[var(--primary)] font-semibold hover:underline">Sign in</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Register;
