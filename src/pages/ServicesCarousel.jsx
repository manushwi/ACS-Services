import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ServicesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const cards = [
    {
      id: 1,
      title: 'Marble Diamond Polishing',
      description: 'Experience flawless marble diamond polishing that restores natural shine and elegance. Using advanced techniques, we enhance durability and create a smooth, mirror-like finish that elevates your space with lasting luxury.',
      image: '/srv1.png',
      color: '#FF6B6B',
      bgColor: '#FFE5E5',
      accentColor: '#FF4444',
      bgImage: '/bg1.jpeg'
    },
    {
      id: 2,
      title: 'Facade Cleaning',
      description: 'Restore the brilliance of your building with our professional facade cleaning. We remove dirt, stains, and pollutants to enhance appearance, protect surfaces, and maintain a polished, long-lasting exterior.',
      image: '/svr2.jpeg',
      color: '#4ECDC4',
      bgColor: '#E0F7F5',
      accentColor: '#2AB5AC',
      bgImage: '/bg2.jpeg'
    },
    {
      id: 3,
      title: 'Wooden Floor Polishing',
      description: 'Revive the natural beauty of your wooden floors with our expert cleaning services. We gently remove dirt and wear while enhancing shine, durability, and warmth for a refined, long-lasting finish.',
      image: '/svr3.jpeg',
      color: '#95E1D3',
      bgColor: '#E8F9F6',
      accentColor: '#6FD4C3',
      bgImage: '/bg3.jpeg'
    },
    {
      id: 4,
      title: 'Sofa Cleaning',
      description: 'Refresh your sofa with our professional cleaning service that removes deep-seated dirt, stains, and allergens. We restore softness, comfort, and freshness, giving your upholstery a clean, elegant, and inviting feel.',
      image: '/svr4.jpeg',
      color: '#F38181',
      bgColor: '#FFEFEF',
      accentColor: '#EF5A5A',
      bgImage: '/bg4.jpeg'

    },
    {
      id: 5,
      title: 'Carpet Cleaning',
      description: 'Restore freshness and elegance to your carpets with our professional cleaning service. We eliminate deep dirt, stains, and allergens, reviving texture, color, and comfort for a clean, refined finish.',
      image: '/svr5.jpeg',
      color: '#A8E6CF',
      bgColor: '#F0FCF7',
      accentColor: '#7FD9B3',
      bgImage: '/bg5.jpeg'

    }
  ];

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const goToCard = (index) => {
    setCurrentIndex(index);
  };

  const getCardPosition = (index) => {
    const diff = (index - currentIndex + cards.length) % cards.length;

    if (diff === 0) {
      // Active card - front and center
      return {
        transform: 'translateX(0) translateY(0) scale(1) rotateY(0deg)',
        opacity: 1,
        zIndex: 50,
        pointerEvents: 'auto'
      };
    } else if (diff === 1) {
      // Second card
      return {
        transform: 'translateX(20px) translateY(-40px) scale(0.92) rotateY(-3deg)',
        opacity: 0.8,
        zIndex: 40,
        pointerEvents: 'auto'
      };
    } else if (diff === 2) {
      // Third card
      return {
        transform: 'translateX(50px) translateY(-80px) scale(0.84) rotateY(-6deg)',
        opacity: 0.6,
        zIndex: 30,
        pointerEvents: 'auto'
      };
    } else {
      // Hidden cards
      return {
        transform: 'translateX(-120px) translateY(-120px) scale(0.76) rotateY(-9deg)',
        opacity: 0,
        zIndex: 20,
        pointerEvents: 'none'
      };
    }
  };

  const currentCard = cards[currentIndex];

  return (
    <div id='services' className="min-h-screen relative overflow-hidden">
      {/* BACKGROUND IMAGE TRANSITION */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{
              backgroundImage: `url(${card.bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: index === currentIndex ? 1 : 0,
            }}
          />
        ))}
        {/* <div
          className="w-full h-full absolute z-10 transition-all duration-300"
          style={{
            backgroundColor: currentCard.color,
            opacity: "0.4"
          }}
        /> */}

      </div>



      <div className="relative z-10 container mx-auto px-6 lg:px-16 py-12 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 w-full items-center">

          {/* LEFT SIDE - Stacked Cards with Images */}
          <div className="relative h-[400px] lg:h-[500px] flex items-center justify-center lg:justify-end order-2 lg:order-1">
            <div className="relative w-full max-w-[450px] h-[320px] lg:h-[380px] perspective-1000">
              {cards.map((card, index) => {
                const position = getCardPosition(index);
                return (
                  <div
                    key={card.id}
                    className="absolute  right-5 lg:right-12 -translate-y-1/2 w-[85%] lg:w-[520px] h-full cursor-pointer transition-all duration-500 ease-out preserve-3d"
                    style={{
                      ...position,
                      transformOrigin: 'center right'
                    }}
                    onClick={() => goToCard(index)}
                  >
                    <div
                      className="w-full h-full rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 relative overflow-hidden group">
                      {/* Card Image */}
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover"
                      />

                      {/* Card Number Badge */}
                      <div
                        className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
                        style={{ backgroundColor: card.color }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </div>

                      {/* Bottom Title on Card */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                        <h3 className="text-white text-2xl font-bold">
                          {card.title}
                        </h3>
                      </div>

                      {/* Hover Border Effect */}
                      <div
                        className="absolute inset-0 border-4 border-transparent group-hover:border-white/30 rounded-2xl transition-all duration-300"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT SIDE - Content */}
          <div className="space-y-8 order-1 lg:order-2">
            {/* Title with fade transition */}
            <div className="overflow-hidden">
              <h1
                key={`title-${currentIndex}`}
                className="text-5xl lg:text-7xl font-bold text-gray-900 animate-fade-in-up"
                style={{
                  animationDuration: '0.6s',
                  lineHeight: '1.1'
                }}
              >
                {currentCard.title}
              </h1>
            </div>

            {/* Description with fade transition */}
            <div className="overflow-hidden">
              <p
                key={`desc-${currentIndex}`}
                className="text-xl lg:text-2xl text-gray-700 leading-relaxed animate-fade-in-up"
                style={{
                  animationDuration: '0.6s',
                  animationDelay: '0.1s',
                  opacity: 0,
                  animationFillMode: 'forwards'
                }}
              >
                {currentCard.description}
              </p>
            </div>

            {/* Navigation Controls */}
            <div
              className="flex items-center gap-6 pt-4 animate-fade-in-up"
              style={{
                animationDuration: '0.6s',
                animationDelay: '0.2s',
                opacity: 0,
                animationFillMode: 'forwards'
              }}
            >
              {/* Previous Button */}
              <button
                onClick={prevCard}
                className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                style={{ backgroundColor: currentCard.color }}
                aria-label="Previous card"
              >
                <ChevronLeft className="w-6 h-6 text-white" strokeWidth={3} />
              </button>

              {/* Dot Navigation */}
              <div className="flex gap-3">
                {cards.map((card, index) => (
                  <button
                    key={card.id}
                    onClick={() => goToCard(index)}
                    className="relative transition-all duration-300 focus:outline-none group"
                    aria-label={`Go to card ${index + 1}`}
                  >
                    <div
                      className="w-3 h-3 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: currentCard.color,
                        opacity: index === currentIndex ? 1 : 0.5,
                        transform: index === currentIndex ? 'scale(1.3)' : 'scale(1)'
                      }}
                    />
                    {index === currentIndex && (
                      <div
                        className="absolute inset-0 rounded-full animate-ping"
                        style={{
                          backgroundColor: currentCard.color,
                          opacity: 0.3
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={nextCard}
                className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                style={{ backgroundColor: currentCard.color }}
                aria-label="Next card"
              >
                <ChevronRight className="w-6 h-6 text-white" strokeWidth={3} />
              </button>
            </div>

            {/* Card counter */}
            <div className="text-sm text-gray-500 font-medium">
              <span style={{ color: currentCard.accentColor }} className="font-bold">
                {String(currentIndex + 1).padStart(2, '0')}
              </span>
              {' / '}
              <span>{String(cards.length).padStart(2, '0')}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Add keyframe animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation-name: fade-in-up;
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        .preserve-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
}