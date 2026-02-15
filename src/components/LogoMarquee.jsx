import React from "react";
import "../index.css"
const logos = [
    "/brands/whatsapp.avif",
    "/brands/airtel.avif",
    "/brands/bookmyshow.avif",
    "/brands/ola.avif",
    "/brands/zomato.avif",
    "/brands/blinkit.avif",
];

const LogoMarquee = () => {
    return (
        <div className="w-full overflow-hidden bg-white py-10 border-y border-neutral-200">

            {/* Fade edges (professional look) */}
            <div className="relative">


                <div className="flex animate-marquee gap-16 w-max">
                    {[...logos, ...logos].map((logo, index) => (
                        <div
                            key={index}
                            className="w-40 h-16 flex items-center justify-center shrink-0"
                        >
                            <img
                                src={logo}
                                alt="brand"
                                className="max-h-10 max-w-[120px] object-contain opacity-70 hover:opacity-100 transition duration-300 grayscale hover:grayscale-0"
                            />
                        </div>
                    ))}

                </div>

            </div>
        </div>
    );
};

export default LogoMarquee;
