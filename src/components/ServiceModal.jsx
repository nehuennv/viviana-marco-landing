import React from 'react';
import { motion } from 'framer-motion';
import { X, Clock, ShieldCheck } from 'lucide-react';

const ServiceModal = ({ service, onClose, onSelect }) => {
  if (!service) return null;

  return (
    <>
      {/* BACKDROP */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
      >
        {/* MODAL CONTENT */}
        <motion.div
          layoutId={`card-${service.id}`}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl relative flex flex-col md:flex-row overflow-hidden"
        >
          
          {/* BOTÓN CERRAR */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 bg-white/50 backdrop-blur-md rounded-full text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <X size={24} />
          </button>

          {/* COLUMNA IZQUIERDA: FOTO */}
          <div className="w-full md:w-2/5 h-64 md:h-auto relative">
            <img 
              src={service.image} 
              alt={service.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:hidden"></div>
            <div className="absolute bottom-4 left-4 md:hidden text-white">
              <p className="text-xs font-bold uppercase tracking-widest opacity-80">{service.category}</p>
              <h3 className="text-2xl font-bold">{service.title}</h3>
            </div>
          </div>

          {/* COLUMNA DERECHA: INFO */}
          <div className="w-full md:w-3/5 p-8 md:p-12 space-y-8 bg-white">
            
            <div className="hidden md:block">
              <span className="inline-block py-1 px-3 rounded-full bg-purple-50 text-primary text-xs font-bold uppercase tracking-widest mb-3">
                {service.category}
              </span>
              <h3 className="text-3xl font-bold text-slate-800 mb-2">{service.title}</h3>
            </div>

            {/* Descripción */}
            <div>
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <ShieldCheck size={16} /> ¿En qué consiste?
              </h4>
              <p className="text-slate-600 leading-relaxed text-lg text-balance">
                {service.longDesc}
              </p>
            </div>

            {/* Paso a Paso */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Clock size={16} /> Proceso del Tratamiento
              </h4>
              <ul className="space-y-4">
                {service.steps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="mt-0.5 min-w-[24px] h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-primary shadow-sm">
                      {idx + 1}
                    </div>
                    <span className="text-slate-700 font-medium">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA ARREGLADO */}
            <div className="pt-4">
              <button 
                onClick={() => {
                  onSelect();
                  onClose();
                }}
                className="w-full py-4 rounded-2xl bg-primary text-white font-bold text-lg shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300"
              >
                Solicitar este tratamiento
              </button>
            </div>

          </div>

        </motion.div>
      </motion.div>
    </>
  );
};

export default ServiceModal;