import React, { useEffect, useState } from 'react';
import { useMotionValue, useSpring, motion } from 'framer-motion';

const MouseSpotlight = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Solo montamos la lógica si es una pantalla grande
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Si no es desktop, retornamos null. CERO consumo de CPU.
  if (!isDesktop) return null;

  return <DesktopSpotlight />;
};

// Separamos la lógica en un componente interno para que los hooks no corran en vano
const DesktopSpotlight = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - 200);
      mouseY.set(e.clientY - 200);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-0"
      style={{
        x, y,
        background: 'radial-gradient(circle, rgba(162, 0, 255, 0.15) 0%, rgba(162, 0, 255, 0) 60%)',
        mixBlendMode: 'multiply',
        filter: 'blur(40px)',
      }}
    />
  );
}

export default MouseSpotlight;