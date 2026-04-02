import React from 'react';
import MagneticTitle from './MagneticTitle';

const Hero = () => {
  return (
    <section 
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-cream"
      aria-label="Portafolio de Estefany Ladino - Arquitecta"
    >
      <div className="text-center mb-12 pointer-events-none">
        <div className="title-animated">
          <MagneticTitle 
            text="Estefany Ladino" 
            className="justify-center text-[3.51rem] sm:text-[4.225rem] md:text-[5.525rem] lg:text-[7.02rem] xl:text-[8.424rem] font-sans text-dark uppercase tracking-[0.15em] leading-[0.85] mb-4 pointer-events-auto"
            vivid={true}
            persistent={false}
          />
        </div>
        <p className="text-xl md:text-2.5xl font-sans font-medium tracking-[0.2em] uppercase text-dark/40 mt-6 md:mt-10">
          Arquitecta
        </p>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-dark/30" aria-hidden="true">
          <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-dark/40 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
