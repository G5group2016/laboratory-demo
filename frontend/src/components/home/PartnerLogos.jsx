import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { SectionWrapper } from '../ui/Animations';

const partners = [
  'Apollo Hospitals', 'Fortis Healthcare', 'Max Hospital', 'Manipal Hospitals',
  'Narayana Health', 'Aster DM', 'AIIMS', 'Medanta', 'Columbia Asia', 'HCG',
  'KIMS', 'Wockhardt', 'Global Hospital', 'SRM Hospitals',
];

const PartnerLogos = () => (
  <section className="py-12 bg-white border-y border-gray-100">
    <div className="container-custom">
      <SectionWrapper className="text-center mb-8">
        <p className="text-[var(--text-muted)] text-sm font-medium uppercase tracking-widest">
          Trusted Hospital Partners
        </p>
      </SectionWrapper>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={40}
        slidesPerView={2}
        breakpoints={{ 480: { slidesPerView: 3 }, 768: { slidesPerView: 4 }, 1024: { slidesPerView: 6 } }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop
        speed={1000}
      >
        {partners.map((partner) => (
          <SwiperSlide key={partner}>
            <div className="h-14 flex items-center justify-center px-4 rounded-xl border border-gray-100 hover:border-blue-100 hover:shadow-sm transition-all duration-300">
              <span className="text-[var(--text-muted)] font-semibold text-sm whitespace-nowrap">{partner}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </section>
);

export default PartnerLogos;
