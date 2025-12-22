import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CalendarCheck, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // --- FUNCIÓN PARA SCROLL SUAVE MANUAL ---
  const handleNavClick = (e, targetId) => {
    e.preventDefault(); // Evita el salto brusco
    setIsOpen(false);   // Cierra el menú móvil si está abierto
    
    if (targetId === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.querySelector(targetId);
    if (element) {
      // Ajuste de offset para que la navbar no tape el título (-100px aprox)
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { id: 'hero', name: 'Inicio', href: '#' },
    { id: 'services', name: 'Tratamientos', href: '#services' },
    { id: 'about', name: 'Sobre Mí', href: '#about' },
    { id: 'reviews', name: 'Pacientes', href: '#reviews' },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed z-[60] flex justify-between items-center transition-all duration-500 ease-in-out
          left-0 right-0 mx-auto 
          top-4 md:top-6
          w-[90%] md:w-[95%] md:max-w-5xl 
          rounded-full
          ${scrolled || isOpen 
            ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-purple-900/5 border border-white/50 py-3 px-6' 
            : 'bg-transparent border-transparent py-4 px-6'
          }
        `}
      >
          
        {/* --- LOGO --- */}
        <a 
          href="#" 
          onClick={(e) => handleNavClick(e, '#')}
          className="relative group shrink-0 flex items-center z-[70]"
        >
           <span className={`text-lg md:text-xl font-bold tracking-tight transition-colors duration-300 ${isOpen ? 'text-slate-900' : 'text-slate-900'}`}>
             Dra. Viviana Marco
           </span>
        </a>

        {/* --- DESKTOP MENU --- */}
        <div 
          className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2"
          onMouseLeave={() => setHoveredLink(null)}
        >
          {navLinks.map((link) => (
            <a 
              key={link.id} 
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)} // <--- APLICAMOS SCROLL SUAVE
              onMouseEnter={() => setHoveredLink(link.id)}
              className={`text-sm font-medium transition-all duration-300 ease-out whitespace-nowrap cursor-pointer
                ${link.id === 'reviews' ? 'hidden lg:block' : ''}
                ${hoveredLink === link.id 
                   ? 'text-violet-700 opacity-100 scale-105 blur-0'
                   : (hoveredLink 
                      ? 'text-slate-500 opacity-40 blur-[0.5px] scale-95' 
                      : 'text-slate-600 opacity-100 scale-100 blur-0')
                }
              `}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* --- DERECHA: BOTÓN (Desktop) + HAMBURGUESA (Móvil) --- */}
        <div className="flex items-center gap-3 z-[70]">
          
          {/* BOTÓN RESERVAR - DESKTOP */}
          <motion.a 
            href="#booking" 
            onClick={(e) => handleNavClick(e, '#booking')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:flex relative overflow-hidden rounded-full bg-slate-900 text-white shadow-md group
                       px-6 py-2.5 shrink-0 cursor-pointer border-none" 
          >
            {/* Fondo Gradiente al Hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Shimmer */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10"></div>

            <span className="relative z-20 flex items-center gap-2 text-xs font-bold uppercase tracking-wide whitespace-nowrap">
               <CalendarCheck 
                 size={14} 
                 className="text-purple-200 group-hover:text-white transition-all duration-300" 
               /> 
               <span>Reservar Turno</span>
            </span>
          </motion.a>

          {/* HAMBURGUESA */}
          <motion.button 
            initial={false}
            animate={isOpen ? "open" : "closed"}
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden relative w-10 h-10 rounded-full bg-white/50 border border-white/40 backdrop-blur-md flex items-center justify-center text-slate-800 hover:bg-white transition-colors shadow-sm"
          >
            <MotionConfig transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
              <div className="relative w-5 h-5 flex flex-col justify-center gap-[5px]">
                <motion.span 
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open:   { rotate: 45, y: 7 } 
                  }}
                  className="w-full h-[2px] bg-slate-800 rounded-full origin-center"
                />
                <motion.span 
                  variants={{
                    closed: { opacity: 1, scale: 1 },
                    open:   { opacity: 0, scale: 0 }
                  }}
                  className="w-full h-[2px] bg-slate-800 rounded-full"
                />
                <motion.span 
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open:   { rotate: -45, y: -7 } 
                  }}
                  className="w-full h-[2px] bg-slate-800 rounded-full origin-center"
                />
              </div>
            </MotionConfig>
          </motion.button>

        </div>
      </motion.nav>

      {/* --- MENÚ MÓVIL --- */}
      <MobileMenuPortal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        links={navLinks} 
        handleNavClick={handleNavClick} // Pasamos la función de scroll
      />
    </>
  );
};

// COMPONENTE DEL MENÚ DESPLEGABLE
const MobileMenuPortal = ({ isOpen, onClose, links, handleNavClick }) => {
  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
          animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }} 
          exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} 
          className="fixed inset-0 z-[50] bg-white/95 backdrop-blur-3xl flex flex-col justify-center items-center"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200/30 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-200/20 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="flex flex-col items-center gap-8 w-full max-w-sm px-6 relative z-10">
            {links.map((link, idx) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)} // Scroll Suave en Móvil
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 + (idx * 0.1), duration: 0.5, ease: "easeOut" }}
                className="text-4xl font-bold text-slate-800 tracking-tight hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-primary hover:to-purple-500 transition-all duration-300 text-center"
              >
                {link.name}
              </motion.a>
            ))}

            <motion.div 
               initial={{ width: 0 }} 
               animate={{ width: "100px" }} 
               className="h-[1px] bg-slate-200 my-2" 
            />

            {/* BOTÓN DE RESERVA MÓVIL (MORADO) */}
            <motion.a
              href="#booking"
              onClick={(e) => handleNavClick(e, '#booking')}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              // --- CAMBIO DE COLOR AQUÍ ---
              className="w-full flex items-center justify-between p-6 rounded-[2rem] 
                         bg-violet-600 text-white shadow-xl shadow-violet-600/20 
                         active:scale-[0.98] transition-all duration-300 group"
            >
              <div>
                <span className="block text-[10px] font-bold opacity-80 uppercase tracking-widest mb-1 group-hover:text-purple-200 transition-colors">Agenda Abierta</span>
                <span className="text-xl font-bold">Solicitar Turno</span>
              </div>
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Navbar;