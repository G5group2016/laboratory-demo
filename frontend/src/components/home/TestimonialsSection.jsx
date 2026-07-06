import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FiStar } from 'react-icons/fi';
import { FaCheckCircle, FaUserCircle, FaQuoteLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { SectionWrapper, SectionHeader } from '../ui/Animations';
import { useGetTestimonialsQuery } from '../../store/api';

const fallbackTestimonials = [
  { _id: '1', patientName: 'Rahul Mehta', location: 'Mumbai', rating: 5, review: 'Excellent service! Got my reports in just 6 hours. The home collection was very convenient and the staff was professional and courteous. Highly recommend MedLab to everyone!', testTaken: 'Executive Health Package', isVerified: true },
  { _id: '2', patientName: 'Sunita Rao', location: 'Bangalore', rating: 5, review: "MedLab's accuracy is unmatched. My thyroid reports were clear and detailed. The doctors explained everything perfectly. Will always trust MedLab for my family's health.", testTaken: 'Thyroid Profile', isVerified: true },
  { _id: '3', patientName: 'Amit Sharma', location: 'Delhi', rating: 4, review: 'Great experience with home sample collection. The technician arrived on time and was very professional. Reports came in a very readable format. Will definitely use again.', testTaken: 'Basic Health Checkup', isVerified: true },
  { _id: '4', patientName: 'Priya Gupta', location: 'Hyderabad', rating: 5, review: "The Women's Wellness Package was comprehensive and affordable. Reports were delivered digitally and were very easy to understand. The customer support was excellent.", testTaken: "Women's Wellness Package", isVerified: true },
  { _id: '5', patientName: 'Karthik Nair', location: 'Chennai', rating: 5, review: 'Outstanding lab with world-class equipment. The cardiac risk assessment was thorough and helped me understand my health better. The online portal is very user-friendly.', testTaken: 'Cardiac Risk Package', isVerified: true },
  { _id: '6', patientName: 'Deepa Reddy', location: 'Pune', rating: 4, review: 'Very clean and hygienic laboratory. Booking was simple, results were accurate and on time. The home collection service saved me so much time. Highly recommended!', testTaken: 'Diabetes Monitoring Package', isVerified: true },
];

const avatarGradients = [
  'from-blue-500 to-cyan-400',
  'from-purple-500 to-pink-400',
  'from-green-500 to-teal-400',
  'from-orange-500 to-yellow-400',
  'from-red-500 to-rose-400',
  'from-indigo-500 to-violet-400',
];

const TestimonialsSection = () => {
  const { data } = useGetTestimonialsQuery();
  const testimonials = data?.data?.length > 0 ? data.data : fallbackTestimonials;

  return (
    <section className="section-py bg-white">
      <div className="container-custom">
        <SectionWrapper>
          <SectionHeader
            label="Testimonials"
            title="What Our Patients Say"
            subtitle="Real experiences from real patients. We are proud to be trusted by over 250,000 patients across India."
          />
        </SectionWrapper>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true }}
          loop
          className="pb-14"
        >
          {testimonials.map(({ _id, patientName, location, rating, review, testTaken, isVerified, patientPhoto }, i) => (
            <SwiperSlide key={_id}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="group bg-white rounded-3xl p-6 shadow-card hover:shadow-card-hover transition-all duration-500 border border-gray-100 relative overflow-hidden h-full flex flex-col"
              >
                {/* Quote icon background */}
                <FaQuoteLeft className="absolute top-4 right-4 text-6xl text-blue-50 group-hover:text-blue-100 transition-colors duration-300" />

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, idx) => (
                    <FiStar
                      key={idx}
                      size={16}
                      className={idx < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}
                    />
                  ))}
                  <span className="text-xs text-[var(--text-muted)] ml-1">({rating}.0)</span>
                </div>

                {/* Review */}
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed flex-1 relative z-10 italic">
                  "{review}"
                </p>

                {/* Test Taken */}
                {testTaken && (
                  <div className="my-4 px-3 py-1.5 bg-blue-50 text-[var(--primary)] text-xs font-medium rounded-lg inline-flex">
                    🔬 {testTaken}
                  </div>
                )}

                {/* Divider */}
                <hr className="border-gray-100 mb-4" />

                {/* Patient Info */}
                <div className="flex items-center gap-3">
                  {patientPhoto ? (
                    <img src={patientPhoto} alt={patientName} className="w-11 h-11 rounded-full object-cover" />
                  ) : (
                    <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${avatarGradients[i % avatarGradients.length]} flex items-center justify-center text-white font-bold text-base`}>
                      {patientName.charAt(0)}
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-1">
                      <p className="font-semibold text-[var(--text-primary)] text-sm">{patientName}</p>
                      {isVerified && (
                        <FaCheckCircle size={12} className="text-[var(--primary)]" title="Verified Patient" />
                      )}
                    </div>
                    <p className="text-[var(--text-muted)] text-xs">{location}</p>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Summary stats */}
        <SectionWrapper className="mt-4">
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {[
              { value: '4.9/5', label: 'Average Rating', stars: true },
              { value: '12,500+', label: 'Patient Reviews' },
              { value: '98%', label: 'Satisfaction Rate' },
              { value: '250K+', label: 'Patients Served' },
            ].map(({ value, label, stars }) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-bold text-[var(--primary)] mb-1">{value}</div>
                {stars && (
                  <div className="flex justify-center gap-0.5 mb-1">
                    {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-sm">★</span>)}
                  </div>
                )}
                <div className="text-sm text-[var(--text-muted)]">{label}</div>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </div>
    </section>
  );
};

export default TestimonialsSection;
