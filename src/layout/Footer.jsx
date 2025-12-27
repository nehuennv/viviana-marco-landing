import React from 'react';
import { Instagram, Facebook, ArrowUp, MapPin, Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // 👈 IMPORTANTE: Importamos Link

const Footer = () => {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 to-indigo-950 text-white pt-24 pb-8 rounded-t-[3rem] md:rounded-t-[5rem] overflow-hidden">

      {/* 1. WATERMARK (FONDO) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 select-none pointer-events-none opacity-[0.02]">
        <h1 className="text-[15vw] font-bold font-heading leading-none tracking-tighter text-white whitespace-nowrap">
          VIVIANA MARCO
        </h1>
      </div>

      {/* 2. LUCES AMBIENTALES */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-10 mb-16">

          {/* TEXTO */}
          <div
            className="max-w-2xl text-center md:text-left md:pl-2"
            data-aos="fade-up"
          >
            <h2 className="text-4xl md:text-6xl font-bold font-heading mb-6 leading-tight">
              Tu nueva imagen <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
                comienza hoy.
              </span>
            </h2>
            <p className="text-slate-300 text-[15px] md:text-lg max-w-md mx-auto md:mx-0 leading-7">
              Un enfoque médico y estético diseñado exclusivamente para vos.
            </p>
          </div>

          {/* BOTÓN "SUBIR" */}
          <div
            className="hidden md:block"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="group w-24 h-24 flex-shrink-0 rounded-full bg-white text-indigo-950 flex flex-col items-center justify-center gap-1 font-bold text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-colors duration-300 shadow-2xl shadow-white/10"
            >
              <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform duration-300" />
              Subir
            </motion.button>
          </div>
        </div>

        {/* --- DARK BENTO GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-12">

          {/* CARD MENU */}
          <div
            className="md:col-span-3 bg-white/5 border border-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/10 transition-colors duration-300"
            data-aos="fade-up"
          >
            <h4 className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-6">Menu</h4>
            <ul className="space-y-4 font-medium">
              {/* Enlace Inicio usando Link para no recargar */}
              <li>
                <Link to="/" className="group flex items-center justify-between text-slate-300 hover:text-white transition-colors">
                  <span>Inicio</span>
                  <ArrowUp size={14} className="rotate-45 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-primary" />
                </Link>
              </li>

              {/* Enlaces con ancla (Hash) - Mantenemos <a> para que funcione el scroll */}
              <FooterLink href="#services">Tratamientos</FooterLink>
              <FooterLink href="#about">Doctora</FooterLink>

              {/* LINK A LA NUEVA PÁGINA CLEAN (USAMOS LINK) */}
              <li>
                <Link to="/turnos" className="group flex items-center justify-between text-slate-200 hover:text-white transition-colors font-semibold">
                  <span>Agenda Full Screen</span>
                  <ArrowUp size={14} className="rotate-45 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-primary" />
                </Link>
              </li>
            </ul>
          </div>

          {/* CARD CONTACTO */}
          <div
            className="md:col-span-4 bg-white/5 border border-white/10 backdrop-blur-sm rounded-3xl p-8 flex flex-col justify-between hover:bg-white/10 transition-colors duration-300 group"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div>
              <h4 className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-6">Contacto</h4>
              <div className="space-y-4">
                <a href="mailto:Mdravivianamarco@gmail.com" className="flex items-center gap-3 text-sm md:text-lg hover:text-primary transition-colors break-all">
                  <Mail size={18} className="text-slate-400 flex-shrink-0" /> Mdravivianamarco@gmail.com
                </a>
                <a href="https://wa.me/5492995977208" target="_blank" className="flex items-center gap-3 text-lg hover:text-primary transition-colors">
                  <Phone size={18} className="text-slate-400 flex-shrink-0" /> +54 9 299 597-7208
                </a>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex gap-3">
              <SocialIcon icon={<Instagram />} />
              <SocialIcon icon={<Facebook />} />
            </div>
          </div>

          {/* CARD MAPA */}
          <div
            className="md:col-span-5 bg-slate-800/50 border border-white/10 rounded-3xl p-8 relative overflow-hidden group min-h-[250px]"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <svg className="absolute inset-0 w-full h-full opacity-20 group-hover:opacity-30 transition-opacity duration-500 scale-125" viewBox="0 0 100 100">
              <path d="M0 0 L100 100 M100 0 L0 100 M50 0 L50 100 M0 50 L100 50" stroke="currentColor" strokeWidth="0.5" className="text-white" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-transparent to-transparent"></div>

            <div className="relative z-10 h-full flex flex-col justify-end items-start">
              <div className="bg-primary p-3 rounded-xl mb-4 shadow-lg shadow-primary/40">
                <MapPin size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-1">Neuquén Capital</h3>
              <p className="text-slate-300 mb-4">Fotheringham 115</p>
              <a href="https://maps.app.goo.gl/TU_LINK_GOOGLE_MAPS" target="_blank" rel="noopener noreferrer" className="btn btn-sm bg-white/10 border-none text-white hover:bg-white hover:text-indigo-950 rounded-full px-6 backdrop-blur-md">
                Abrir Mapa
              </a>
            </div>
          </div>

        </div>

        {/* COPYRIGHT BAR */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 font-medium uppercase tracking-widest text-center md:text-left">
          <p>© {new Date().getFullYear()} Dra. Viviana Marco.</p>
          <p>
            Designed by{' '}
            <a
              href="https://vantradigital.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E8EF41] hover:text-white transition-colors font-bold"
            >
              Vantra
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
};

// Micro-componentes
const FooterLink = ({ href, children }) => (
  <li>
    <a href={href} className="group flex items-center justify-between text-slate-300 hover:text-white transition-colors">
      <span>{children}</span>
      <ArrowUp size={14} className="rotate-45 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-primary" />
    </a>
  </li>
);

const SocialIcon = ({ icon }) => (
  <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300">
    {React.cloneElement(icon, { size: 18 })}
  </a>
);

export default Footer;