import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import MagneticTitle from './MagneticTitle';
import PalmShadow from './PalmShadow';

import FloorPlan from './FloorPlan';

const Hero = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Noise animation
      gsap.to('#noise feTurbulence', {
        attr: { baseFrequency: 0.8 },
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'none'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-cream"
    >
      <FloorPlan />
      
      <PalmShadow className="absolute -top-10 -left-10 md:left-[5%] md:top-[-5%] w-[600px] h-[600px] opacity-30 pointer-events-none z-0" />

      <div className="z-10 text-center mb-12 pointer-events-none">
        <div ref={titleRef} style={{ filter: 'url(#noise)' }}>
          <MagneticTitle 
            text="Estefany Ladino" 
            className="justify-center text-7xl md:text-9xl lg:text-[10rem] font-serif text-dark tracking-tighter leading-[0.85] mb-4 pointer-events-auto"
            vivid={true}
            persistent={false}
          />
        </div>
        <p ref={subtitleRef} className="text-xl md:text-3xl font-sans font-medium tracking-widest uppercase text-dark/40 mt-6 md:mt-10">
          Arquitecta
        </p>
      </div>
    </section>
  );
};

export default Hero;
