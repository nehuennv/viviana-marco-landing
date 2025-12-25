import React, { useState, useEffect } from 'react';
import { Calendar, MessageCircle, ArrowRight, Sparkles, ShieldCheck, Loader2 } from 'lucide-react';
// Mantenemos framer-motion SOLO para la transición interna de pestañas y el form
import { motion, AnimatePresence } from 'framer-motion';

// --- COMPONENTE INTERNO: SWITCH ---
const LiquidSwitch = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'whatsapp', label: 'Asistente IA', icon: <Sparkles size={16} /> },
    { id: 'calendar', label: 'Calendario', icon: <Calendar size={16} /> }
  ];

  return (
    <div className="inline-flex bg-white/50 backdrop-blur-md p-1.5 rounded-full border border-slate-200 shadow-sm relative">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              relative z-10 flex items-center gap-2 px-6 md:px-8 py-3 rounded-full text-sm font-semibold transition-colors duration-200
              ${isActive ? 'text-white' : 'text-slate-500 hover:text-violet-600'}
            `}
          >
            {isActive && (
              <motion.div
                layoutId="active-pill-booking"
                className="absolute inset-0 bg-violet-600 rounded-full shadow-md z-10"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-20 flex items-center gap-2">
              {tab.icon} {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---
const BookingUnified = ({ initialTreatment }) => {
  const [bookingMode, setBookingMode] = useState('whatsapp');

  // Estado para controlar la carga del iframe del calendario
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    tratamiento: ''
  });

  useEffect(() => {
    if (initialTreatment) {
      setFormData(prev => ({ ...prev, tratamiento: initialTreatment }));
      setBookingMode('whatsapp');
    }
  }, [initialTreatment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const phoneNumber = "5492995977208";
    const message = `Hola Dra, soy ${formData.nombre} ${formData.apellido}. Me gustaría agendar un turno para: *${formData.tratamiento || "Consulta General"}*.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Variantes internas (Formulario)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="booking" className="relative py-12 md:pt-24 md:pb-20 z-10 overflow-visible">
      <div className="max-w-5xl mx-auto px-6">

        {/* HEADER CON ANIMACIÓN DIFERENTE */}
        <div className="text-center mb-12 space-y-6">
          <div
            data-aos="zoom-in"
            data-aos-duration="1000"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 tracking-tight">
              Agenda tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">experiencia.</span>
            </h2>
            <p className="text-slate-500 text-[15px] md:text-lg font-light max-w-2xl mx-auto leading-7">
              Tecnología y calidez humana. Elegí el canal que prefieras.
            </p>
          </div>

          <div
            className="flex justify-center"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <LiquidSwitch activeTab={bookingMode} setActiveTab={setBookingMode} />
          </div>
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <div
          className="min-h-[600px] relative"
          data-aos="zoom-in-up"
          data-aos-duration="800"
          data-aos-delay="300"
        >
          <AnimatePresence mode="wait">

            {/* OPCIÓN A: WHATSAPP FORM */}
            {bookingMode === 'whatsapp' && (
              <motion.div
                key="whatsapp"
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="max-w-xl mx-auto"
              >
                <div className="relative bg-white/60 backdrop-blur-md border border-slate-200 p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-violet-900/5 transition-all duration-500">

                  {/* HEADER DEL FORMULARIO */}
                  <div className="flex items-center gap-5 mb-8">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-violet-400 rounded-2xl blur-md opacity-20 animate-pulse group-hover:opacity-40 transition-opacity duration-500"></div>
                      <div className="relative w-16 h-16 bg-violet-100/80 rounded-2xl flex items-center justify-center text-violet-600 border border-violet-200 shadow-inner group-hover:scale-105 transition-transform duration-300">
                        <MessageCircle size={28} strokeWidth={2.5} className="drop-shadow-sm" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-[3px] border-white rounded-full shadow-sm z-10"></div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 leading-tight">Asistente Virtual</h3>
                      <p className="text-slate-500 text-sm font-medium flex items-center gap-1.5">
                        {/* <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> */}
                        En línea ahora
                      </p>
                    </div>
                  </div>

                  <motion.form
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <motion.div variants={itemVariants} className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Tus Datos</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text" placeholder="Nombre" name="nombre" required
                          value={formData.nombre} onChange={handleChange}
                          className="w-full h-12 rounded-xl px-4 bg-white border border-slate-200 text-slate-700 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all shadow-sm placeholder:text-slate-400"
                        />
                        <input
                          type="text" placeholder="Apellido" name="apellido" required
                          value={formData.apellido} onChange={handleChange}
                          className="w-full h-12 rounded-xl px-4 bg-white border border-slate-200 text-slate-700 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all shadow-sm placeholder:text-slate-400"
                        />
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Tratamiento de Interés</label>
                      <div className="relative">
                        <select
                          name="tratamiento"
                          value={formData.tratamiento}
                          onChange={handleChange}
                          className="w-full h-12 bg-white border border-slate-200 rounded-xl px-4 text-base font-medium text-slate-700 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all shadow-sm appearance-none cursor-pointer"
                        >
                          <option value="" disabled>Seleccioná el tratamiento...</option>
                          <option value="Botox Full Face">Botox Full Face</option>
                          <option value="Labios & Hialurónico">Labios & Hialurónico</option>
                          <option value="Mesoterapia">Mesoterapia</option>
                          <option value="Bioestimulación Colágeno">Bioestimulación Colágeno</option>
                          <option value="Bruxismo con Botox">Bruxismo con Botox</option>
                          <option value="Alineadores Invisibles">Alineadores Invisibles</option>
                          <option value="Brackets Autoligado">Brackets Autoligado</option>
                          <option value="Placas de Ronquidos">Placas de Ronquidos</option>
                          <option value="Consulta General">Consulta General</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <button
                        type="submit"
                        className="w-full py-4 mt-4 rounded-full bg-violet-600 hover:bg-violet-700 text-white font-semibold text-lg shadow-lg shadow-violet-500/20 transition-all duration-300 flex items-center justify-center gap-2 group active:scale-[0.98]"
                      >
                        <span>Continuar en WhatsApp</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </motion.div>
                  </motion.form>

                </div>
              </motion.div>
            )}

            {/* OPCIÓN B: CALENDARIO (CALU) - DISEÑO MEJORADO */}
            {bookingMode === 'calendar' && (
              <motion.div
                key="calendar"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full bg-white rounded-3xl md:rounded-[2.5rem] shadow-2xl shadow-violet-900/5 overflow-hidden border border-slate-200 relative h-[750px] flex flex-col"
              >
                {/* 1. BARRA DE AVISO SUPERIOR (DISEÑO MÁS LIMPIO) */}
                <div className="bg-slate-50 border-b border-slate-100 px-6 py-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    <span>Conexión Segura SSL</span>
                  </div>
                  <div className="text-xs text-slate-400 font-medium">
                    Powered by Calu
                  </div>
                </div>

                {/* 2. LOADER ELEGANTE (SE OCULTA AL CARGAR EL IFRAME) */}
                <AnimatePresence>
                  {!isIframeLoaded && (
                    <motion.div
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 top-12 z-20 flex flex-col items-center justify-center bg-white"
                    >
                      {/* Icono Pulsante */}
                      <div className="relative mb-4">
                        <div className="absolute inset-0 bg-violet-100 rounded-full animate-ping opacity-50"></div>
                        <div className="relative w-16 h-16 bg-violet-50 rounded-full flex items-center justify-center text-violet-600">
                          <Calendar size={32} />
                        </div>
                      </div>

                      {/* Texto de Carga */}
                      <div className="flex items-center gap-2 text-slate-500 font-medium text-sm">
                        <Loader2 size={16} className="animate-spin text-violet-500" />
                        <span>Cargando disponibilidad...</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 3. IFRAME OFICIAL */}
                <iframe
                  src="https://citas.calu.app/coiconsultorio"
                  title="Agenda de Turnos Dra. Viviana Marco"
                  className={`w-full h-full border-none flex-grow bg-white transition-opacity duration-700 ${isIframeLoaded ? 'opacity-100' : 'opacity-0'}`}
                  loading="lazy"
                  onLoad={() => setIsIframeLoaded(true)}
                />
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default BookingUnified;