import React from 'react';
import MagneticTitle from './MagneticTitle';

const processSteps = [
  { step: '01', title: 'Idea', text: 'Exploración exhaustiva de conceptos, donde la funcionalidad se encuentra con la poesía espacial a través de bocetos preliminares y maquetas de estudio.' },
  { step: '02', title: 'Plano', text: 'Traducción meticulosa del concepto en documentos técnicos precisos, definiendo cada detalle constructivo, materialidad y sistemas integrados.' },
  { step: '03', title: 'Construcción', text: 'Supervisión rigurosa en el sitio para garantizar que la visión arquitectónica se ejecute con excelencia técnica y respeto por los estándares de calidad.' },
  { step: '04', title: 'Resultado', text: 'La entrega final del espacio habitado, donde la luz y la materia convergen para crear una experiencia sensorial única y funcional para el usuario.' },
];

const Process = () => {
  const processColors = ['marker-yellow', 'marker-blue', 'marker-red', 'marker-green'];

  return (
    <section className="w-full px-6 py-24 bg-paleGreen text-dark">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <div className="mb-20 md:mb-24 flex justify-center w-full">
          <div className="marker-text marker-title text-4xl md:text-5xl lg:text-6xl font-serif font-semibold italic text-dark text-center">
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
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-dark/10 -translate-y-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 w-full mt-4">
            {processSteps.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center md:items-start text-center md:text-left relative z-10">
                <div className="w-12 h-12 rounded-full bg-cream border-2 border-dark/20 flex items-center justify-center mb-6 shadow-lg">
                  <span className="text-lg font-serif font-bold text-dark">{item.step}</span>
                </div>
                <div className={`marker-text text-2xl md:text-3xl font-serif font-semibold text-dark mb-4 ${processColors[idx]}`}>
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
