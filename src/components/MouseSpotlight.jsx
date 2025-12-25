import React, { useEffect, useRef } from 'react';

const MouseSpotlight = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Lógica optimizada (Direct DOM manipulation)
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      container.style.setProperty('--x', `${clientX}px`);
      container.style.setProperty('--y', `${clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      // CAMBIO AQUÍ: 'z-0' en lugar de 'z-30'.
      // Esto asegura que esté PEGADO al fondo, pero detrás del texto (que suele ser z-10).
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
      style={{
        background: `radial-gradient(
          600px circle at var(--x) var(--y), 
          rgba(124, 58, 237, 0.15), 
          transparent 40%
        )`,
        '--x': '-1000px',
        '--y': '-1000px',
      }}
    >
      {/* Textura de ruido (Noise) */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default MouseSpotlight;