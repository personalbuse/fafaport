import { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const ProjectModal = ({ project, onClose }) => {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  const handleClose = useCallback(() => {
    const tl = gsap.timeline({
      onComplete: onClose,
    });
    tl.to(contentRef.current, {
      scale: 0.85,
      opacity: 0,
      y: 30,
      duration: 0.25,
      ease: 'power3.in',
    }).to(overlayRef.current, { opacity: 0, duration: 0.2 }, 0);
  }, [onClose]);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(overlayRef.current, { opacity: 0, duration: 0.3 })
      .from(contentRef.current, {
        scale: 0.85,
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: 'back.out(1.7)',
      }, '-=0.15');
  }, { scope: overlayRef });

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [handleClose]);

  if (!project) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-dark/70 backdrop-blur-sm"
      onClick={(e) => { if (e.target === overlayRef.current) handleClose(); }}
    >
      <div
        ref={contentRef}
        className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto bg-cream rounded-2xl shadow-2xl border border-creamDark/50"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-cream/80 backdrop-blur-sm border border-dark/10 flex items-center justify-center text-dark/50 hover:text-dark transition-colors"
          aria-label="Cerrar"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="p-8 md:p-10">
          {project.featured && (
            <span className="inline-block text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-terracotta mb-3">
              ★ Destacado
            </span>
          )}

          <h2 className="text-3xl md:text-4xl font-sans font-medium uppercase tracking-[0.05em] text-dark mb-3">
            {project.title}
          </h2>

          <p className="text-xs font-sans font-medium uppercase tracking-[0.15em] text-dark/40 mb-6">
            {project.category} <span className="mx-2">·</span> {project.area} <span className="mx-2">·</span> {project.year}
          </p>

          <div className="w-full aspect-[4/3] rounded-xl bg-paleGreen flex items-center justify-center mb-6 border border-dark/5">
            <span className="text-xs font-sans font-medium uppercase tracking-[0.1em] text-dark/30">
              Plano arquitectónico
            </span>
          </div>

          <p className="text-sm md:text-base font-sans leading-relaxed text-dark/70 mb-6">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-[10px] font-sans font-medium uppercase tracking-[0.1em] bg-dark/5 text-dark/50 rounded-full border border-dark/5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
