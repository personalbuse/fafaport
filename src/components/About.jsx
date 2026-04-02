import React from 'react';

const About = () => {
  return (
    <section className="w-full px-6 py-32 md:py-48 bg-cream flex justify-center items-center">
      <div className="max-w-4xl text-center">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-16 bg-dark/20" />
          <span className="text-sm font-sans uppercase tracking-[0.3em] text-dark/50">
            Sobre Mí
          </span>
          <div className="h-px w-16 bg-dark/20" />
        </div>
        
        <p className="text-3xl md:text-5xl font-serif leading-tight md:leading-snug text-dark">
          Concibo la arquitectura como un equilibrio inquebrantable entre la <span className="italic text-darkGreen">precisión técnica</span> y la sensibilidad espacial. Mi objetivo es traducir necesidades humanas en volúmenes <span className="text-darkGreen">orgánicos y luminosos</span>.
        </p>
        
        <div className="mt-12 flex justify-center gap-2">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className="w-2 h-2 rounded-full bg-dark/20"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
