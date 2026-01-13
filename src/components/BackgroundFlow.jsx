import React from 'react';

const BackgroundFlow = () => {
  // OPTIMIZACIÓN TOTAL: Fondo estático y ligero.
  // Reemplazamos animaciones y blurs costosos por un gradiente elegante CSS puro.
  // 'fixed inset-0' asegura que cubra 100vw y 100vh sin moverse al scrollear.
  return (
    <div
      className="fixed inset-0 w-full h-full -z-50 pointer-events-none bg-gradient-to-br from-purple-100 via-white to-pink-100 opacity-60"
    />
  );
};

export default BackgroundFlow;