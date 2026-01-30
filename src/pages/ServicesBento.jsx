import React from 'react'
import ServiceCard from '../components/ServiceCard';

const services = [
  {
    title: "Marble Diamond Polishing",
    description: "Restore the brilliant shine and luster of your marble surfaces with our professional diamond polishing services.",
    image: '/srv1.png',
    price: '₹150-200/Sq.mt',
  },
  {
    title: "Facade Cleaning",
    description: "Expert cleaning solutions for building exteriors that enhance curb appeal and protect your investment.",
    image: '/card5.jpg',
    price: '₹150-200/Sq.mt',
  },
  {
    title: "Carpet Deep Cleaning",
    description: "Advanced deep cleaning techniques that remove stains, allergens, and revive your carpets.",
    image: '/card3.jpg',
    price: '₹150-200/Sq.mt',
  },
  {
    title: "Sofa & Upholstery Care",
    description: "Professional upholstery cleaning that extends furniture life and maintains pristine appearance.",
    image: '/card4.jpg',
    price: '₹150-200/Sq.mt',
  },
  {
    title: "Wooden Floor Polishing",
    description: "Professional upholstery cleaning that extends furniture life and maintains pristine appearance.",
    image: '/card2.jpg',
    price: '₹150-200/Sq.mt',
  },
];

const ServicesBento = () => {

  return (
    <section
      className="relative py-24 px-4 md:px-8"
      id='pricing'
      style={{
        backgroundImage: `url(/marble.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-marble-light/80" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Our Premium Services
          </h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto">
            Discover our range of professional cleaning and restoration services designed to bring elegance back to your spaces.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* First row - 3 cards */}
          {services.slice(0, 3).map((service, index) => (
            <div
              key={service.title}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <ServiceCard {...service} />
            </div>
          ))}
        </div>

        {/* Second row - Large card + regular card */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-6">
          <div className="lg:col-span-3 animate-slide-up" style={{ animationDelay: "450ms" }}>
            <ServiceCard {...services[3]} />
          </div>


          <div className="lg:col-span-2 animate-slide-up" style={{ animationDelay: "600ms" }}>
            <ServiceCard {...services[4]} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesBento