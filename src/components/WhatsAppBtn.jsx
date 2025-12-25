import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WhatsAppBtn = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const phoneNumber = "5492995977208";
  const message = "Hola Dra. Marco, quisiera consultar por un turno.";

  // --- LÓGICA DE VISIBILIDAD MEJORADA ---
  useEffect(() => {
    const toggleVisibility = () => {
      const currentScroll = window.scrollY;
      const footer = document.querySelector('footer');

      // 1. CONDICIÓN FOOTER: Desaparecer a la mitad
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Calculamos la mitad de la altura del footer
        const footerHalfHeight = footerRect.height / 2;

        // La condición ahora es: Si la parte superior del footer está más arriba
        // del punto donde se mostraría la mitad del footer... adiós botón.
        if (footerRect.top < viewportHeight - footerHalfHeight) {
          setIsVisible(false);
          return; // Cortamos aquí
        }
      }

      // 2. CONDICIÓN NORMAL: Scroll superior (> 300px)
      if (currentScroll > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    window.addEventListener("resize", toggleVisibility);

    // Verificación inicial
    toggleVisibility();

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      window.removeEventListener("resize", toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-2 pointer-events-none">

      <style>{`
        @keyframes liquid-pulse {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        .animate-liquid {
          animation: liquid-pulse 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
      `}</style>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="pointer-events-auto flex items-center gap-4"
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.5 }}
          >

            {/* 1. TOOLTIP (Fondo Sólido + Sin Bordes) */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, x: 10, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 10, scale: 0.95 }}
                  className="bg-white px-4 py-2 rounded-2xl shadow-xl shadow-slate-200/60 hidden md:block mr-2 relative"
                >
                  <p className="text-slate-600 font-medium text-sm whitespace-nowrap relative z-10">
                    ¿Dudas? <span className="text-green-600 font-bold">¡Escribinos!</span>
                  </p>

                  <div className="absolute top-1/2 -right-1 w-3 h-3 bg-white transform rotate-45 -translate-y-1/2 rounded-sm z-0"></div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 2. BOTÓN PRINCIPAL */}
            <div className="relative group">

              <div className="absolute inset-0 rounded-full bg-green-500/40 animate-liquid -z-10 pointer-events-none"></div>
              <div className="absolute inset-0 rounded-full bg-green-400/30 animate-liquid delay-500 -z-10 pointer-events-none"></div>

              <motion.a
                href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
                target="_blank"
                rel="noopener noreferrer"

                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}

                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}

                className="relative w-14 h-14 md:w-16 md:h-16 bg-gradient-to-tr from-green-600 to-emerald-500 rounded-full flex items-center justify-center text-white shadow-2xl shadow-green-600/40 hover:shadow-green-600/60 transition-all duration-300"
              >
                <MessageCircle size={28} strokeWidth={2.5} className="drop-shadow-md md:w-[32px] md:h-[32px]" />

                <div className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-full pointer-events-none"></div>
              </motion.a>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
                className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white z-20 shadow-sm"
              />
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default WhatsAppBtn;