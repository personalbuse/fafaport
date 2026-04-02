import React, { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './ProjectSlider.css';

const PROJECTS = [
  {
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
    title: "Casa Residencial",
    description: "Diseño residencial moderno con materiales naturales y iluminación estratégica que integra el espacio interior con el exterior.",
  },
  {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    title: "Refugio de Montaña",
    description: "Espacio de descanso integrado con el entorno natural, aprovechando las vistas panorámicas y los materiales del lugar.",
  },
  {
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80",
    title: "Estudio de Arquitectura",
    description: "Oficina diseñada para optimizar la creatividad y colaboración del equipo, con espacios flexibles y luminosos.",
  },
  {
    image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1200&q=80",
    title: "Galería de Arte",
    description: "Espacio expositivo con iluminación controlada y flexibilidad espacial para diferentes tipos de exhibiciones.",
  },
  {
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1200&q=80",
    title: "Jardín Botánico",
    description: "Integración de vegetación nativa en áreas urbanas, creando espacios sostenibles que mejoran la calidad de vida.",
  },
  {
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&q=80",
    title: "Villa Costera",
    description: "Residencia con vistas al mar y diseño que maximiza la circulación de brisas naturales y la luz solar.",
  },
];

const ProjectSlider = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const items = slider.querySelectorAll('.item');
    items.forEach((item, index) => {
      const projectIndex = index % PROJECTS.length;
      item.style.backgroundImage = `url(${PROJECTS[projectIndex].image})`;
      
      const content = item.querySelector('.content');
      if (content) {
        const title = content.querySelector('.title');
        const desc = content.querySelector('.description');
        if (title) title.textContent = PROJECTS[projectIndex].title;
        if (desc) desc.textContent = PROJECTS[projectIndex].description;
      }
    });
  }, []);

  const handleNav = (direction) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const items = slider.querySelectorAll('.item');
    const firstItem = items[0];
    const lastItem = items[items.length - 1];

    if (direction === 'next') {
      slider.appendChild(firstItem);
    } else {
      slider.prepend(lastItem);
    }

    updateContent();
  };

  const updateContent = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const items = slider.querySelectorAll('.item');
    items.forEach((item, index) => {
      const content = item.querySelector('.content');
      if (content) {
        const title = content.querySelector('.title');
        const desc = content.querySelector('.description');
        
        const projectIndex = index % PROJECTS.length;
        if (title) title.textContent = PROJECTS[projectIndex].title;
        if (desc) desc.textContent = PROJECTS[projectIndex].description;
      }
    });
  };

  const nextSlide = () => handleNav('next');
  const prevSlide = () => handleNav('prev');

  return (
    <div className="projects-section">
      <div className="projects-header">
        <h2 className="projects-title">Mis Proyectos</h2>
        <p className="projects-subtitle">Obras que definen espacios y experiencias</p>
      </div>
      <main className="slider-main">
        <ul className="slider" ref={sliderRef}>
          {PROJECTS.map((project, index) => (
            <li 
              key={index} 
              className="item"
              style={{ backgroundImage: `url(${project.image})` }}
            >
              <div className="content">
                <h2 className="title">{project.title}</h2>
                <p className="description">{project.description}</p>
              </div>
            </li>
          ))}
        </ul>

        <nav className="nav">
          <button className="btn prev" onClick={prevSlide} aria-label="Anterior">
            <ChevronLeft size={24} />
          </button>
          <button className="btn next" onClick={nextSlide} aria-label="Siguiente">
            <ChevronRight size={24} />
          </button>
        </nav>
      </main>
    </div>
  );
};

export default ProjectSlider;