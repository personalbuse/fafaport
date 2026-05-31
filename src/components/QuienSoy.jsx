import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const QuienSoy = () => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const dividerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.from(leftRef.current, {
      x: -40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    })
    .from(rightRef.current, {
      x: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.6')
    .from(dividerRef.current, {
      scaleX: 0,
      transformOrigin: 'left',
      duration: 0.5,
      ease: 'power2.inOut',
    }, '-=0.4');
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="w-full px-6 py-32 md:py-48 bg-cream"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16">
          <div ref={leftRef} className="md:col-span-2">
            <h2 className="text-2xl md:text-4xl font-sans font-medium uppercase tracking-[0.2em] text-dark">
              Arquitecta
            </h2>
            <p className="mt-4 text-sm md:text-base font-sans text-dark/50 tracking-wider break-all">
              estefany.ladinoest@unipamplona.edu.co
            </p>
          </div>

          <div ref={rightRef} className="md:col-span-3 space-y-6">
            <p className="text-base md:text-lg font-sans leading-relaxed md:leading-relaxed text-dark/80">
              Hola, soy estudiante de arquitectura con interés en el análisis urbano, la planificación territorial, la gestión del patrimonio y la investigación aplicada en los territorios. Mi experiencia académica se ha enfocado en el desarrollo de diagnósticos urbanos, elaboración de cartografía temática, análisis de espacio público y estudio de dinámicas territoriales mediante metodologías de investigación y herramientas de representación espacial.
            </p>
            <div ref={dividerRef} className="h-px w-24 bg-terracotta/50 origin-left mt-8" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuienSoy;
