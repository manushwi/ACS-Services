import React from "react";
import "../index.css"
const logos = [
    "/brands/1.jpeg",
    "/brands/2.jpeg",
    "/brands/3.jpeg",
    "/brands/4.jpeg",
    "/brands/5.jpeg",
    "/brands/6.jpeg",
    "/brands/7.jpeg",
    "/brands/8.jpeg",
    "/brands/9.jpeg",
    "/brands/10.jpeg",
    "/brands/11.jpeg",
    "/brands/12.jpeg",
    "/brands/13.jpeg",
    "/brands/14.jpeg",
    "/brands/15.jpeg",
    "/brands/16.jpeg",
    "/brands/17.jpeg",
    "/brands/18.jpeg",
    "/brands/19.jpeg",
    "/brands/20.jpeg",
    "/brands/21.jpeg",
    "/brands/22.jpeg",
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
                                className="max-h-20 max-w-[120px] object-contain  hover:opacity-100 transition duration-300 hover:grayscale-0"
                            />
                        </div>
                    ))}

                </div>

            </div>
        </div>
    );
};

export default LogoMarquee;
