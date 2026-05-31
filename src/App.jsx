import { useEffect } from 'react';
import Hero from './components/Hero';
import QuienSoy from './components/QuienSoy';
import Herramientas from './components/Herramientas';
import Proyectos from './components/Proyectos';
import Footer from './components/Footer';
import DownloadPdf from './components/DownloadPdf';
import useLenis from './hooks/useLenis';
import generateTile from './utils/generateTile';

function App() {
  useLenis();

  useEffect(() => {
    generateTile('/background.png').then((dataUrl) => {
      document.getElementById('root')?.style.setProperty('--bg-pattern', `url(${dataUrl})`);
    });
  }, []);

  return (
    <div className="bg-cream min-h-screen text-dark relative overflow-x-hidden">
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
        <QuienSoy />
        <Herramientas />
        <Proyectos />
        <Footer />
        <DownloadPdf />
      </div>
    </div>
  );
}

export default App;
