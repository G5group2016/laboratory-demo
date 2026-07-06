import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLinkedin, FaTwitter, FaUserMd } from 'react-icons/fa';
import { useGetDoctorsQuery } from '../../store/api';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { AnimatedCard } from '../../components/ui/Animations';

const fallbackDoctors = [
  { _id: '1', name: 'Dr. Priya Sharma', qualification: 'MD, FRCPA', specialization: 'Clinical Pathology', experience: 15, bio: 'Board-certified clinical pathologist with 15 years of experience in diagnostic medicine and laboratory quality management.' },
  { _id: '2', name: 'Dr. Rajesh Kumar', qualification: 'MBBS, MD (Biochemistry)', specialization: 'Clinical Biochemistry', experience: 12, bio: 'Specialist in clinical biochemistry with expertise in metabolic disorders and endocrine testing.' },
  { _id: '3', name: 'Dr. Ananya Patel', qualification: 'MBBS, DNB (Microbiology)', specialization: 'Microbiology & Virology', experience: 10, bio: 'Expert in infectious disease diagnostics and molecular testing methodologies including PCR techniques.' },
  { _id: '4', name: 'Dr. Suresh Iyer', qualification: 'MD, DM (Hematology)', specialization: 'Hematology', experience: 18, bio: 'Senior hematologist specializing in blood disorders, coagulation studies, and bone marrow analysis.' },
  { _id: '5', name: 'Dr. Meera Krishnan', qualification: 'MD (Radiology)', specialization: 'Radiology & Imaging', experience: 8, bio: 'Diagnostic radiologist with expertise in CT, MRI, and ultrasound-guided procedures.' },
  { _id: '6', name: 'Dr. Vikram Singh', qualification: 'MBBS, MD (Cardiology)', specialization: 'Cardiac Diagnostics', experience: 14, bio: 'Cardiologist specializing in non-invasive cardiac diagnostics and ECG interpretation.' },
];

const avatarColors = ['from-blue-500 to-cyan-400', 'from-purple-500 to-pink-400', 'from-green-500 to-teal-400', 'from-orange-500 to-yellow-400', 'from-red-500 to-pink-400', 'from-indigo-500 to-blue-400'];

const Doctors = () => {
  const { data, isLoading } = useGetDoctorsQuery({});
  const doctors = data?.data?.length > 0 ? data.data : fallbackDoctors;

  return (
    <>
      <Helmet>
        <title>Our Doctors — MedLab Diagnostics</title>
        <meta name="description" content="Meet our team of expert pathologists, biochemists, and diagnostic specialists." />
      </Helmet>
      <div className="bg-gradient-to-r from-[#0A1628] to-[#0B6EFD] pt-16 pb-24">
        <div className="container-custom text-center">
          <div className="section-label bg-white/20 text-white mx-auto mb-4">👨‍⚕️ Our Specialists</div>
          <h1 className="text-white mb-4">Meet Our Medical Team</h1>
          <p className="text-white/70 max-w-xl mx-auto">Board-certified pathologists and diagnostic specialists with over 200 combined years of experience.</p>
        </div>
      </div>
      <div className="container-custom -mt-8 pb-20">
        {isLoading ? <LoadingSpinner /> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map(({ _id, name, qualification, specialization, experience, bio, photo }, i) => (
              <AnimatedCard key={_id} delay={i * 0.08} className="group bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 border border-gray-100">
                <div className="relative h-56 overflow-hidden">
                  {photo ? (
                    <img src={photo} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${avatarColors[i % avatarColors.length]} flex items-center justify-center`}>
                      <FaUserMd className="text-white/70 text-8xl" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-bold text-lg">{name}</p>
                    <p className="text-white/80 text-sm">{specialization}</p>
                  </div>
                  <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-xl px-3 py-1.5">
                    <span className="text-white text-xs font-bold">{experience}+ Yrs</span>
                  </div>
                  <div className="absolute top-3 left-3 flex gap-2 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <a href="#" className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-blue-600"><FaLinkedin size={14} /></a>
                    <a href="#" className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-sky-500"><FaTwitter size={14} /></a>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-[var(--primary)] text-sm font-medium mb-1">{qualification}</p>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-5">{bio}</p>
                  <Link to="/book-test" className="w-full flex items-center justify-center gap-2 py-3 gradient-primary text-white rounded-2xl font-semibold hover:shadow-primary transition-all duration-300 text-sm">
                    Book Appointment
                  </Link>
                </div>
              </AnimatedCard>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Doctors;
