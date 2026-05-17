import { useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import projects from '../data/projects';
import ProjectModal from './ProjectModal';
import GridBackground from './GridBackground';

gsap.registerPlugin(ScrollTrigger);

const ProjectSlider = () => {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);
  const itemsRef = useRef([]);
  const headerRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const dragState = useRef({ isDragging: false, startX: 0, startY: 0, moved: false });
  const [current, setCurrent] = useState(0);
  const [modalProject, setModalProject] = useState(null);
  const total = projects.length;

  const getTarget = useCallback((i, target) => {
    const pos = ((i - target + total) % total);
    if (pos === 0) return { x: '0%', y: '0%', scale: 1, opacity: 1, zIndex: 10 };
    if (pos === 1 || pos === total - 1) {
      const dir = pos === 1 ? 1 : -1;
      return { x: `${dir * 55}%`, y: '0%', scale: 0.7, opacity: 0.8, zIndex: 5 };
    }
    if (pos === 2 || pos === total - 2) {
      const dir = pos === 2 ? 1 : -1;
      return { x: `${dir * 90}%`, y: '0%', scale: 0.5, opacity: 0.5, zIndex: 3 };
    }
    return { x: `${pos > total / 2 ? -130 : 130}%`, y: '0%', scale: 0.3, opacity: 0, zIndex: 1 };
  }, [total]);

  const goTo = useCallback((index, onComplete) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    const target = (index + total) % total;
    setCurrent(target);

    const items = itemsRef.current.filter(Boolean);
    if (items.length === 0) return;

    gsap.set(items[target], { y: '-80vh', opacity: 0, scale: 0.8 });

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
        if (onComplete) onComplete();
      },
    });

    items.forEach((item, i) => {
      const to = getTarget(i, target);
      if (i === target) {
        tl.to(item, { ...to, duration: 1.0, ease: 'back.out(1.7)' }, 0);
      } else {
        tl.to(item, { ...to, duration: 0.7, ease: 'power3.inOut' }, 0);
      }
    });

    tl.to({}, { duration: 0.2 }, 0);
  }, [total, getTarget]);

  useGSAP(() => {
    const items = itemsRef.current.filter(Boolean);
    if (items.length === 0) return;

    gsap.set(items, { opacity: 0 });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 20%',
      onEnter: () => {
        gsap.fromTo(headerRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
        );
      },
      once: true,
    });

    isAnimatingRef.current = false;
    goTo(0);
  }, { scope: sectionRef, dependencies: [goTo] });

  useGSAP(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') goTo(current + 1);
      if (e.key === 'ArrowLeft') goTo(current - 1);
      if (e.key === 'Escape') setModalProject(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, { dependencies: [current, goTo] });

  const setItemRef = (i) => (el) => {
    itemsRef.current[i] = el;
  };

  const handlePointerDown = (e) => {
    const x = e.clientX ?? e.touches?.[0]?.clientX;
    const y = e.clientY ?? e.touches?.[0]?.clientY;
    if (x == null) return;
    dragState.current = { isDragging: true, startX: x, startY: y, moved: false };
  };

  const handlePointerMove = (e) => {
    if (!dragState.current.isDragging) return;
    const x = e.clientX ?? e.touches?.[0]?.clientX;
    const y = e.clientY ?? e.touches?.[0]?.clientY;
    if (x == null) return;
    const deltaX = x - dragState.current.startX;
    const deltaY = y - dragState.current.startY;
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX < 0) goTo(current + 1);
      else goTo(current - 1);
      dragState.current.isDragging = false;
      dragState.current.moved = true;
    }
  };

  const handlePointerUp = () => {
    dragState.current.isDragging = false;
  };

  const handleCardClick = (i) => {
    if (dragState.current.moved) return;
    if (i === current) {
      setModalProject(projects[i]);
    } else {
      goTo(i, () => setModalProject(projects[i]));
    }
  };

  return (
    <section ref={sectionRef} className="relative w-full py-24 md:py-32 bg-cream overflow-hidden">
      <GridBackground />

      <div ref={headerRef} className="text-center mb-16 px-6 relative z-10">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-12 bg-dark/20" />
          <span className="text-sm font-sans font-medium uppercase tracking-[0.3em] text-dark/50">
            Proyectos
          </span>
          <div className="h-px w-12 bg-dark/20" />
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-medium uppercase tracking-[0.15em] text-dark mb-2">
          Mis Proyectos
        </h2>
        <p className="text-sm font-sans font-medium tracking-[0.2em] uppercase text-dark/40">
          {total} proyectos de arquitectura
        </p>
      </div>

      <div className="relative w-full h-[60vh] min-h-[400px] max-h-[650px] z-10">
        <div
          ref={sliderRef}
          className="relative w-full h-full select-none"
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
        >
          {projects.map((project, i) => (
            <div
              key={project.id}
              ref={setItemRef(i)}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] md:w-[420px] aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-paleGreen shadow-lg will-change-transform"
              onClick={() => handleCardClick(i)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-darkGreen/10 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <div className="bg-cream/90 backdrop-blur-sm rounded-xl p-6 max-w-xs shadow-sm border border-creamDark/30">
                  {project.featured && (
                    <span className="inline-block text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-terracotta mb-2">
                      ★ Destacado
                    </span>
                  )}
                  <h3 className="text-lg md:text-xl font-sans font-medium uppercase tracking-[0.05em] text-dark mb-2">
                    {project.title}
                  </h3>
                  <p className="text-[10px] font-sans font-medium text-dark/50 uppercase tracking-[0.15em] mb-3">
                    {project.category} · {project.area} · {project.year}
                  </p>
                  <p className="text-sm font-sans text-dark/60 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3 justify-center">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 text-[10px] font-sans font-medium uppercase tracking-wider bg-dark/5 text-dark/50 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm font-sans font-medium text-dark/40 tracking-wider">
          {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </div>

        <button
          onClick={() => goTo(current - 1)}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-cream/80 backdrop-blur-sm border border-dark/10 flex items-center justify-center text-dark/60 hover:text-dark hover:border-dark/30 transition-all duration-300"
          aria-label="Anterior"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          onClick={() => goTo(current + 1)}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-cream/80 backdrop-blur-sm border border-dark/10 flex items-center justify-center text-dark/60 hover:text-dark hover:border-dark/30 transition-all duration-300"
          aria-label="Siguiente"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {modalProject && (
        <ProjectModal
          project={modalProject}
          onClose={() => setModalProject(null)}
        />
      )}
    </section>
  );
};

export default ProjectSlider;
