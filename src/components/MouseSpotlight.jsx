import React, { useEffect } from 'react';
import { useMotionValue, useSpring, motion } from 'framer-motion';

const MouseSpotlight = () => {
  // 1. Coordenadas del mouse (Valores crudos)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 2. Suavizado (Spring Physics)
  // Esto hace que la luz tarde un poquito en llegar al mouse (efecto fluido/gelatinoso)
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Restamos la mitad del tamaño del aura (400px / 2 = 200) para centrarla en el cursor
      mouseX.set(e.clientX - 200);
      mouseY.set(e.clientY - 200);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-0 hidden md:block"
      style={{
        x,
        y,
        background: 'radial-gradient(circle, rgba(162, 0, 255, 0.15) 0%, rgba(162, 0, 255, 0) 60%)',
        // Opacidad 0.15 en el centro, difuminado a 0.
        // Usamos mix-blend-mode para que se mezcle lindo con el blanco
        mixBlendMode: 'multiply', 
        filter: 'blur(40px)', // Blur extra para que sea una nube suave
      }}
    />
  );
};

export default MouseSpotlight;