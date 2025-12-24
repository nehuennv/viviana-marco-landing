import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { X, Clock, ShieldCheck, Sparkle, ArrowRight } from 'lucide-react';

// BADGE
const badgeClass = "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-[11px] font-bold uppercase tracking-widest mb-4";

const ServiceModal = ({ service, onClose, onSelect }) => {

  useEffect(() => {
    if (service) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [service]);

  if (!service) return null;

  return createPortal(
    <>
      {/* BACKDROP */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-[9999] flex items-end md:items-center justify-center p-0 md:p-6"
      >
        {/* CONTENIDO DEL MODAL */}
        <motion.div
          layoutId={`card-${service.id}`}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          className="
            bg-white w-full md:max-w-5xl h-[92vh] md:h-auto md:max-h-[85vh] 
            rounded-t-[2rem] md:rounded-[2rem] shadow-2xl shadow-slate-950/20 
            relative flex flex-col md:flex-row overflow-hidden
            border border-slate-200
          "
        >

          {/* BOTÓN CERRAR */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 z-50 p-2 bg-white/80 backdrop-blur-md border border-slate-200 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-all shadow-sm"
          >
            <X size={20} />
          </button>

          {/* COLUMNA IZQUIERDA: FOTO */}
          <div className="w-full md:w-5/12 h-64 md:h-auto relative shrink-0 bg-slate-100 border-b md:border-b-0 md:border-r border-slate-200">
            <img
              src={service.image}
              alt={service.title}
              loading="eager"
              className="w-full h-full object-cover"
            />
            {/* Gradiente en mobile */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden"></div>

            {/* Título flotante (Solo Mobile) */}
            <div className="absolute bottom-5 left-5 md:hidden text-white z-10 pr-12">
              <div className="inline-flex px-2 py-0.5 rounded md:hidden bg-white/20 backdrop-blur-md border border-white/30 text-[10px] font-bold uppercase tracking-widest mb-2">
                {service.category}
              </div>
              <h3 className="text-xl font-bold leading-tight text-pretty">{service.title}</h3>
            </div>
          </div>

          {/* COLUMNA DERECHA: INFO + FOOTER FIJO */}
          {/* Usamos 'flex flex-col h-full overflow-hidden' para contener todo */}
          <div className="w-full md:w-7/12 flex flex-col h-full bg-white relative overflow-hidden">

            {/* ZONA SCROLLEABLE (El contenido va acá) */}
            {/* 'flex-grow' hace que ocupe todo el espacio menos el footer */}
            <div className="flex-grow overflow-y-auto px-6 py-6 md:p-10 custom-scrollbar">

              {/* Header Desktop */}
              <div className="hidden md:block mb-8">
                <div className={badgeClass}>
                  <Sparkle size={10} className="text-violet-500 fill-violet-500" />
                  <span>{service.category}</span>
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold text-slate-800 leading-[1.1] tracking-tight">{service.title}</h3>
              </div>

              {/* BLOQUE 1: Descripción */}
              <div className="mb-8">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <ShieldCheck size={14} /> El Tratamiento
                </h4>
                <p className="text-slate-600 leading-7 md:leading-relaxed text-[15px] md:text-[17px] text-pretty font-medium">
                  {service.longDesc}
                </p>
              </div>

              {/* BLOQUE 2: Proceso */}
              <div className="border border-slate-200 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -z-10" />

                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                  <Clock size={14} /> Paso a paso
                </h4>

                <ul className="space-y-4 relative z-10">
                  {service.steps.map((step, idx) => (
                    <li key={idx} className="flex gap-4">
                      <div className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full bg-white border border-slate-200 text-violet-600 text-[11px] font-bold flex items-center justify-center shadow-sm">
                        {idx + 1}
                      </div>
                      <span className="text-slate-600 text-sm md:text-[15px] leading-snug">
                        {step}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Espacio extra al final para que no quede pegado al scroll */}
              <div className="h-6"></div>

            </div>

            {/* ZONA FOOTER (BOTÓN FIJO) */}
            {/* 'shrink-0' evita que se aplaste. Siempre visible abajo */}
            <div className="shrink-0 p-5 md:p-8 border-t border-slate-100 bg-white z-20">
              <button
                onClick={() => {
                  onSelect();
                  onClose();
                }}
                className="
                  w-full py-4 rounded-full 
                  bg-violet-600 text-white 
                  font-semibold text-[15px] tracking-wide
                  flex items-center justify-center gap-2
                  transition-all duration-200
                  hover:bg-violet-700 
                  active:scale-[0.98]
                  shadow-sm hover:shadow-md
                "
              >
                Solicitar Turno <ArrowRight size={18} className="opacity-80" />
              </button>
            </div>

          </div>

        </motion.div>
      </motion.div>
    </>,
    document.body
  );
};

export default ServiceModal;