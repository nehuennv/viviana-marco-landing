import React, { useState, useEffect } from 'react';
import { ChevronRight, CalendarCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  const badges = ["Especialista U.B.A.", "Ortodoncia Invisible", "Armonización Facial"];
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % badges.length);
        setFade(true);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    // CAMBIO 1: min-h-screen para ocupar toda la pantalla en móvil
    // flex items-center para centrar verticalmente el contenido
    <section id="home" className="relative min-h-screen flex items-center pt-20 pb-20 lg:pt-0 lg:pb-0 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center w-full">
        
        {/* COLUMNA TEXTO */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }}  
          transition={{ duration: 0.8, ease: "easeOut" }} 
          className="space-y-8 relative z-10 flex flex-col justify-center lg:block"
        >
          
          {/* BADGE */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-100 shadow-sm cursor-default w-fit">
            <div className="bg-primary/10 p-1 rounded-full text-primary">
              <Sparkles size={14} fill="currentColor" />
            </div>
            <span className={`text-xs font-bold uppercase tracking-widest text-slate-600 transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
              {badges[index]}
            </span>
          </div>
          
          {/* TITULO */}
          <h1 className="text-5xl lg:text-7xl font-bold text-slate-800 leading-[1.15] tracking-tight">
            Sonrisas que <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400 animate-pulse" style={{ animationDuration: '3s' }}>
              Iluminan.
            </span>
          </h1>
          
          <p className="text-lg text-slate-500 max-w-lg leading-relaxed font-light">
            Ortodoncia de vanguardia y armonización orofacial. Resaltamos tus rasgos naturales con tratamientos mínimamente invasivos.
          </p>
          
          {/* BOTONES NUEVOS (DELICADOS) */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            
            {/* 1. Primario: Sin sombra negra. Usa Glow Violeta. */}
            <a href="#booking" className="btn h-14 px-8 rounded-full bg-primary text-white border-none text-base normal-case font-medium tracking-wide shadow-glow-primary hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300">
              <CalendarCheck size={20} className="mr-2" />
              Agendar Cita
            </a>
            
            {/* 2. Secundario: Estilo Ghost limpio. Sin sombra oscura. */}
            <a href="#services" className="btn h-14 px-8 rounded-full bg-transparent border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-primary/30 hover:text-primary transition-all duration-300 text-base normal-case font-medium shadow-sm hover:shadow-md hover:shadow-slate-100">
              Ver Tratamientos <ChevronRight size={20} className="ml-1" />
            </a>

          </div>
          
          {/* Social Proof */}
          <div className="pt-8 flex items-center gap-4 text-sm text-slate-500 font-medium">
            <div className="flex -space-x-3">
              {[1,2,3].map(i => (
                <div key={i} className="w-10 h-10 rounded-full bg-slate-200 border-4 border-white shadow-sm"></div>
              ))}
            </div>
            <p className="text-slate-600">
              <span className="text-slate-900 font-bold">+1,500</span> pacientes felices
            </p>
          </div>
        </motion.div>

        {/* COLUMNA IMAGEN (Solo Desktop) */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }} 
          className="relative hidden lg:block h-full"
        >
          <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/50 border-[8px] border-white group">
            <img 
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Dra. Viviana Marco Consultorio" 
              className="w-full h-full object-cover aspect-[4/5] group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          
          {/* Decoraciones de fondo */}
          <div className="absolute top-10 right-10 w-full h-full border-2 border-slate-200 rounded-[3rem] -z-10 translate-x-4 translate-y-4"></div>
          <div className="absolute -bottom-12 -right-12 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl -z-10"></div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;