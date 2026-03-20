import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  { step: '01', title: 'Idea', text: 'Concepto inicial, bocetos y exploración espacial.' },
  { step: '02', title: 'Plano', text: 'Desarrollo técnico riguroso, precisión y materialidad.' },
  { step: '03', title: 'Construcción', text: 'Supervisión en obra y control de calidad estructural.' },
  { step: '04', title: 'Resultado', text: 'El habitar materializado, funcionalidad y estética.' },
];

const Process = () => {
  const processRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray('.process-step');
      
      gsap.fromTo(elements, 
        { opacity: 0, y: 30 },
        {
          opacity: 1, 
          y: 0,
          stagger: 0.2,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: processRef.current,
            start: 'top 75%',
          }
        }
      );
    }, processRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={processRef} className="w-full px-6 py-24 bg-paleGreen text-dark">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif mb-16 md:mb-20 text-center md:text-left">
          Proceso de Diseño
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {processSteps.map((item, idx) => (
            <div key={idx} className="process-step flex flex-col items-center md:items-start text-center md:text-left">
              <span className="text-xl font-serif text-dark/30 mb-4 block border-b border-dark/20 w-full pb-2 md:w-auto md:border-none">
                {item.step}
              </span>
              <h4 className="text-2xl font-serif mb-3">{item.title}</h4>
              <p className="text-dark/70 font-sans leading-relaxed text-sm md:text-base max-w-xs">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
