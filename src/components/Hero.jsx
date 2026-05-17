import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import MagneticTitle from './MagneticTitle';
import BlueprintBackground from './BlueprintBackground';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const scrollRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from(titleRef.current, {
      y: 80,
      opacity: 0,
      duration: 1.2,
    })
    .from(subtitleRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
    }, '-=0.4')
    .from(scrollRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.6,
    }, '-=0.3');

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom top',
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.set(titleRef.current, {
          y: progress * 80,
          scale: 1 - progress * 0.05,
        });
        gsap.set(subtitleRef.current, {
          y: progress * 40,
          opacity: 1 - progress,
        });
        gsap.set(scrollRef.current, {
          opacity: 1 - progress * 3,
        });
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-cream"
      aria-label="Portafolio de Estefany Ladino - Arquitecta"
    >
      <div className="absolute inset-0 z-0">
        <BlueprintBackground />
      </div>
      <div className="text-center mb-12 pointer-events-none relative z-10">
        <div ref={titleRef} className="title-animated will-change-transform">
          <MagneticTitle
            text="Estefany Ladino"
            className="justify-center text-[3.51rem] sm:text-[4.225rem] md:text-[5.525rem] lg:text-[7.02rem] xl:text-[8.424rem] font-sans text-dark uppercase tracking-[0.15em] leading-[0.85] mb-4 pointer-events-auto"
            vivid={true}
            persistent={false}
          />
        </div>
        <p ref={subtitleRef} className="text-xl md:text-2.5xl font-sans font-medium tracking-[0.2em] uppercase text-dark/40 mt-6 md:mt-10">
          Arquitecta
        </p>
      </div>

      <div ref={scrollRef} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-dark/30" aria-hidden="true">
          <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-dark/40 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
