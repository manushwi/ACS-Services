import React, { useState, useEffect } from 'react';
import '../pages/PreloadAnimation.css';

function Preloader({ onComplete }) {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Animation completes after 4 seconds (2s rotate + 2s scale)
    const timer = setTimeout(() => {
      setIsAnimating(false);
      if (onComplete) {
        onComplete();
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isAnimating) return null;

  return (
    <div className="preload-container">
      {/* Animated background */}
      <svg viewBox="0 0 900 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <mask id="viMask">
            <rect width="100%" height="100%" fill="none" />
            <g className="vi-mask-group">
              <text
                x="50%"
                y="50%"
                fontSize="150"
                textAnchor="middle"
                fill="white"
                dominantBaseline="middle"
                fontFamily="Arial Black"
              >
                ACS
              </text>
            </g>
          </mask>
        </defs>
        <image
          href="./main3.png"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          mask="url(#viMask)"
        />
      </svg>

      {/* Fixed overlay content */}
      <div className="overlay-content">
        {/* Logo at top */}
        <div className="logo-section">
          
        </div>

        {/* Large ACS text in center */}
        <div className="center-text h-full w-screen">
          
        </div>

        {/* Full form at bottom */}
        <div className="fullform-section">
          <p className="company-fullform">AVTAAR CLEANING SOLUTIONS</p>
        </div>
      </div>
    </div>
  );
}
export default Preloader;