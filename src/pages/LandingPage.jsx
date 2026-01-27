import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';


const LandingPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const cards = [
    {
      id: 1,
      color: '#000000',
      bgImage: 'https://www.rkmarble.com/wp-content/uploads/2024/08/1920X946_BANNER-copy.jpg'
    },
    {
      id: 2,
      color: '#000000',
      bgImage: 'https://www.rkmarble.com/wp-content/uploads/2024/08/1080x1920_Banner-2.jpg'
    }
  ]

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const goToCard = (index) => {
    setCurrentIndex(index);
  };

  const currentCard = cards[currentIndex];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 4000); // 4 seconds

    return () => clearInterval(interval);
  }, [cards.length]);



  return (
    <div className="min-h-screen relative w-full flex items-end justify-center overflow-hidden">
      {/* BACKGROUND IMAGE TRANSITION */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className="absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out"
            style={{
              backgroundImage: `url(${card.bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: index === currentIndex ? 1 : 0,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-black/40 z-10 flex justify-center items-center">
        <div className="absolute z-20 w-full flex items-center justify-center text-center px-6 pb-28">
          <div className="max-w-4xl">
            <h1
              className="text-5xl lg:text-7xl font-bold leading-tight"
              style={{
                background: 'linear-gradient(90deg, #A7A4A4 0%, #BABABA 47%, #D9D9D9 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Bringing Back the Shine <br />
              to Your Spaces
            </h1>


            <p className="mt-6 text-lg md:text-xl text-gray-300">
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
        {/* Dot Navigation */}
        <div className='flex justify-center items-center mb-10'>
          <div className="flex gap-3">
            {cards.map((card, index) => (
              <button
                key={card.id}
                onClick={() => goToCard(index)}
                className="relative transition-all duration-300 focus:outline-none group"
                aria-label={`Go to card ${index + 1}`}
              >
                <div
                  className="w-5 h-5 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: currentCard.color,
                    opacity: index === currentIndex ? 1 : 0.25,
                    transform: index === currentIndex ? 'scale(1.3)' : 'scale(1)'
                  }}
                />
                {index === currentIndex && (
                  <div
                    className="absolute inset-0 rounded-full animate-ping"
                    style={{
                      backgroundColor: currentCard.color,
                      opacity: 0.4
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage