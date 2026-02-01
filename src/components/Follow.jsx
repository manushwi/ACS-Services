import React from 'react'
import { Instagram } from 'lucide-react';

const Follow = () => {
  return (
    <div className="fixed bottom-6 left-6 z-[100] animate-bounce">
      {/* Full button on md+ screens */}
      <div className="hidden md:flex rounded-xl shadow-lg px-5 py-3 bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#515BD4]
        hover:scale-105 transition-transform duration-300 text-[#f7efe5]">
        <a 
          className='flex justify-center items-center gap-4' 
          href="https://www.instagram.com/acs_servicess?utm_source=qr&igsh=MW5janI4bnppMmxyeQ%3D%3D" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Instagram />
          Follow us on Instagram
        </a>
      </div>

      {/* Circular icon button on mobile */}
      <div className="flex md:hidden rounded-full shadow-lg w-14 h-14 bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#515BD4]
        hover:scale-105 transition-transform duration-300 text-[#f7efe5] justify-center items-center">
        <a 
          href="https://www.instagram.com/acs_servicess?utm_source=qr&igsh=MW5janI4bnppMmxyeQ%3D%3D" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Instagram />
        </a>
      </div>
    </div>
  )
}

export default Follow
