import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FiArrowLeft, FiArrowRight, FiStar } from 'react-icons/fi';
import { FaLinkedin, FaTwitter, FaUserMd } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { SectionWrapper, SectionHeader } from '../ui/Animations';
import { useGetDoctorsQuery } from '../../store/api';

const fallbackDoctors = [
  { _id: '1', name: 'Dr. Priya Sharma', qualification: 'MD, FRCPA', specialization: 'Clinical Pathology', experience: 15 },
  { _id: '2', name: 'Dr. Rajesh Kumar', qualification: 'MBBS, MD (Biochemistry)', specialization: 'Clinical Biochemistry', experience: 12 },
  { _id: '3', name: 'Dr. Ananya Patel', qualification: 'MBBS, DNB (Microbiology)', specialization: 'Microbiology & Virology', experience: 10 },
  { _id: '4', name: 'Dr. Suresh Iyer', qualification: 'MD, DM (Hematology)', specialization: 'Hematology', experience: 18 },
  { _id: '5', name: 'Dr. Meera Krishnan', qualification: 'MD (Radiology)', specialization: 'Radiology & Imaging', experience: 8 },
  { _id: '6', name: 'Dr. Vikram Singh', qualification: 'MBBS, MD (Cardiology)', specialization: 'Cardiac Diagnostics', experience: 14 },
];

const avatarColors = [
  'from-blue-500 to-cyan-400',
  'from-purple-500 to-pink-400',
  'from-green-500 to-teal-400',
  'from-orange-500 to-yellow-400',
  'from-red-500 to-pink-400',
  'from-indigo-500 to-blue-400',
];

const DoctorsSection = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const { data } = useGetDoctorsQuery({ featured: true });
  const doctors = data?.data?.length > 0 ? data.data : fallbackDoctors;

  return (
    <section className="section-py bg-[var(--background)]">
      <div className="container-custom">
        <SectionWrapper>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <SectionHeader
              label="Our Team"
              title="Meet Our Specialists"
              subtitle="Board-certified pathologists and diagnostic experts with decades of combined experience."
              center={false}
            />
            <div className="flex gap-3 md:mb-0 mb-4">
              <button ref={prevRef} className="w-11 h-11 rounded-xl border-2 border-blue-100 text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white hover:border-transparent flex items-center justify-center transition-all duration-300">
                <FiArrowLeft />
              </button>
              <button ref={nextRef} className="w-11 h-11 rounded-xl border-2 border-blue-100 text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white hover:border-transparent flex items-center justify-center transition-all duration-300">
                <FiArrowRight />
              </button>
            </div>
          </div>
        </SectionWrapper>

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true, el: '.doctors-pagination' }}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          className="pb-12"
        >
          {doctors.map(({ _id, name, qualification, specialization, experience, photo }, i) => (
            <SwiperSlide key={_id}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-500 border border-gray-100"
              >
                {/* Photo area */}
                <div className="relative h-52 overflow-hidden">
                  {photo ? (
                    <img src={photo} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${avatarColors[i % avatarColors.length]} flex items-center justify-center`}>
                      <FaUserMd className="text-white/80 text-6xl" />
                    </div>
                  )}
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-[var(--primary)] opacity-0 group-hover:opacity-20 transition-opacity duration-500" />

                  {/* Social links (visible on hover) */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-10 group-hover:translate-x-0 transition-transform duration-300">
                    <a href="#" className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-blue-600 shadow-md hover:scale-110 transition-transform">
                      <FaLinkedin size={14} />
                    </a>
                    <a href="#" className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-sky-500 shadow-md hover:scale-110 transition-transform">
                      <FaTwitter size={14} />
                    </a>
                  </div>

                  {/* Experience badge */}
                  <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-1.5">
                    <span className="text-xs font-bold text-[var(--primary)]">{experience}+ Years Exp.</span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="font-bold text-[var(--text-primary)] text-base mb-1">{name}</h3>
                  <p className="text-[var(--primary)] text-sm font-medium mb-1">{specialization}</p>
                  <p className="text-[var(--text-muted)] text-xs mb-4">{qualification}</p>

                  <Link
                    to="/book-test"
                    className="w-full flex items-center justify-center gap-2 py-2.5 gradient-primary text-white rounded-xl text-sm font-semibold hover:shadow-primary transition-all duration-300"
                  >
                    Book Appointment
                  </Link>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom pagination */}
        <div className="doctors-pagination flex justify-center gap-2 -mt-6" />

        <SectionWrapper className="mt-8 text-center">
          <Link to="/doctors" className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[var(--primary)] text-[var(--primary)] rounded-2xl font-semibold hover:bg-[var(--primary)] hover:text-white transition-all duration-300">
            Meet All Doctors <FiArrowRight />
          </Link>
        </SectionWrapper>
      </div>
    </section>
  );
};

export default DoctorsSection;
