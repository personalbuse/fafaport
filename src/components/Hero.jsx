import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import MagneticTitle from './MagneticTitle';
import PalmShadow from './PalmShadow';

const Hero = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 0.9, duration: 1, ease: 'power3.out', delay: 0.2 }
    )
    .fromTo(
      subtitleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    );
  }, []);

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-20">
      {/* Animated Palm Shadow Overlay */}
      <PalmShadow className="absolute top-[-5%] left-[-15%] md:top-[-10%] md:left-[5%] w-[450px] md:w-[700px] h-auto pointer-events-none z-20" />

      <div className="z-10 text-center mb-12 pointer-events-none">
        <div ref={titleRef} style={{ filter: 'url(#noise)' }}>
          <MagneticTitle 
            text="Estefany Ladino" 
            className="justify-center text-5xl md:text-7xl lg:text-8xl font-serif text-dark tracking-tight leading-none mb-4 pointer-events-auto"
            vivid={true} 
          />
        </div>
        <p ref={subtitleRef} className="text-xl md:text-2xl font-sans font-medium tracking-widest uppercase text-dark/60 mt-4">
          Arquitecta
        </p>
      </div>
    </section>
  );
};

export default Hero;
