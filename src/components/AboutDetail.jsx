import React from 'react';

const AboutDetail = () => {
  const skills = [
    { name: 'Modelado 3D', icon: '◈' },
    { name: 'Planos Técnicos', icon: '◫' },
    { name: 'Visualización', icon: '◉' },
    { name: 'Diseño de Espacios', icon: '◇' },
  ];

  return (
    <section className="w-full px-6 py-24 md:py-32 bg-paleGreen text-dark">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-px w-16 bg-dark/20" />
          <span className="text-sm font-sans uppercase tracking-[0.3em] text-dark/50">
            Sobre Mí
          </span>
          <div className="h-px w-16 bg-dark/20" />
        </div>
        
        <div className="space-y-8">
          <p className="text-lg md:text-xl font-sans leading-relaxed text-dark/80">
            Soy una estudiante de arquitectura de 9no semestre en la Universidad de Pamplona, soy creativa, activa y dispuesta a conversar para desarrollar cualquier proyecto arquitectónico.
          </p>
          
          <p className="text-lg md:text-xl font-sans leading-relaxed text-dark/80">
            Sé modelar en 3D, gestionar planos técnicos y representaciones gráficas de alto impacto. Tengo experiencia en el manejo de herramientas digitales para la visualización arquitectónica y me apasiona transformar conceptos abstractos en espacios funcionales que respondan a las necesidades del entorno.
          </p>

          <div className="pt-8">
            <h3 className="text-sm font-sans uppercase tracking-[0.2em] text-dark/40 mb-6">
              Habilidades
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {skills.map((skill, idx) => (
                <div 
                  key={idx} 
                  className="flex flex-col items-center text-center p-4 bg-cream/50 rounded-lg border border-dark/5"
                >
                  <span className="text-2xl text-darkGreen mb-2">{skill.icon}</span>
                  <span className="text-sm font-sans text-dark/70">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutDetail;