import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const StaticProjects = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray('.static-reveal');
      
      gsap.fromTo(elements, 
        { opacity: 0, y: 50 },
        {
          opacity: 1, 
          y: 0,
          stagger: 0.15,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full px-6 py-24 md:py-32 bg-cream text-dark">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 static-reveal">
          <div>
            <h2 className="text-4xl md:text-6xl font-serif text-dark mb-4">Obras Selectas</h2>
            <p className="text-sm md:text-base font-sans tracking-wide text-dark/60 max-w-md uppercase">
              Proyectos donde la luz, el material y el entorno convergen en armonía.
            </p>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          
          {/* Main Large Column */}
          <div className="md:col-span-7 flex flex-col gap-6 md:gap-8 static-reveal">
            <div className="group relative w-full h-[60vh] md:h-[70vh] overflow-hidden rounded-sm bg-[#e2e8e0]">
              <img 
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80" 
                alt="Casa Llum Interior"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-60"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <span className="text-xs font-sans tracking-widest text-cream block mb-2 opacity-80 backdrop-blur-sm bg-dark/20 w-fit px-3 py-1 rounded-full border border-cream/20">RESIDENCIAL</span>
                <h3 className="text-3xl font-serif text-cream">Casa Llum</h3>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              <div className="group relative w-full h-64 overflow-hidden rounded-sm bg-[#d4dfd6]">
                <img 
                  src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80" 
                  alt="Textura Botánica"
                  className="w-full h-full object-cover grayscale-[30%] transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="p-8 bg-[#E6EBE0] rounded-sm flex flex-col justify-center border border-paleGreen/50 hover:bg-[#dcebdf] transition-colors duration-500">
                <h4 className="text-xl font-serif text-dark mb-3">Materialidad Viva</h4>
                <p className="text-sm font-sans tracking-wide leading-relaxed text-dark/70">
                  Integración de elementos naturales que envejecen con dignidad, creando espacios que respiran a la par de sus habitantes.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-5 flex flex-col gap-6 md:gap-8 static-reveal">
            
            {/* Philosophy Box */}
            <div className="p-10 md:p-14 bg-paleGreen text-dark rounded-sm flex flex-col justify-center h-auto md:h-1/2 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 22h20L12 2z"/>
                </svg>
              </div>
              <span className="text-sm font-sans tracking-widest uppercase mb-6 opacity-60 relative z-10">Filosofía</span>
              <p className="text-2xl md:text-3xl font-serif leading-snug relative z-10">
                "La arquitectura no trata sobre el espacio, sino sobre el tiempo y cómo la luz revela su paso."
              </p>
            </div>

            <div className="group relative w-full flex-grow min-h-[40vh] md:h-1/2 overflow-hidden rounded-sm bg-[#dcebdf]">
              <img 
                src="https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=800&q=80" 
                alt="Minimalist Architecture"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-dark/20 transition-opacity duration-500 group-hover:opacity-10"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <span className="text-xs font-sans tracking-widest text-dark block mb-2 bg-cream/80 backdrop-blur-md w-fit px-3 py-1 rounded-full uppercase">Comercial</span>
                <h3 className="text-2xl font-serif text-cream drop-shadow-md">Galería Norte</h3>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default StaticProjects;
