import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#home' },
    { name: 'Sobre Mí', href: '#about' },
    { name: 'Tratamientos', href: '#services' },
    { name: 'Contacto', href: '#booking' },
  ];

  return (
    // CAMBIO CLAVE: "left-1/2 -translate-x-1/2" centra el elemento fixed.
    // "top-4" o "top-6" le da aire arriba.
    // "rounded-full" hace la cápsula.
    <nav className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[90%] md:max-w-4xl rounded-full ${
      scrolled 
        ? 'top-4 bg-white/80 backdrop-blur-md shadow-lg shadow-black/5 border border-white/50 py-3' 
        : 'top-6 bg-white/40 backdrop-blur-sm border border-transparent py-4'
    }`}>
      <div className="px-6 flex justify-between items-center">
        
        {/* LOGO COMPACTO */}
        <a href="#" className="flex flex-col leading-none group">
          <span className="text-lg font-bold text-slate-800 tracking-tight group-hover:text-primary transition-colors">Dra. Marco</span>
        </a>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center space-x-1 bg-slate-100/50 p-1 rounded-full border border-white/50">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="px-5 py-2 text-xs font-semibold text-slate-600 rounded-full hover:bg-white hover:text-primary hover:shadow-sm transition-all duration-300"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* CTA BUTTON (Icono solo en móvil, texto en desktop) */}
        <a 
          href="#booking" 
          className="btn btn-sm btn-primary rounded-full text-white shadow-md hover:shadow-primary/40 border-none font-medium px-5"
        >
          <span className="hidden sm:inline">Reservar</span>
          <Phone size={14} className="sm:hidden" />
        </a>

        {/* MOBILE TOGGLE */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden ml-4 text-slate-600">
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* MOBILE MENU (Colgando de la cápsula) */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-4 flex flex-col gap-2 overflow-hidden animate-in fade-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="block p-3 text-center text-slate-600 font-medium hover:bg-slate-50 rounded-xl transition-colors">
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;