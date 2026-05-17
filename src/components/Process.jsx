import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import MagneticTitle from './MagneticTitle';

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  { step: '01', title: 'Idea', text: 'Exploración exhaustiva de conceptos, donde la funcionalidad se encuentra con la poesía espacial a través de bocetos preliminares y maquetas de estudio.' },
  { step: '02', title: 'Plano', text: 'Traducción meticulosa del concepto en documentos técnicos precisos, definiendo cada detalle constructivo, materialidad y sistemas integrados.' },
  { step: '03', title: 'Construcción', text: 'Supervisión rigurosa en el sitio para garantizar que la visión arquitectónica se ejecute con excelencia técnica y respeto por los estándares de calidad.' },
  { step: '04', title: 'Resultado', text: 'La entrega final del espacio habitado, donde la luz y la materia convergen para crear una experiencia sensorial única y funcional para el usuario.' },
];

const Process = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const lineRef = useRef(null);
  const processColors = ['marker-yellow', 'marker-blue', 'marker-red', 'marker-green'];

  useGSAP(() => {
    gsap.from(cardsRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 60%',
        toggleActions: 'play none none reverse',
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
    });

    if (lineRef.current) {
      gsap.from(lineRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          toggleActions: 'play none none reverse',
        },
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1,
        ease: 'power2.inOut',
      });
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="w-full px-6 py-24 bg-paleGreen text-dark overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <div className="mb-20 md:mb-24 flex justify-center w-full">
          <div className="marker-text marker-title text-3xl md:text-4xl lg:text-5xl font-sans font-medium uppercase tracking-[0.15em] italic text-dark text-center">
            <MagneticTitle 
              text="PROCESO DE DISEÑO" 
              className="justify-center"
              vivid={false}
              persistent={true}
              colors={['#1B211A', '#628141', '#8BAE66', '#EBD5AB']}
            />
          </div>
        </div>
        
        <div className="relative w-full">
          <div ref={lineRef} className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-dark/10 -translate-y-1/2 origin-left" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 w-full mt-4">
            {processSteps.map((item, idx) => (
              <div
                key={idx}
                ref={(el) => cardsRef.current[idx] = el}
                className="flex flex-col items-center md:items-start text-center md:text-left relative z-10"
              >
                <div className="w-12 h-12 rounded-full bg-cream border-2 border-dark/20 flex items-center justify-center mb-6 shadow-lg">
                  <span className="text-base font-sans font-semibold text-dark">{item.step}</span>
                </div>
                <div className={`marker-text text-xl md:text-2xl font-sans font-medium uppercase tracking-[0.05em] text-dark mb-4 ${processColors[idx]}`}>
                  {item.title}
                </div>
                <p className="text-dark/70 font-sans leading-relaxed text-sm md:text-base max-w-xs mt-1">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
