import React from 'react';
import { motion } from 'framer-motion';

const BackgroundFlow = () => {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none bg-white">
      
      {/* 1. Mancha Violeta (Fluye arriba izquierda <-> derecha) */}
      <motion.div
        animate={{
          x: [-100, 100, -100],
          y: [-50, 50, -50],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-300/20 rounded-full blur-[100px]"
      />

      {/* 2. Mancha Rosada (Fluye abajo derecha <-> izquierda) */}
      <motion.div
        animate={{
          x: [100, -100, 100],
          y: [50, -50, 50],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-pink-300/20 rounded-full blur-[120px]"
      />

      {/* 3. Mancha Central (Pulsa suavemente) */}
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-indigo-200/10 rounded-full blur-[80px]"
      />

    </div>
  );
};

export default BackgroundFlow;