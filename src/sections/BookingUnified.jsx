import React, { useState, useEffect } from 'react';
import {
  Calendar, MessageCircle, ArrowRight, Sparkles,
  ShieldCheck, Loader2, Search, ChevronLeft,
  Smile, ClipboardList, Stethoscope, Clock, Layers, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBaserow } from '../hooks/useBaserow';

const CAL_BASE_URL = "https://cal.com/dra-viviana-marco-demo";

// --- UTILIDADES ---
const normalizeText = (text) => text.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

// --- COMPONENTS ---

const LiquidSwitch = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'whatsapp', label: 'Asistente IA', icon: <MessageCircle size={16} /> },
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

const BookingUnified = ({ initialTreatment }) => {
  const [bookingMode, setBookingMode] = useState('whatsapp');

  // Data
  const { treatmentsData, loading } = useBaserow();

  // State: WhatsApp
  const [formData, setFormData] = useState({ nombre: '', apellido: '', tratamiento: '' });

  // State: Calendar (Dual Portal)
  const [selectedSlug, setSelectedSlug] = useState(null);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Intent Mapping
  useEffect(() => {
    if (initialTreatment) {
      const lower = normalizeText(initialTreatment);
      let mappedTreatment = "Primera Consulta Estética"; // Default

      // Palabras clave para Odontología
      const dentalKeywords = ['ortodoncia', 'diente', 'bracket', 'alineador', 'dental', 'blanqueamiento', 'conducto', 'muela', 'general'];
      if (dentalKeywords.some(k => lower.includes(k))) {
        mappedTreatment = "Primera Consulta Odontológica";
      }

      setFormData(prev => ({ ...prev, tratamiento: mappedTreatment }));
      setBookingMode('whatsapp');
    }
  }, [initialTreatment]);

  // WhatsApp Handlers
  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const phoneNumber = "5492995977208";
    const message = `Hola Dra, soy ${formData.nombre} ${formData.apellido}. Me gustaría agendar un turno para: *${formData.tratamiento || "Consulta General"}*.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Calendar Helpers
  // (Precios ocultos por decisión de diseño - función conservada por si se reactiva)
  const getPrice = (targetSlug) => {
    if (loading) return null;
    const item = treatmentsData.find(t => t.slug === targetSlug);
    return item ? Number(item.price).toLocaleString('es-AR') : null;
  };

  const handleSelectPortal = (slug) => {
    setIsIframeLoaded(false);
    setSelectedSlug(slug);
  };

  const PORTALS = [
    {
      id: 'estetica',
      slug: 'primera-consulta-estetica',
      title: 'Primera Consulta Estética',
      subtitle: 'Evaluación diagnóstica y plan de tratamiento facial.',
      icon: <Sparkles size={24} className="text-purple-600" />,
      theme: {
        // Premium Action Button Theme
        iconBox: 'bg-purple-50 border-purple-100/50',
        hoverBorder: 'hover:border-purple-200'
      }
    },
    {
      id: 'odontologia',
      slug: 'primera-consulta-odontologica',
      title: 'Primera Consulta Odontológica',
      subtitle: 'Diagnóstico bucal completo y presupuesto.',
      icon: <Smile size={24} className="text-cyan-600" />,
      theme: {
        // Premium Action Button Theme
        iconBox: 'bg-cyan-50 border-cyan-100/50',
        hoverBorder: 'hover:border-cyan-200'
      }
    }
  ];

  return (
    <section id="booking" className="relative py-12 md:pt-24 md:pb-20 z-10 overflow-visible">
      <div className="max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-12 space-y-6">
          <div data-aos="zoom-in" data-aos-duration="1000">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 tracking-tight">
              Agenda tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">experiencia.</span>
            </h2>
            <p className="text-slate-500 text-[15px] md:text-lg font-light max-w-2xl mx-auto leading-7">
              Tecnología y calidez humana. Elegí el canal que prefieras.
            </p>
          </div>
          <div className="flex justify-center" data-aos="zoom-in" data-aos-delay="200">
            <LiquidSwitch activeTab={bookingMode} setActiveTab={(tab) => {
              setBookingMode(tab);
              // Reset calendar state when switching modes
              if (tab === 'whatsapp') {
                setSelectedSlug(null);
              }
            }} />
          </div>
        </div>

        {/* MAIN DISPLAY AREA */}
        <div className="min-h-[600px] relative" data-aos="zoom-in-up" data-aos-duration="800" data-aos-delay="300">
          <AnimatePresence mode="wait">

            {/* --- MODO A: WHATSAPP --- */}
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
                  <div className="flex items-center gap-5 mb-8">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-violet-400 rounded-2xl blur-md opacity-20 animate-pulse group-hover:opacity-40 transition-opacity duration-500"></div>
                      <div className="relative w-16 h-16 bg-violet-100/80 rounded-2xl flex items-center justify-center text-violet-600 border border-violet-200 shadow-inner group-hover:scale-105 transition-transform duration-300">
                        <MessageCircle size={28} strokeWidth={2.5} className="drop-shadow-sm" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 leading-tight">Asistente Virtual</h3>
                      <p className="text-slate-500 text-sm font-medium flex items-center gap-1.5">En línea ahora</p>
                    </div>
                  </div>

                  <form onSubmit={handleWhatsAppSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Tus Datos</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" placeholder="Nombre" name="nombre" required value={formData.nombre} onChange={handleFormChange} className="w-full h-12 rounded-xl px-4 bg-white border border-slate-200 text-slate-700 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all shadow-sm placeholder:text-slate-400" />
                        <input type="text" placeholder="Apellido" name="apellido" required value={formData.apellido} onChange={handleFormChange} className="w-full h-12 rounded-xl px-4 bg-white border border-slate-200 text-slate-700 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all shadow-sm placeholder:text-slate-400" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Tratamiento de Interés</label>
                      <div className="relative">
                        <select name="tratamiento" value={formData.tratamiento} onChange={handleFormChange} className="w-full h-12 bg-white border border-slate-200 rounded-xl px-4 text-base font-medium text-slate-700 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all shadow-sm appearance-none cursor-pointer">
                          <option value="" disabled>Seleccioná el tratamiento...</option>
                          <option value="Consulta General">Consulta General</option>
                          <optgroup label="Disponibles">
                            <option value="Primera Consulta Estética">Primera Consulta Estética</option>
                            <option value="Primera Consulta Odontológica">Primera Consulta Odontológica</option>
                          </optgroup>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg></div>
                      </div>
                    </div>
                    <div>
                      <button type="submit" className="w-full py-4 mt-4 rounded-full bg-violet-600 hover:bg-violet-700 text-white font-semibold text-lg shadow-lg shadow-violet-500/20 transition-all duration-300 flex items-center justify-center gap-2 group active:scale-[0.98]">
                        <span>Continuar en WhatsApp</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}

            {/* --- MODO B: CALENDARIO (DUAL PORTAL) --- */}
            {/* --- MODO B: CALENDARIO (DUAL PORTAL) --- */}
            {bookingMode === 'calendar' && (
              <motion.div
                key="calendar"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full flex justify-center items-start"
              >
                {/* CONTENEDOR ADAPTATIVO: Se expande/contrae según el contenido */}
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className={`
                    rounded-[2.5rem] border border-slate-200 overflow-hidden relative
                    ${!selectedSlug
                      ? 'w-full max-w-2xl p-6 md:p-8 bg-white/60 backdrop-blur-md shadow-2xl shadow-violet-900/5'
                      : 'w-full max-w-5xl h-[700px] p-0 bg-white shadow-xl'}
                  `}
                >
                  <AnimatePresence mode="wait">
                    {!selectedSlug ? (
                      /* PORTALS VIEW (OPCIONES) */
                      <motion.div
                        key="portals"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.2 } }}
                        className="flex flex-col gap-4"
                      >
                        {PORTALS.map((portal) => {
                          const isHovered = hoveredCard === portal.id;
                          const isDimmed = hoveredCard && hoveredCard !== portal.id;

                          return (
                            <motion.button
                              key={portal.id}
                              layout
                              onClick={() => handleSelectPortal(portal.slug)}
                              onMouseEnter={() => setHoveredCard(portal.id)}
                              onMouseLeave={() => setHoveredCard(null)}
                              className={`
                                group relative w-full flex items-center gap-4 md:gap-6 p-4 md:p-6 rounded-2xl
                                border border-slate-100 shadow-sm transition-all duration-300
                                ${portal.theme.hoverBorder} hover:shadow-md hover:-translate-y-0.5 bg-slate-50/50 hover:bg-white
                                ${isDimmed ? 'opacity-60' : 'opacity-100'}
                              `}
                            >
                              {/* Icon Box (Squircle) */}
                              <div className={`flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center border ${portal.theme.iconBox} transition-transform duration-300 group-hover:scale-105`}>
                                {portal.icon}
                              </div>

                              {/* Text Content */}
                              <div className="flex-grow text-left">
                                <h3 className="text-base md:text-lg font-bold text-slate-800 mb-1 group-hover:text-slate-900 transition-colors">
                                  {portal.title}
                                </h3>
                                <p className="text-xs md:text-sm font-medium text-slate-500 group-hover:text-slate-600 transition-colors">
                                  {portal.subtitle}
                                </p>
                              </div>

                              {/* Action Icon */}
                              <div className="flex-shrink-0 text-slate-300 group-hover:text-slate-400 group-hover:translate-x-1 transition-all">
                                <ArrowRight size={20} />
                              </div>
                            </motion.button>
                          );
                        })}
                      </motion.div>
                    ) : (
                      // IFRAME VIEW
                      <motion.div
                        key="iframe"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.2 } }}
                        className="w-full h-full flex flex-col"
                      >
                        {/* Internal Header */}
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white/90 backdrop-blur z-20">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => setSelectedSlug(null)}
                              className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors"
                            >
                              <ChevronLeft size={16} />
                            </button>
                            <span className="text-sm font-bold text-slate-700">Completar reserva</span>
                          </div>
                          <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                            <ShieldCheck size={14} /> <span>TURNOS VERIFICADOS</span>
                          </div>
                        </div>

                        {/* Iframe */}
                        <div className="flex-grow w-full h-full relative bg-slate-50">
                          {!isIframeLoaded && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center z-0">
                              <Loader2 className="animate-spin text-violet-600 mb-4" size={32} />
                              <p className="text-slate-400 text-sm font-medium animate-pulse">Cargando agenda...</p>
                            </div>
                          )}
                          <iframe
                            src={`${CAL_BASE_URL}/${selectedSlug}?embed=true&theme=light`}
                            className={`w-full h-full border-none relative z-10 transition-opacity duration-700 ${isIframeLoaded ? 'opacity-100' : 'opacity-0'}`}
                            onLoad={() => setIsIframeLoaded(true)}
                            allow="camera; microphone; autoplay; fullscreen"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section >
  );
};

export default BookingUnified;