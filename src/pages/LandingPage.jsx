import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';


const LandingPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [preloaderComplete, setPreloaderComplete] = useState(false);
  const cards = [
    {
      id: 1,
      color: '#000000',
      bgImage: '/main1.jpg'
    },
    {
      id: 2,
      color: '#000000',
      bgImage: '/main2.jpg'
    }
  ]




  return (
    <div className="min-h-screen relative w-full flex items-end justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
          <div
            className="absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out"
            style={{
              backgroundImage: `url("/main3.png")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
      </div>

      <div className="absolute inset-0 bg-black/10 z-10 flex justify-center items-center">
        <div className="absolute z-20 w-full flex items-center justify-center text-center px-6 pb-28">
          <div className="max-w-4xl">
            <h1
              className="text-5xl lg:text-7xl text-[#0A0908]/70 font-bold leading-tight"
            >
              Bringing Back the Shine <br />
              to Your Spaces
            </h1>


            <p className="mt-6 text-lg md:text-xl text-[#0A0908]/70">
              Professional Marble Polishing, Facade, Carpet & <br />
              Sofa Cleaning Services
            </p>
          </div>
        </div>
      </div>




      <div
        className="flex items-center gap-6 pt-4 animate-fade-in-up"
        style={{
          animationDuration: '0.6s',
          animationDelay: '0.2s',
          opacity: 0,
          animationFillMode: 'forwards'
        }}
      >
      </div>
    </div>
  )
}

export default LandingPage
