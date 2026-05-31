import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    name: 'SIG',
    items: ['ArcGIS', 'Google Earth Pro'],
  },
  {
    name: 'Diseño',
    items: ['Illustrator', 'Photoshop'],
  },
  {
    name: 'Arquitectura',
    items: ['AutoCAD', 'Revit', 'SketchUp'],
  },
];

const Herramientas = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.from(headingRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
    });

    tl.from(cardsRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power3.out',
    }, '-=0.3');
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="w-full px-6 py-32 md:py-48 bg-cream"
    >
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="flex items-center gap-4 mb-16 md:mb-20">
          <div className="h-px flex-1 bg-dark/20" />
          <h2 className="text-xs md:text-sm font-sans uppercase tracking-[0.3em] text-dark/50 whitespace-nowrap">
            Herramientas y Competencias
          </h2>
          <div className="h-px flex-1 bg-dark/20" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 justify-items-center">
          {categories.map((cat, i) => (
            <div
              key={cat.name}
              ref={(el) => cardsRef.current[i] = el}
              className="w-full max-w-xs"
            >
              <h3 className="text-lg md:text-xl font-sans font-medium uppercase tracking-[0.15em] text-dark mb-6 pb-3 border-b border-dark/10 text-center">
                {cat.name}
              </h3>
              <ul className="space-y-3 text-center">
                {cat.items.map((item) => (
                  <li
                    key={item}
                    className="text-base md:text-lg font-sans text-dark/70 tracking-wide"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Herramientas;
