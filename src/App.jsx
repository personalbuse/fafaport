import React from 'react';
import Hero from './components/Hero';
import ProjectSlider from './components/ProjectSlider';
import Process from './components/Process';
import About from './components/About';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-cream min-h-screen text-dark relative overflow-x-hidden">
      <Hero />
      <ProjectSlider />
      <Process />
      <About />
      <Footer />
    </div>
  );
}

export default App;
