import React from 'react';

const BackgroundFlow = () => {
  // OPTIMIZACIÓN MÁXIMA: 
  // 1. Eliminamos Framer Motion y Hooks de estado (cero carga en el hilo principal JS).
  // 2. Usamos CSS Keyframes que corren nativamente en la GPU.
  // 3. Bajamos un poco los filtros de 'blur' en móvil para evitar sobrecalentamiento.

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none bg-white">
      {/* Definimos las animaciones localmente para no ensuciar tu CSS global */}
      <style>{`
        @keyframes float-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(10%, 10%) scale(1.1); }
          66% { transform: translate(-5%, 5%) scale(0.9); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-10%, -10%) scale(1.1); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.8; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.2); }
        }

        /* Clases de animación */
        .blob-anim-1 { animation: float-1 20s ease-in-out infinite; }
        .blob-anim-2 { animation: float-2 25s ease-in-out infinite; }
        .blob-anim-3 { animation: pulse-slow 15s ease-in-out infinite; }
        
        /* EN MÓVIL: Desactivamos animaciones para ahorrar batería (CSS puro, sin JS) */
        @media (max-width: 768px) {
          .blob-anim-1, .blob-anim-2, .blob-anim-3 { 
            animation: none; 
          }
        }
      `}</style>

      {/* 1. Mancha Violeta */}
      <div
        className="blob-anim-1 absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-300/20 rounded-full blur-[60px] md:blur-[100px]"
      />

      {/* 2. Mancha Rosada */}
      <div
        className="blob-anim-2 absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-pink-300/20 rounded-full blur-[60px] md:blur-[120px]"
      />

      {/* 3. Mancha Central */}
      <div
        className="blob-anim-3 absolute top-1/2 left-1/2 w-[40vw] h-[40vw] bg-indigo-200/10 rounded-full blur-[50px] md:blur-[80px]"
      />

    </div>
  );
};

export default BackgroundFlow;