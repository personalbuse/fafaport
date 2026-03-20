import React from 'react';
import Hero from './components/Hero';
import ProjectSlider from './components/ProjectSlider';
import StaticProjects from './components/StaticProjects';
import Process from './components/Process';
import About from './components/About';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-cream min-h-screen text-dark relative overflow-x-hidden">
      {/* Subtle Eco-Architecture / Leaves Background Watermark */}
      <div 
        className="fixed inset-0 pointer-events-none z-[0] opacity-15" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1533374465355-1481b089c968?auto=format&fit=crop&w=2000&q=80')", 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          backgroundAttachment: 'fixed'
        }} 
      />
      {/* Global SVG Filters */}
      <svg width="0" height="0" className="hidden">
        <defs>
          <filter id="noise">
            <feTurbulence baseFrequency="0.3" xresult="colorNoise" />
            <feColorMatrix in="colorNoise" type="matrix" values=".35 .35 .35 0 0 .35 .35 .35 0 0 .35 .35 .35 0 0 0 0 0 1 0" />
            <feComposite operator="in" in2="SourceGraphic" result="monoNoise" />
            <feBlend in="SourceGraphic" in2="monoNoise" mode="multiply" />
          </filter>
        </defs>
      </svg>

      <div className="relative z-10">
        <Hero />
        <ProjectSlider />
        <StaticProjects />
        <Process />
        <About />
        <Footer />
      </div>
    </div>
  );
}

export default App;
