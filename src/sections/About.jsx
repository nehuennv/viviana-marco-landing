import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GraduationCap, Award, Sparkles } from 'lucide-react';
import vivianaFoto from '../assets/viviana-about.webp'; // Asegurate que la ruta sea correcta

const About = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // PARALLAX: Movimiento lateral suave
  const xViviana = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const xMarco = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const credentials = [
    {
      label: "Universidad de Buenos Aires",
      text: "Egresada de la UBA",
      icon: GraduationCap
    },
    {
      label: "Especialización",
      text: "Postgrado en Ortodoncia, Autoligado y Alineadores.",
      icon: Award
    },
    {
      label: "Estética Facial",
      text: "Diplomado en Armonización Orofacial.",
      icon: Sparkles
    }
  ];

  return (
    <section id="about" ref={sectionRef} className="relative py-12 md:py-24 overflow-hidden">

      {/* --- BACKGROUND PARALLAX TEXT --- */}
      <motion.div
        style={{ x: xViviana }}
        className="absolute top-0 left-0 pointer-events-none select-none z-0"
      >
        <span className="text-[5rem] md:text-[12rem] lg:text-[14rem] font-black text-slate-900/5 leading-none tracking-tighter block whitespace-nowrap ml-[-2vw]">
          VIVIANA
        </span>
      </motion.div>

      <motion.div
        style={{ x: xMarco }}
        className="absolute bottom-0 right-0 pointer-events-none select-none z-0"
      >
        <span className="text-[5rem] md:text-[12rem] lg:text-[14rem] font-black text-slate-900/5 leading-none tracking-tighter block whitespace-nowrap mr-[-2vw]">
          MARCO
        </span>
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-0 items-center">

          {/* --- 1. FOTO --- */}
          <div className="md:col-span-7 relative w-full flex justify-center md:block">
            <motion.div
              // FIX: CAMBIAMOS CLIP-PATH POR SCALE + Y
              // Esto mantiene los bordes redondeados siempre visibles y perfectos
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}

              viewport={{ once: true, amount: 0.4 }} // Espera a que se vea el 40% de la foto
              transition={{ duration: 0.8, ease: "easeOut" }} // Animación fluida de menos de 1 segundo

              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 1.02 }}

              className="relative w-full max-w-md md:max-w-full aspect-[4/5] md:h-[650px] md:aspect-auto rounded-[2.5rem] overflow-hidden group shadow-2xl shadow-slate-900/5 border-[6px] border-white"
            >
            <img 
              src={vivianaFoto} 
              alt="Dra. Viviana Marco"
              // OPTIMIZACIÓN: Lazy load para ahorrar datos iniciales
              loading="lazy" 
              decoding="async"
              // Asegúrate de mantener tus clases originales
              className="...tus clases originales..." 
            />
              <div className="absolute inset-0 bg-purple-900/10 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-700"></div>
            </motion.div>

            {/* DECORACIÓN LATERAL (Solo Desktop) */}
            <div className="absolute -right-12 bottom-20 hidden md:flex flex-col items-center gap-6 opacity-60">
              <span className="text-xs font-bold uppercase tracking-[0.3em] [writing-mode:vertical-rl] text-slate-800">Ortodoncia</span>
              <span className="h-12 w-px bg-slate-800"></span>
              <span className="text-xs font-bold uppercase tracking-[0.3em] [writing-mode:vertical-rl] text-slate-800">Estética</span>
            </div>
          </div>

          {/* --- 2. TARJETA DE TEXTO --- */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="md:col-span-5 md:-ml-24 relative z-20 mt-2 md:mt-0 "
          >
            {/* CARD INTERACTIVA */}
            <motion.div
              whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-white/90 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-900/5 relative overflow-hidden"
            >

              {/* Glow decorativo */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100/50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>

              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-8 bg-purple-600"></span>
                <span className="text-xs font-bold text-purple-600 uppercase tracking-widest">Sobre Mí</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 leading-tight">
                Ciencia, arte y <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-violet-500">
                  pasión por los detalles.
                </span>
              </h2>

              <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-8 border-l-2 border-purple-200 pl-4 italic">
                "No diseño sonrisas genéricas. Estudio tu anatomía facial para lograr una armonía que potencie tu belleza única."
              </p>

              {/* Credenciales */}
              <div className="space-y-4">
                {credentials.map((cred, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 10, backgroundColor: "rgba(255, 255, 255, 0.5)" }}
                    whileTap={{ x: 10, backgroundColor: "rgba(255, 255, 255, 0.5)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="flex items-start gap-4 p-3 -mx-3 rounded-2xl transition-colors cursor-default group"
                  >
                    <motion.div
                      whileHover={{ rotate: 15, scale: 1.1 }}
                      whileTap={{ rotate: 15, scale: 1.1 }}
                      className="mt-1 p-2.5 rounded-2xl bg-slate-50 text-slate-400 group-hover:text-purple-600 group-hover:bg-purple-100 transition-colors duration-300 shadow-sm"
                    >
                      <cred.icon size={20} />
                    </motion.div>

                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 group-hover:text-purple-400 transition-colors">{cred.label}</h4>
                      <p className="text-sm font-semibold text-slate-800 leading-tight">{cred.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;