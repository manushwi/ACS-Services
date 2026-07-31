import React, { useState } from "react";
import { X } from 'lucide-react';

const media = [
  { src: "/srv1.png", type: "image" },
  { src: "/svr2.jpeg", type: "image" },
  { src: "/gallery/3.jpeg", type: "image" },
  { src: "/gallery/4.jpeg", type: "image" },
  { src: "/gallery/5.jpeg", type: "image" },
  { src: "/gallery/6.jpeg", type: "image" },
  { src: "/gallery/7.jpeg", type: "image" },
  { src: "/svr3.jpeg", type: "image" },
  { src: "/svr4.jpeg", type: "image" },
  { src: "/svr5.jpeg", type: "image" },
  { src: "/card2.jpg", type: "image" },
  { src: "/gallery/1.mp4", type: "video" },
  { src: "/gallery/2.mp4", type: "video" },
  { src: "/card3.jpg", type: "image" },
  { src: "/card4.jpg", type: "image" },
  { src: "/gallery/3.mp4", type: "video" },
  { src: "/card5.jpg", type: "image" },
  { src: "/main1.jpg", type: "image" },
  { src: "/main2.jpg", type: "image" },
  { src: "/gallery/1.jpeg", type: "image" },
  { src: "/gallery/2.jpeg", type: "image" },
  { src: "/gallery/8.jpeg", type: "image" },
  { src: "/gallery/4.mp4", type: "video" },
  { src: "/gallery/5.mp4", type: "video" },
  { src: "/gallery/6.mp4", type: "video" },
  { src: "/gallery/7.mp4", type: "video" },
  { src: "/gallery/9.jpeg", type: "image" },
  { src: "/gallery/10.jpeg", type: "image" },
  { src: "/gallery/11.jpeg", type: "image" },
  { src: "/gallery/12.jpeg", type: "image" },
  { src: "/gallery/13.jpeg", type: "image" },
];

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState(null);

  const prev = () => {
    if (openIndex === null) return;
    setOpenIndex((openIndex + media.length - 1) % media.length);
  };
  const next = () => {
    if (openIndex === null) return;
    setOpenIndex((openIndex + 1) % media.length);
  };

  return (
    <div className="min-h-screen pt-16 bg-[#f7efe5]">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2b1d14]">Gallery</h1>
          <p className="text-[#2b1d14]/70">Explore our work across all services.</p>
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
          {media.map((item, idx) => (
            <button
              key={item.src + idx}
              onClick={() => setOpenIndex(idx)}
              className="mb-4 block w-full rounded-xl overflow-hidden focus:outline-none relative"
            >
              {item.type === "image" ? (
                <img 
                  src={item.src} 
                  alt="" 
                  className="w-full h-auto object-cover hover:opacity-90 transition" 
                  loading="lazy" 
                />
              ) : (
                <video 
                  src={item.src} 
                  className="w-full h-auto object-cover hover:opacity-90 transition"
                  muted
                  playsInline
                />
              )}
              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center">
                    <div className="w-0 h-0 border-l-8 border-l-[#2b1d14] border-y-6 border-y-transparent ml-1"></div>
                  </div>
                </div>
              )}
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
            aria-label="Previous media"
          >
            ‹
          </button>
          {media[openIndex].type === "image" ? (
            <img 
              src={media[openIndex].src} 
              alt="" 
              className="max-h-[80vh] max-w-[90vw] rounded-xl shadow-2xl" 
            />
          ) : (
            <video 
              src={media[openIndex].src} 
              controls 
              autoPlay
              className="max-h-[80vh] max-w-[90vw] rounded-xl shadow-2xl"
            />
          )}
          <button
            onClick={next}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white text-[#2b1d14] text-xl font-bold flex items-center justify-center"
            aria-label="Next media"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}