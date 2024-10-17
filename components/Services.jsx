'use client'

import React, { useEffect } from 'react';

const services = [
  {
    title: "Emergency Plumbing Services",
    description: "Our plumbers are ready to go 24/7 for emergencies - including nights, weekends, and holidays.",
    linkText: "EXPLORE THIS SERVICE",
    icon: "/images/01.png"
  },
  {
    title: "Plumbing and Drains",
    description: "As the largest plumbing and drain service company, we make thousands of repairs every day.",
    linkText: "EXPLORE THIS SERVICE",
    icon: "/images/02.png"
  },
  {
    title: "Water Damage",
    description: "Our teams are equipped with state-of-the-art water extraction and cleanup equipment.",
    linkText: "EXPLORE THIS SERVICE",
    icon: "/images/03.png"
  },
  {
    title: "Water Heaters",
    description: "Trust Roto-Rooter for repair and replacement of gas, electric and tankless water heaters.",
    linkText: "EXPLORE THIS SERVICE",
    icon: "/images/04.png"
  },
];

export default function Services() {

  useEffect(() => {
    const serviceBoxes = document.querySelectorAll('.service-box');

    // Set initial state for all cards (before animation)
    serviceBoxes.forEach((box, index) => {
      box.style.opacity = '0';
      // Alternate between coming from top and bottom
      box.style.transform = index % 2 === 0 ? 'translateY(-100px)' : 'translateY(100px)';
    });

    // Apply staggered animation on page load with delay for each card
    serviceBoxes.forEach((box, index) => {
      setTimeout(() => {
        box.style.opacity = '1';
        box.style.transform = 'translateY(0)';
        box.style.transition = `transform 0.8s ease-out, opacity 0.8s ease-out`;
      }, (index + 1) * 500); // Ensure that the first card gets a delay and applies transition (index + 1)
    });

    // 3D hover effect
    const handleMouseMove = (e, box) => {
      const rect = box.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 5;
      const rotateY = (centerX - x) / 5;

      box.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    };

    const handleMouseLeave = (box) => {
      box.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    };

    serviceBoxes.forEach(box => {
      box.addEventListener('mousemove', (e) => handleMouseMove(e, box));
      box.addEventListener('mouseleave', () => handleMouseLeave(box));
    });

    return () => {
      serviceBoxes.forEach(box => {
        box.removeEventListener('mousemove', handleMouseMove);
        box.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div id="assignment" className="my-12 mx-8">
      <section 
        className="relative py-12 text-center text-white rounded-lg shadow-lg"
        style={{
          background: 'linear-gradient(135deg, #4B5563 50%, #4338CA 50%)'
        }}
      >
        <h2 className="text-3xl font-bold mb-8">OUR SERVICES</h2>
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 space-y-3 sm:space-y-0">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="service-box relative bg-white text-black rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
              style={{ perspective: '1000px' }}  // Add perspective for 3D effect
            >
              {/* Icon Section - Now with hover scale effect */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-2 shadow-md z-10 transition-transform duration-300 hover:scale-110">
                <div className="bg-indigo-600 p-4 rounded-full">
                  <img 
                    src={service.icon} 
                    alt={service.title} 
                    className="h-12 w-12"
                  />
                </div>
              </div>

              {/* Service Details */}
              <div className="service-content bg-white p-6 pt-12 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-center mt-12">{service.title}</h3>
                <p className="text-gray-600 mb-4 text-center">{service.description}</p>
                <a href="#" className="text-indigo-600 font-bold hover:underline block text-center">
                  {service.linkText} &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
