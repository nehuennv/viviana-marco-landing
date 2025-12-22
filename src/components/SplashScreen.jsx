import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SplashScreen = ({ finishLoading }) => {
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // TIEMPO EN PANTALLA: 3 segundos
    const timer = setTimeout(() => {
      setIsMounted(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence
      onExitComplete={() => finishLoading()}
    >
      {isMounted && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
          
          // --- AQUÍ ESTÁ EL CAMBIO: DISOLVER FONDO ---
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }} 
          transition={{ 
            duration: 0.8, 
            ease: "easeInOut" 
          }}
        >
          
          {/* Fondo decorativo (Glow) */}
          <div className="absolute w-[500px] h-[500px] bg-purple-100 rounded-full blur-[100px] -z-10 pointer-events-none opacity-60" />

          {/* CONTENIDO INTERNO: ESTE SÍ SUBE */}
          <motion.div 
            className="flex flex-col items-center justify-center relative z-10"
            
            // --- EFECTO "LIFT OFF": SUBE Y SE DESVANECE ---
            exit={{ y: -100, opacity: 0 }} 
            transition={{ 
              duration: 0.8, 
              ease: [0.76, 0, 0.24, 1] // Curva suave
            }}
          >
            
            {/* LOGO / SONRISA ANIMADA */}
            <div className="relative w-28 h-28 md:w-32 md:h-32 mb-4"> 
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 100 100" 
                className="w-full h-full overflow-visible"
              >
                <defs>
                  <linearGradient id="smileGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7c3aed" /> 
                    <stop offset="100%" stopColor="#c084fc" />
                  </linearGradient>
                </defs>

                <motion.path
                  d="M10 50 Q 50 90 90 50"
                  fill="none"
                  stroke="url(#smileGradient)" 
                  strokeWidth="5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                />
                
                <motion.circle 
                   cx="90" cy="50" r="3" fill="#c084fc"
                   initial={{ scale: 0, opacity: 0 }}
                   animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
                   transition={{ delay: 1.2, duration: 0.6 }}
                />
              </svg>
            </div>

            {/* TEXTO */}
            <div className="text-center overflow-hidden">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                className="text-3xl md:text-5xl font-bold tracking-tight text-slate-800"
              >
                Dra. Viviana Marco
              </motion.h1>

              <motion.p
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.6, duration: 1 }}
                 className="text-xs md:text-sm text-slate-400 font-medium uppercase tracking-[0.3em] mt-2"
              >
                Estética & Ortodoncia
              </motion.p>
            </div>
            
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;