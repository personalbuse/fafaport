import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const lineRefs = useRef([]);
  const dividerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.from(dividerRef.current, {
      scaleX: 0,
      transformOrigin: 'center',
      duration: 0.5,
      ease: 'power2.inOut',
    });

    tl.from(lineRefs.current, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power3.out',
    }, '-=0.2');
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="w-full px-6 py-32 md:py-48 bg-cream flex justify-center items-center">
      <div className="max-w-4xl text-center">
        <div ref={dividerRef} className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-16 bg-dark/20 origin-center" />
          <span className="text-sm font-sans uppercase tracking-[0.3em] text-dark/50">
            Mis ideas
          </span>
          <div className="h-px w-16 bg-dark/20" />
        </div>

        <div ref={textRef}>
          <p ref={(el) => lineRefs.current[0] = el} className="text-xl md:text-3xl font-sans font-medium leading-relaxed md:leading-relaxed text-dark">
            Concibo la arquitectura como un equilibrio inquebrantable entre la <span className="italic text-terracotta">precisión técnica</span> y la sensibilidad espacial.
          </p>
          <p ref={(el) => lineRefs.current[1] = el} className="text-xl md:text-3xl font-sans font-medium leading-relaxed md:leading-relaxed text-dark mt-4">
            Mi objetivo es traducir necesidades humanas en volúmenes <span className="text-terracotta">orgánicos y luminosos</span>.
          </p>
        </div>
        
        <div ref={(el) => lineRefs.current[2] = el} className="mt-12 flex justify-center gap-2">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className="w-2 h-2 rounded-full bg-terracotta/30"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
