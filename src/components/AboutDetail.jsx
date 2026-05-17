import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const AboutDetail = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const textRef = useRef(null);

  const skills = [
    { name: 'Modelado 3D', icon: '◈' },
    { name: 'Planos Técnicos', icon: '◫' },
    { name: 'Visualización', icon: '◉' },
    { name: 'Diseño de Espacios', icon: '◇' },
  ];

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 60%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.from(textRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    });

    tl.from(cardsRef.current, {
      y: 40,
      opacity: 0,
      scale: 0.9,
      duration: 0.5,
      stagger: 0.12,
      ease: 'back.out(1.7)',
    }, '-=0.3');
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="w-full px-6 py-24 md:py-32 bg-cream text-dark overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-px w-16 bg-dark/20" />
          <span className="text-sm font-sans uppercase tracking-[0.3em] text-dark/50">
            Quien soy
          </span>
          <div className="h-px w-16 bg-dark/20" />
        </div>
        
        <div ref={textRef}>
          <p className="text-lg md:text-2xl font-sans font-medium leading-relaxed md:leading-relaxed text-dark">
            Soy una persona <span className="text-terracotta">animada</span>, <span className="text-terracotta">creativa</span>, <span className="text-terracotta">activa</span> y con la actitud para desarrollar cualquier proyecto o necesidad en cuanto a <span className="text-terracotta">diseño arquitectónico</span>.
          </p>
          
          <p className="text-lg md:text-2xl font-sans font-medium leading-relaxed md:leading-relaxed text-dark mt-4">
            Soy estudiante de la Universidad de Pamplona cursando 9no semestre, donde he aprendido <span className="text-terracotta">modelado 3D</span>, dibujo y <span className="text-terracotta">gestión de planos en AutoCAD</span>, <span className="text-terracotta">representaciones gráficas</span> y el manejo de una gran cantidad de <span className="text-terracotta">herramientas digitales</span> para el uso correcto y eficiente de la arquitectura.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {skills.map((skill, idx) => (
              <div
                key={idx}
                ref={(el) => cardsRef.current[idx] = el}
                className="flex flex-col items-center text-center p-6 bg-cream/50 rounded-xl border border-dark/5 hover:bg-cream hover:border-terracotta/20 hover:shadow-md transition-all duration-300"
              >
                <span className="text-3xl text-terracotta mb-3">{skill.icon}</span>
                <span className="text-sm font-sans text-dark/70">{skill.name}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className="w-2 h-2 rounded-full bg-terracotta/30"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutDetail;
