import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiArrowRight, FiArrowLeft, FiUser, FiCalendar } from 'react-icons/fi';
import { FaFlask, FaHome, FaHospital, FaCheckCircle } from 'react-icons/fa';
import { useCreateBookingMutation, useGetTestsQuery, useGetPackagesQuery } from '../../store/api';
import toast from 'react-hot-toast';

const steps = [
  { id: 1, label: 'Patient Info', icon: FiUser },
  { id: 2, label: 'Select Test', icon: FaFlask },
  { id: 3, label: 'Schedule', icon: FiCalendar },
  { id: 4, label: 'Confirm', icon: FiCheck },
];

const timeSlots = [
  '07:00 AM', '07:30 AM', '08:00 AM', '08:30 AM',
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
  '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM',
];

const BookTest = () => {
  const [searchParams] = useSearchParams();
  const preselectedTest = searchParams.get('test');
  const preselectedPackage = searchParams.get('package');
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingType, setBookingType] = useState(preselectedPackage ? 'package' : 'test');
  const [selectedItem, setSelectedItem] = useState(preselectedTest || preselectedPackage || null);
  const [isHomeCollection, setIsHomeCollection] = useState(searchParams.get('collection') === 'home');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(null);

  const { data: testsData } = useGetTestsQuery({ limit: 50 });
  const { data: packagesData } = useGetPackagesQuery({ limit: 50 });
  const [createBooking, { isLoading }] = useCreateBookingMutation();

  const tests = testsData?.data || [];
  const packages = packagesData?.data || [];

  const { register, handleSubmit, watch, formState: { errors }, getValues } = useForm({
    defaultValues: { bookingType: preselectedPackage ? 'package' : 'test' }
  });

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1));

  const onSubmit = async (data) => {
    if (!selectedItem) { toast.error('Please select a test or package'); return; }
    if (!selectedTime) { toast.error('Please select a time slot'); return; }
    try {
      const res = await createBooking({
        patientName: data.patientName,
        patientEmail: data.patientEmail,
        patientPhone: data.patientPhone,
        patientAge: data.patientAge,
        patientGender: data.patientGender,
        bookingType,
        testId: bookingType === 'test' ? selectedItem : undefined,
        packageId: bookingType === 'package' ? selectedItem : undefined,
        preferredDate: data.preferredDate,
        preferredTime: selectedTime,
        isHomeCollection,
        address: isHomeCollection ? data.address : undefined,
        notes: data.notes,
      }).unwrap();
      setBookingSuccess(res.data);
      toast.success('Booking confirmed! Check your email.');
    } catch (err) {
      toast.error(err?.data?.message || 'Booking failed. Please try again.');
    }
  };

  if (bookingSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[var(--background)]">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-12 text-center max-w-md mx-4 shadow-xl border border-gray-100"
        >
          <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6">
            <FaCheckCircle className="text-white text-4xl" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Booking Confirmed!</h2>
          <p className="text-[var(--text-secondary)] mb-4">Booking ID: <strong className="text-[var(--primary)]">{bookingSuccess.bookingId}</strong></p>
          <p className="text-[var(--text-secondary)] text-sm mb-8">A confirmation email has been sent to your email address. Our team will contact you shortly.</p>
          <a href="/" className="w-full flex items-center justify-center gap-2 py-3 gradient-primary text-white rounded-2xl font-semibold hover:shadow-primary transition-all">
            Back to Home
          </a>
        </motion.div>
      </div>
    );
  }

  const selectedTestObj = bookingType === 'test'
    ? tests.find(t => t._id === selectedItem)
    : packages.find(p => p._id === selectedItem);

  return (
    <>
      <Helmet>
        <title>Book a Test — MedLab Diagnostics</title>
        <meta name="description" content="Book a blood test or health package online. Home collection available. Confirmed within minutes." />
      </Helmet>

      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#0A1628] to-[#0B6EFD] pt-16 pb-20">
        <div className="container-custom text-center">
          <div className="section-label bg-white/20 text-white mx-auto mb-4">📅 Book a Test</div>
          <h1 className="text-white mb-4">Book Your Diagnostic Test</h1>
          <p className="text-white/70 max-w-lg mx-auto">Simple 4-step booking. Home collection or lab visit — your choice.</p>
        </div>
      </div>

      <div className="container-custom -mt-10 pb-20">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Steps Progress */}
          <div className="border-b border-gray-100 px-8 py-6">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              {steps.map((step, i) => {
                const isDone = currentStep > step.id;
                const isCurrent = currentStep === step.id;
                return (
                  <React.Fragment key={step.id}>
                    <div className="flex flex-col items-center gap-2">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                        isDone ? 'gradient-primary text-white' :
                        isCurrent ? 'bg-blue-50 border-2 border-[var(--primary)] text-[var(--primary)]' :
                        'bg-gray-100 text-[var(--text-muted)]'
                      }`}>
                        {isDone ? <FiCheck /> : step.id}
                      </div>
                      <span className={`text-xs font-medium hidden sm:block ${isCurrent ? 'text-[var(--primary)]' : 'text-[var(--text-muted)]'}`}>
                        {step.label}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <div className={`flex-1 h-0.5 mx-2 transition-all duration-500 ${currentStep > step.id ? 'bg-[var(--primary)]' : 'bg-gray-200'}`} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-8 max-w-3xl mx-auto">
              <AnimatePresence mode="wait">
                {/* STEP 1 — Patient Info */}
                {currentStep === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6">Patient Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Full Name *</label>
                        <input {...register('patientName', { required: true })} className="input-base" placeholder="Enter patient full name" />
                        {errors.patientName && <p className="text-red-500 text-xs mt-1">Name is required</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Phone Number *</label>
                        <input {...register('patientPhone', { required: true })} className="input-base" placeholder="+91 9800-XXX-XXX" />
                        {errors.patientPhone && <p className="text-red-500 text-xs mt-1">Phone is required</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Email Address *</label>
                        <input {...register('patientEmail', { required: true, pattern: /\S+@\S+\.\S+/ })} className="input-base" placeholder="your@email.com" />
                        {errors.patientEmail && <p className="text-red-500 text-xs mt-1">Valid email required</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Age</label>
                        <input {...register('patientAge')} type="number" className="input-base" placeholder="25" min="1" max="120" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Gender</label>
                        <select {...register('patientGender')} className="input-base">
                          <option value="">Select gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2 — Select Test */}
                {currentStep === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">Select Test or Package</h3>
                    {/* Toggle */}
                    <div className="flex gap-3 mb-6">
                      <button type="button" onClick={() => setBookingType('test')}
                        className={`flex-1 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 ${bookingType === 'test' ? 'gradient-primary text-white shadow-primary' : 'bg-gray-100 text-[var(--text-secondary)] hover:bg-gray-200'}`}>
                        Individual Tests
                      </button>
                      <button type="button" onClick={() => setBookingType('package')}
                        className={`flex-1 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 ${bookingType === 'package' ? 'gradient-primary text-white shadow-primary' : 'bg-gray-100 text-[var(--text-secondary)] hover:bg-gray-200'}`}>
                        Health Packages
                      </button>
                    </div>

                    <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                      {(bookingType === 'test' ? tests : packages).map((item) => (
                        <div
                          key={item._id}
                          onClick={() => setSelectedItem(item._id)}
                          className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                            selectedItem === item._id
                              ? 'border-[var(--primary)] bg-blue-50'
                              : 'border-gray-100 hover:border-blue-200 bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedItem === item._id ? 'border-[var(--primary)] bg-[var(--primary)]' : 'border-gray-300'}`}>
                              {selectedItem === item._id && <FiCheck className="text-white" size={10} />}
                            </div>
                            <div>
                              <p className="font-semibold text-[var(--text-primary)] text-sm">{item.name}</p>
                              <p className="text-[var(--text-muted)] text-xs">{item.category} • {item.duration || item.reportTime}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-[var(--primary)]">₹{item.discountedPrice || item.price}</p>
                            {item.price !== item.discountedPrice && item.discountedPrice && (
                              <p className="text-xs text-[var(--text-muted)] line-through">₹{item.price}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    {!selectedItem && <p className="text-amber-600 text-sm mt-3">⚠️ Please select a test or package to continue</p>}
                  </motion.div>
                )}

                {/* STEP 3 — Schedule */}
                {currentStep === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6">Schedule Your Appointment</h3>

                    {/* Collection type */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <button type="button" onClick={() => setIsHomeCollection(false)}
                        className={`flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all duration-300 ${!isHomeCollection ? 'border-[var(--primary)] bg-blue-50' : 'border-gray-200 hover:border-blue-200'}`}>
                        <FaHospital size={24} className={!isHomeCollection ? 'text-[var(--primary)]' : 'text-[var(--text-muted)]'} />
                        <span className={`font-semibold text-sm ${!isHomeCollection ? 'text-[var(--primary)]' : 'text-[var(--text-secondary)]'}`}>Lab Visit</span>
                        <span className="text-xs text-[var(--text-muted)]">Visit our nearest branch</span>
                      </button>
                      <button type="button" onClick={() => setIsHomeCollection(true)}
                        className={`flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all duration-300 ${isHomeCollection ? 'border-[var(--primary)] bg-blue-50' : 'border-gray-200 hover:border-blue-200'}`}>
                        <FaHome size={24} className={isHomeCollection ? 'text-[var(--primary)]' : 'text-[var(--text-muted)]'} />
                        <span className={`font-semibold text-sm ${isHomeCollection ? 'text-[var(--primary)]' : 'text-[var(--text-secondary)]'}`}>Home Collection</span>
                        <span className="text-xs text-[var(--text-muted)]">We come to you</span>
                      </button>
                    </div>

                    {isHomeCollection && (
                      <div className="mb-5">
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Collection Address *</label>
                        <textarea {...register('address', { required: isHomeCollection })} rows={3} className="input-base resize-none" placeholder="Enter your full home address with pincode..." />
                        {errors.address && <p className="text-red-500 text-xs mt-1">Address is required for home collection</p>}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                      <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Preferred Date *</label>
                        <input
                          {...register('preferredDate', { required: true })}
                          type="date"
                          min={new Date().toISOString().split('T')[0]}
                          className="input-base"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Preferred Time *</label>
                        <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto">
                          {timeSlots.map((t) => (
                            <button
                              key={t} type="button"
                              onClick={() => setSelectedTime(t)}
                              className={`py-1.5 px-2 rounded-xl text-xs font-medium border transition-all duration-200 ${selectedTime === t ? 'gradient-primary text-white border-transparent' : 'border-gray-200 text-[var(--text-secondary)] hover:border-[var(--primary)]'}`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Special Notes (optional)</label>
                      <textarea {...register('notes')} rows={2} className="input-base resize-none" placeholder="Any special instructions, medical conditions, or preferred entry instructions..." />
                    </div>
                  </motion.div>
                )}

                {/* STEP 4 — Confirm */}
                {currentStep === 4 && (
                  <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6">Confirm Your Booking</h3>
                    <div className="bg-blue-50 rounded-2xl p-6 space-y-4 border border-blue-100">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-[var(--text-muted)]">Patient Name</p>
                          <p className="font-semibold text-[var(--text-primary)]">{watch('patientName')}</p>
                        </div>
                        <div>
                          <p className="text-[var(--text-muted)]">Phone</p>
                          <p className="font-semibold text-[var(--text-primary)]">{watch('patientPhone')}</p>
                        </div>
                        <div>
                          <p className="text-[var(--text-muted)]">Email</p>
                          <p className="font-semibold text-[var(--text-primary)]">{watch('patientEmail')}</p>
                        </div>
                        <div>
                          <p className="text-[var(--text-muted)]">Collection</p>
                          <p className="font-semibold text-[var(--primary)]">{isHomeCollection ? '🏠 Home' : '🏥 Lab Visit'}</p>
                        </div>
                        <div>
                          <p className="text-[var(--text-muted)]">Date</p>
                          <p className="font-semibold text-[var(--text-primary)]">{watch('preferredDate') && new Date(watch('preferredDate')).toLocaleDateString('en-IN', { dateStyle: 'long' })}</p>
                        </div>
                        <div>
                          <p className="text-[var(--text-muted)]">Time</p>
                          <p className="font-semibold text-[var(--text-primary)]">{selectedTime}</p>
                        </div>
                      </div>

                      {selectedTestObj && (
                        <div className="border-t border-blue-200 pt-4">
                          <p className="text-[var(--text-muted)] text-sm mb-2">Selected {bookingType === 'test' ? 'Test' : 'Package'}</p>
                          <div className="flex items-center justify-between">
                            <p className="font-bold text-[var(--text-primary)]">{selectedTestObj.name}</p>
                            <p className="text-xl font-bold text-[var(--primary)]">₹{selectedTestObj.discountedPrice || selectedTestObj.price}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-5 p-4 bg-green-50 rounded-2xl border border-green-100 text-sm text-green-700">
                      ✓ Confirmation email will be sent to <strong>{watch('patientEmail')}</strong>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2 px-6 py-3 border-2 border-gray-200 text-[var(--text-secondary)] rounded-2xl font-semibold hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <FiArrowLeft /> Back
                </button>

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={currentStep === 2 && !selectedItem}
                    className="flex items-center gap-2 px-8 py-3 gradient-primary text-white rounded-2xl font-semibold hover:shadow-primary transition-all duration-300 disabled:opacity-50"
                  >
                    Continue <FiArrowRight />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center gap-2 px-8 py-3 gradient-primary text-white rounded-2xl font-semibold hover:shadow-primary transition-all duration-300 disabled:opacity-60"
                  >
                    {isLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <FiCheck />}
                    Confirm Booking
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default BookTest;
