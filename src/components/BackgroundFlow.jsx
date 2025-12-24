import React from 'react';

const BackgroundFlow = () => {
  // OPTIMIZACIÓN TOTAL: Fondo estático y ligero.
  // Reemplazamos animaciones y blurs costosos por un gradiente elegante CSS puro.
  // 'fixed inset-0' asegura que cubra 100vw y 100vh sin moverse al scrollear.
  return (
    <div
      className="fixed inset-0 w-full h-full -z-50 bg-gradient-to-br from-slate-800 via-white to-purple-50 pointer-events-none"
    // Nota: Si quieres ajustar la intensidad, cambia los colores de arriba.
    // Ejemplo más suave: from-white via-slate-50 to-purple-50/30
    />
  );
};

export default BackgroundFlow;