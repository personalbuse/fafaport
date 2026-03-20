import React from 'react';
import ProjectCard from './ProjectCard';

const dummyProjects = [
  {
    id: 1,
    title: 'Casa Llum',
    category: 'Residencial',
    image: 'https://images.unsplash.com/photo-1613490908578-87b415e98547?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    title: 'Pabellón Oculto',
    category: 'Cultural',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 3,
    title: 'Refugio del Valle',
    category: 'Hospitalidad',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 4,
    title: 'Estudio Botánico',
    category: 'Comercial',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  }
];

const ProjectsGrid = () => {
  return (
    <section className="w-full px-6 py-24 md:py-32 bg-cream">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <div className="w-full mb-16 md:mb-24 flex items-end justify-between border-b pb-4 border-dark/10">
          <h2 className="text-4xl md:text-5xl font-serif text-dark">Proyectos Seleccionados</h2>
          <span className="text-sm font-sans uppercase tracking-widest text-dark/50 hidden md:block">
            2021 — {new Date().getFullYear()}
          </span>
        </div>
        
        <div className="w-full relative">
          {dummyProjects.map((proj, index) => (
            <ProjectCard key={proj.id} project={proj} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsGrid;
