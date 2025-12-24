import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const BackgroundFlow = () => {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Detectar si es móvil para desactivar animaciones pesadas
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Variantes: Si es móvil, NO se anima. Si es desktop, sí.
  const blobVariants = {
    animate: (custom) => ({
      x: custom.x,
      y: custom.y,
      scale: custom.scale,
      transition: {
        duration: custom.duration,
        repeat: Infinity,
        ease: "easeInOut",
      }
    }),
    static: {
      x: 0, y: 0, scale: 1 // Posición fija para ahorrar recursos
    }
  };

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none bg-white">

      {/* 1. Mancha Violeta */}
      <motion.div
        variants={blobVariants}
        animate={isMobile ? "static" : "animate"}
        custom={{ x: [-100, 100, -100], y: [-50, 50, -50], scale: [1, 1.2, 1], duration: 20 }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-300/20 rounded-full blur-[80px] md:blur-[100px]"
      />

      {/* 2. Mancha Rosada */}
      <motion.div
        variants={blobVariants}
        animate={isMobile ? "static" : "animate"}
        custom={{ x: [100, -100, 100], y: [50, -50, 50], scale: [1.2, 1, 1.2], duration: 25 }}
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-pink-300/20 rounded-full blur-[80px] md:blur-[120px]"
      />

      {/* 3. Mancha Central */}
      <motion.div
        variants={blobVariants}
        animate={isMobile ? "static" : "animate"}
        custom={{ x: 0, y: 0, scale: [1, 1.5, 1], duration: 15 }} // Solo escala en desktop
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-indigo-200/10 rounded-full blur-[60px] md:blur-[80px]"
      />

    </div>
  );
};

export default BackgroundFlow;