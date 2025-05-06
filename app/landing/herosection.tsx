"use client";

import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import { useEffect } from 'react';

export default function HeroSection() {

  const slides = [
    { img: '/images/image1.jpg', alt: 'Slide 1' },
    { img: '/images/image2.jpg', alt: 'Slide 2' },
    { img: '/images/image3.jpg', alt: 'Slide 3' },
  ];

  useEffect(() => {
    document.querySelectorAll('.swiper-button-prev, .swiper-button-next').forEach((btn) => {
      btn.classList.add('custom-swiper-button');
    });
  }, []);

  return (
    <section className="hero-gradient section-padding">
      <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="w-full md:w-1/2 text-left animate-fade-in">
          <p className="mb-1">VLSystem by Vistula Lending Corporation</p>
          <h1 className="mb-6">Empowering Lives Through Better Lending</h1>
          <p className="text-xl text-gray-600 mb-8">Experience seamless lending with our cutting-edge platform. Fast, secure, and tailored to your needs.</p>
          <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/ApplicationPage" className="btn-primary">
            Apply Now
          </Link>
          </div>
        </div>

        {/* Slideshow on the Right */}
        <div className="w-full md:w-1/2 relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
              nextEl: '.custom-next',
              prevEl: '.custom-prev',
            }}
            autoplay={{ delay: 5000 }}
            loop
            className="w-full rounded-lg shadow-lg"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index} className="flex justify-center items-center">
                <img
                  src={slide.img}
                  alt={slide.alt}
                  className="w-full h-[400px] object-cover rounded-lg shadow-lg"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="custom-prev swiper-button-prev"></div>
          <div className="custom-next swiper-button-next"></div>
        </div>
      </div>

      <style jsx>{`
        .swiper-button-prev,
        .swiper-button-next {
          color: white !important;
          font-size: 2rem !important; /* Makes icons thicker */
          font-weight: bold;
          text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.7);
        }

        .swiper-button-prev::after,
        .swiper-button-next::after {
          font-size: 2.5rem !important;
          color: white !important;
          font-weight: bold;
        }
      `}</style>
    </section>
  );
}