import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WhatsAppBtn = () => {
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = "5492995977208"; 
  const message = "Hola Dra. Marco, quisiera consultar por un turno.";

  return (
    <div className="fixed bottom-8 right-8 z-50 flex items-center justify-end gap-4 pointer-events-none">
      
      {/* 1. EL TOOLTIP (Cartelito que sale al costado) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white px-4 py-2 rounded-xl shadow-xl border border-slate-100 hidden md:block"
          >
            <p className="text-slate-700 font-medium text-sm">
              ¿Tenés dudas? <span className="text-green-500 font-bold">¡Escribinos!</span>
            </p>
            {/* Triangulito del chat */}
            <div className="absolute top-1/2 -right-1 w-3 h-3 bg-white transform rotate-45 -translate-y-1/2"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. EL BOTÓN PRINCIPAL */}
      <motion.a
        href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        
        // Eventos para detectar el Mouse
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        
        // --- ANIMACIONES ---
        initial={{ scale: 0, rotate: 180 }} // Entra girando
        animate={{ scale: 1, rotate: 0 }}
        
        // HOVER: Escala con rebote + Sombra Verde Brillante
        whileHover={{ 
          scale: 1.1, 
          boxShadow: "0px 10px 40px -10px rgba(74, 222, 128, 0.6)" 
        }}
        
        // CLICK: Se aplasta un poquito (Feedback táctil)
        whileTap={{ scale: 0.9 }}
        
        // Configuración de la física (Spring = Rebote suave tipo Apple)
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        
        className="pointer-events-auto relative w-16 h-16 bg-gradient-to-tr from-green-600 to-green-400 rounded-full flex items-center justify-center text-white shadow-2xl shadow-green-500/30 group"
      >
        {/* Onda de respiración (Subtle Pulse) */}
        <span className="absolute inset-0 rounded-full border border-white/30 animate-[ping_2s_infinite] opacity-50"></span>
        
        {/* Icono */}
        <MessageCircle size={32} strokeWidth={2.5} className="relative z-10" />
        
        {/* Brillo Glossy (Efecto vidrio arriba) */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-full pointer-events-none"></div>
      </motion.a>
        
    </div>
  );
};

export default WhatsAppBtn;