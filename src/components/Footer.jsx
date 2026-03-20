import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full px-6 py-12 md:py-16 bg-dark text-cream flex flex-col md:flex-row justify-between items-center md:items-end gap-8">
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-serif mb-2">Estefany Ladino</h2>
        <p className="text-sm font-sans text-cream/60 tracking-wider">ARQUITECTA.</p>
      </div>

      <div className="flex gap-6 text-sm font-sans tracking-wide uppercase">
        <a href="mailto:contacto@estefanyladino.com" className="hover:text-paleGreen transition-colors duration-300">
          Email
        </a>
        <a href="#" className="hover:text-paleGreen transition-colors duration-300">
          Instagram
        </a>
        <a href="#" className="hover:text-paleGreen transition-colors duration-300">
          LinkedIn
        </a>
      </div>

      <div className="text-xs text-cream/40 text-center md:text-right font-sans">
        &copy; {new Date().getFullYear()} Estefany Ladino.<br />
        Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
