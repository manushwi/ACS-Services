import React, { useState } from "react";
import { X } from 'lucide-react';

const images = [
  "/srv1.png",
  "/svr2.jpeg",
  "/svr3.jpeg",
  "/svr4.jpeg",
  "/svr5.jpeg",
  "/card2.jpg",
  "/card3.jpg",
  "/card4.jpg",
  "/card5.jpg",
  "/main1.jpg",
  "/main2.jpg",
];

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState(null);

  const prev = () => {
    if (openIndex === null) return;
    setOpenIndex((openIndex + images.length - 1) % images.length);
  };
  const next = () => {
    if (openIndex === null) return;
    setOpenIndex((openIndex + 1) % images.length);
  };

  return (
    <div className="min-h-screen pt-16 bg-[#f7efe5]">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2b1d14]">Gallery</h1>
          <p className="text-[#2b1d14]/70">Explore our work across all services.</p>
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
          {images.map((src, idx) => (
            <button
              key={src + idx}
              onClick={() => setOpenIndex(idx)}
              className="mb-4 block w-full rounded-xl overflow-hidden focus:outline-none"
            >
              <img src={src} alt="" className="w-full h-auto object-cover hover:opacity-90 transition" />
            </button>
          ))}
        </div>
      </div>
      {openIndex !== null && (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center bg-black/80">
          <button
            onClick={() => setOpenIndex(null)}
            className="absolute top-6 right-6 px-4 py-2 rounded-md bg-white text-[#2b1d14] text-sm"
          >
            <X className="w-6 h-6" />
          </button>
          <button
            onClick={prev}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white text-[#2b1d14] text-xl font-bold flex items-center justify-center"
            aria-label="Previous image"
          >
            ‹
          </button>
          <img src={images[openIndex]} alt="" className="max-h-[80vh] max-w-[90vw] rounded-xl shadow-2xl" />
          <button
            onClick={next}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white text-[#2b1d14] text-xl font-bold flex items-center justify-center"
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
