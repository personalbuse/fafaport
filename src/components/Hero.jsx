import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Hero = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    )
    .fromTo(
      subtitleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    )
    .fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' },
      '-=0.8'
    );
  }, []);

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-20">
      <div className="z-10 text-center mb-12 mix-blend-difference text-cream pointer-events-none">
        <h1 ref={titleRef} className="text-5xl md:text-7xl lg:text-8xl font-serif text-cream tracking-tight leading-none mb-4">
          Estefany Ladino
        </h1>
        <p ref={subtitleRef} className="text-xl md:text-2xl font-sans font-light tracking-widest uppercase text-cream/70">
          Arquitecta
        </p>
      </div>

      <div 
        ref={containerRef}
        className="relative w-full max-w-5xl aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-sm"
      >
        {/* Placeholder rendering */}
        <img 
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
          alt="Architectural Render"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* The blueprint superimposed - fading out using CSS filter to look like blueprint */}
        <img 
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
          alt="Technical Blueprint"
          className="absolute inset-0 w-full h-full object-cover grayscale invert contrast-150 brightness-110 sepia-[.2] hue-rotate-[180deg] mix-blend-screen opacity-50"
        />
      </div>
    </section>
  );
};

export default Hero;
