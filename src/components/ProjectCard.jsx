import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const blueprintRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Fade in the whole card on scroll
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, 
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
          }
        }
      );

      // Morph from blueprint to render as we scroll past the center of the image
      gsap.to(blueprintRef.current, {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        }
      });
      
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={cardRef} className="relative group flex flex-col gap-4 mb-20 w-full">
      <div className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden bg-creamDark cursor-pointer">
        {/* Render Layer */}
        <img 
          src={project.image} 
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        {/* Blueprint Layer */}
        <img 
          ref={blueprintRef}
          src={project.image} 
          alt={`${project.title} Blueprint`}
          className="absolute inset-0 w-full h-full object-cover grayscale invert contrast-150 brightness-110 transition-transform duration-1000 group-hover:scale-105"
        />
      </div>
      
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center px-2">
        <div>
          <h3 className="text-2xl font-serif text-dark">{project.title}</h3>
          <p className="text-sm font-sans text-dark/60 mt-1 uppercase tracking-wider">{project.category}</p>
        </div>
        <span className="text-xs font-sans text-dark/40 font-medium">0{index + 1}</span>
      </div>
    </div>
  );
};

export default ProjectCard;
