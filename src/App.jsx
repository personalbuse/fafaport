import React from 'react';
import Hero from './components/Hero';
import ProjectSlider from './components/ProjectSlider';
import Process from './components/Process';
import About from './components/About';
import Footer from './components/Footer';
import useLenis from './hooks/useLenis';

function App() {
  useLenis();
  return (
    <div className="bg-cream min-h-screen text-dark relative overflow-x-hidden">
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
        <Process />
        <About />
        <Footer />
      </div>
    </div>
  );
}

export default App;
