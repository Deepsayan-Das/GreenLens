// components/AuthPanel.js
'use client';

import { SignUp } from '@clerk/nextjs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

export default function AuthPanel() {
  const slides = [
    { bg: '#D1E8E2', text: 'Sustainable by Design 🌱' },
    { bg: '#A3E4A6', text: 'Clean Energy, Clean Code ⚡' },
    { bg: '#E8F5E9', text: 'Nature Meets Tech 🌿' },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* LEFT: Clerk SignUp */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white  ">
        <div className="w-full max-w-md">
          <div className="mb-6">
            <h1 className="text-3xl font-semibold text-eco-dark">Join EcoApp</h1>
            <p className="text-sm text-gray-500"> {`Create an account — it's fast and secure.`} </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-emerald-50">
            <SignUp
  routing="hash"
  fallbackRedirectUrl="/"
  forceRedirectUrl="/home"

  appearance={{
    variables: { 
      colorPrimary: '#10b981',
      spacingUnit: '0.75rem',
    },
    elements: {
      formButtonPrimary: 'bg-eco-green text-white hover:opacity-90',
      card: 'bg-white shadow-none',
      rootBox: 'w-full',
      cardBox: 'shadow-none',
      formFieldInput: 'py-2',
      formFieldLabel: 'mb-1',
      form: 'gap-3',
      footer: 'mt-4',
      footerAction: 'mt-3',
    },
  }}
/>
          </div>
        </div>
      </div>

      {/* RIGHT: Swiper Carousel */}
      <div className="w-full md:w-1/2 h-80 md:h-auto">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          className="h-full w-full"
        >
          {slides.map((slide, idx) => (
            <SwiperSlide key={idx}>
              <div
                className="h-full flex items-center justify-center p-8 text-center"
                style={{ backgroundColor: slide.bg }}
              >
                <div className="max-w-lg">
                  <h2 className="text-3xl md:text-4xl font-semibold text-eco-dark">{slide.text}</h2>
                  <p className="mt-4 text-gray-700">
                    Minimal, modern UI — placeholder slides for now.
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}