import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full px-6 py-16 md:py-20 bg-dark text-cream">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-serif mb-3">Estefany Ladino</h2>
            <p className="text-sm font-sans text-cream/50 tracking-wider uppercase">Arquitecta</p>
          </div>

          <div className="text-center md:text-right text-xs text-cream/40 font-sans">
            <p>&copy; {new Date().getFullYear()} Estefany Ladino.</p>
            <p className="mt-1">Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
