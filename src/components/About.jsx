import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const About = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full px-6 py-32 md:py-48 bg-cream flex justify-center items-center">
      <div ref={containerRef} className="max-w-3xl text-center">
        <h2 className="text-sm font-sans uppercase tracking-widest text-dark/50 mb-8">
          Sobre Mí
        </h2>
        <p className="text-3xl md:text-5xl font-serif leading-tight md:leading-snug text-dark">
          Concibo la arquitectura como un equilibrio inquebrantable entre la <span className="italic">precisión técnica</span> y la sensibilidad espacial. Mi objetivo es traducir necesidades humanas en volúmenes orgánicos y luminosos.
        </p>
      </div>
    </section>
  );
};

export default About;
