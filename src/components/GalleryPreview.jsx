import React from "react";
import { useNavigate } from "react-router-dom";

const featuredMedia = [
    { src: "/gallery/1.jpeg", type: "image", label: "Brescia Aurora" },
    { src: "/gallery/1.mp4", type: "video", label: "Fireplace Lemurian" },
    { src: "/gallery/4.jpeg", type: "image", label: "Valentine" },
    { src: "/gallery/3.jpeg", type: "image", label: "Bianco Oro" },
];

export default function GalleryPreview() {
    const navigate = useNavigate();

    return (
        <div className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header with decorative corners */}
                <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 border-t-2 border-l-2 border-red-600" />
          <h2 className="text-4xl font-bold tracking-wide">Gallery</h2>
        </div>
                {/* Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {featuredMedia.map((item, idx) => (
                        <div
                            key={idx}
                            className="relative rounded-3xl overflow-hidden shadow-lg aspect-[3/4] group cursor-pointer"
                            onClick={() => navigate("/gallery")}
                        >
                            {item.type === "image" ? (
                                <img
                                    src={item.src}
                                    alt={item.label}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            ) : (
                                <video
                                    src={item.src}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    muted
                                    playsInline
                                    loop
                                />
                            )}

                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                            {item.type === "video" && (
                                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                                    <div className="w-0 h-0 border-l-[10px] border-l-red-600 border-y-[6px] border-y-transparent ml-1"></div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Show More Button */}
                <div className="flex justify-center">
                    <button
                        onClick={() => navigate("/gallery")}
                        className="bg-[#C6AC8F] hover:bg-[#d4bb9e] text-black font-semibold px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                    >
                        Show More Photos
                    </button>
                </div>
            </div>
        </div>
    );
}