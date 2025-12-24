import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// La Splash Screen ahora es "tonta": solo recibe la orden de isLoading (true/false) desde App.jsx
const SplashScreen = ({ isLoading }) => {

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"

          // SALIDA SUAVE: Al terminar la carga, se disuelve delicadamente
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >

          {/* Fondo decorativo estático (sin animación pesada) */}
          <div className="absolute w-[80vw] h-[80vw] md:w-[500px] md:h-[500px] bg-purple-100/50 rounded-full blur-[60px] md:blur-[100px] -z-10 pointer-events-none" />

          {/* CONTENIDO CENTRADO */}
          <motion.div
            className="flex flex-col items-center justify-center relative z-10"
            // EFECTO DE SALIDA: El logo sube un poco mientras desaparece
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >

            {/* LOGO / SONRISA ANIMADA */}
            <div className="relative w-24 h-24 md:w-32 md:h-32 mb-4">
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

                {/* Sonrisa que se dibuja */}
                <motion.path
                  d="M10 50 Q 50 90 90 50"
                  fill="none"
                  stroke="url(#smileGradient)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              </svg>
            </div>

            {/* TEXTO */}
            <div className="text-center">
              <motion.h1
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-2xl md:text-4xl font-bold tracking-tight text-slate-800"
              >
                Dra. Viviana Marco
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="text-[10px] md:text-xs text-slate-400 font-medium uppercase tracking-[0.3em] mt-2"
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