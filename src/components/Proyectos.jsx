import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import projects from '../data/projects';
import Carousel3D from './Carousel3D';

gsap.registerPlugin(ScrollTrigger);

const Proyectos = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

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
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="w-full px-6 py-32 md:py-48 bg-cream">
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="flex items-center gap-4 mb-16 md:mb-20">
          <div className="h-px flex-1 bg-dark/20" />
          <h2 className="text-xs md:text-sm font-sans uppercase tracking-[0.3em] text-dark/50 whitespace-nowrap">
            Proyectos
          </h2>
          <div className="h-px flex-1 bg-dark/20" />
        </div>

        {projects.map((project) => (
          <div key={project.id} className="mb-32 last:mb-0">
            <div className="text-center mb-10">
              <h3 className="text-2xl md:text-4xl font-ambule text-dark uppercase tracking-[0.05em] leading-[1.1] mb-6 max-w-4xl mx-auto">
                {project.title}
              </h3>

              <div className="max-w-3xl mx-auto">
                <p className="text-base md:text-lg font-sans leading-relaxed text-dark/70">
                  {project.description}
                </p>
              </div>
            </div>

            {project.images && project.images.length > 0 && (
              <Carousel3D
                images={project.images}
                itemWidth={project.carouselOptions?.itemWidth}
                itemHeight={project.carouselOptions?.itemHeight}
                radius={project.carouselOptions?.radius}
                offsetZ={project.carouselOptions?.offsetZ}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Proyectos;
