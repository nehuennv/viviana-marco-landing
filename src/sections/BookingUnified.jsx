import React, { useState, useEffect } from 'react';
import {
  Calendar, MessageCircle, ArrowRight, Sparkles,
  ShieldCheck, Loader2, ChevronLeft, Search,
  Smile, ClipboardList, Stethoscope, Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBaserow } from '../hooks/useBaserow'; // Tu hook actualizado

// ... (MANTENER LA LISTA TREATMENT_CATEGORIES IGUAL QUE ANTES) ...
// Para ahorrar espacio aquí no la repito, pero déjala tal cual la tenías
const TREATMENT_CATEGORIES = [
  // ... tus categorías ...
  {
    id: 'estetica',
    label: 'Estética Facial',
    icon: <Sparkles size={18} />,
    color: 'text-purple-600 bg-purple-50 border-purple-100',
    items: [
      { title: 'Toxina Tercio Superior', slug: 'toxina-tercio-superior', time: '30m' },
      { title: 'Control Toxina', slug: 'control-toxina', time: '15m' },
      { title: 'Primera Consulta Estética', slug: 'primera-consulta-estetica', time: '35m' },
    ]
  },
  // ... (copia el resto de categorías de tu archivo anterior)
  {
    id: 'ortodoncia',
    label: 'Ortodoncia & Aparatología',
    icon: <Smile size={18} />,
    color: 'text-blue-600 bg-blue-50 border-blue-100',
    items: [
      { title: 'Control Ortodoncia', slug: 'control-ortodoncia', time: '20m' },
      { title: 'Armado de Aparatología', slug: 'armado-de-aparatologia', time: '60m' },
      { title: 'Recementado de Bracket', slug: 'recementado-de-bracket', time: '15m' },
      { title: 'Entrega de Placa', slug: 'entrega-placa', time: '15m' },
      { title: 'Retiro Aparatología Superior', slug: 'retiro-aparatologia-superior', time: '45m' },
      { title: 'Retiro Aparatología Inferior', slug: 'retiro-aparatologia-inferior', time: '45m' },
      { title: 'Retiro Ambos Maxilares', slug: 'retiro-ambos-maxilares', time: '90m' },
      { title: 'Control Post Tratamiento', slug: 'control-post-tratamiento', time: '15m' },
    ]
  },
  {
    id: 'consultas',
    label: 'Consultas & Obras Sociales',
    icon: <ClipboardList size={18} />,
    color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    items: [
      { title: 'Primera Consulta Particular', slug: 'primera-consulta-particular', time: '20m' },
      { title: 'Primera Consulta ISSN', slug: 'primera-consulta-issn', time: '30m' },
      { title: 'Recepción de Estudios', slug: 'recepcion-de-estudios', time: '15m' },
      { title: 'Consulta General', slug: 'consulta-general', time: '20m' },
      { title: 'Urgencia', slug: 'urgencia', time: '20m' },
    ]
  },
  {
    id: 'clinica',
    label: 'Procedimientos Clínicos',
    icon: <Stethoscope size={18} />,
    color: 'text-slate-600 bg-slate-50 border-slate-200',
    items: [
      { title: 'Limpieza con Ultrasonido', slug: 'limpieza-con-ultrasonido', time: '30m' },
      { title: 'Gingivectomía', slug: 'gingivectomia', time: '45m' },
      { title: 'Protocolo Fotos y Cefalo', slug: 'protocolo-fotos-y-cefalo', time: '20m' },
      { title: 'MIA (Microimplantes)', slug: 'mia', time: '30m' },
      { title: 'Lury', slug: 'lury', time: '30m' },
    ]
  }
];

const CAL_BASE_URL = "https://cal.com/nehuen-5wgahb";

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

const BookingUnified = ({ initialTreatment }) => {
  const [bookingMode, setBookingMode] = useState('whatsapp');

  // IMPORTAMOS "isActive" DEL HOOK
  const { getPrice, isActive, loading: loadingPrices } = useBaserow();

  const [calendarStep, setCalendarStep] = useState('selection');
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleTreatmentSelect = (slug) => {
    setIsIframeLoaded(false);
    setSelectedUrl(`${CAL_BASE_URL}/${slug}?embed=true&theme=light`);
    setCalendarStep('booking');
  };

  const handleBack = () => {
    setCalendarStep('selection');
    setSelectedUrl(null);
    setSearchTerm('');
  };

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

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } };

  // --- FILTRADO INTELIGENTE (BÚSQUEDA + ESTADO ACTIVO) ---
  const filteredCategories = TREATMENT_CATEGORIES.map(cat => ({
    ...cat,
    items: cat.items.filter(item => {
      // 1. Filtro por buscador
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      // 2. Filtro por Baserow (Si está inactivo, no pasa)
      const isItemActive = isActive(item.slug);

      return matchesSearch && isItemActive;
    })
  })).filter(cat => cat.items.length > 0);

  return (
    <section id="booking" className="relative py-12 md:pt-24 md:pb-20 z-10 overflow-visible">
      <div className="max-w-5xl mx-auto px-6">

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
            <LiquidSwitch activeTab={bookingMode} setActiveTab={setBookingMode} />
          </div>
        </div>

        {/* AREA PRINCIPAL */}
        <div className="min-h-[600px] relative" data-aos="zoom-in-up" data-aos-duration="800" data-aos-delay="300">
          <AnimatePresence mode="wait">

            {/* --- WHATSAPP (SIN CAMBIOS) --- */}
            {bookingMode === 'whatsapp' && (
              <motion.div
                key="whatsapp"
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="max-w-xl mx-auto"
              >
                {/* ... (Todo tu código del form de whatsapp va acá igual que antes) ... */}
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

                  <motion.form variants={containerVariants} initial="hidden" animate="visible" onSubmit={handleSubmit} className="space-y-6">
                    <motion.div variants={itemVariants} className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Tus Datos</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" placeholder="Nombre" name="nombre" required value={formData.nombre} onChange={handleChange} className="w-full h-12 rounded-xl px-4 bg-white border border-slate-200 text-slate-700 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all shadow-sm placeholder:text-slate-400" />
                        <input type="text" placeholder="Apellido" name="apellido" required value={formData.apellido} onChange={handleChange} className="w-full h-12 rounded-xl px-4 bg-white border border-slate-200 text-slate-700 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all shadow-sm placeholder:text-slate-400" />
                      </div>
                    </motion.div>
                    <motion.div variants={itemVariants} className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Tratamiento de Interés</label>
                      <div className="relative">
                        <select name="tratamiento" value={formData.tratamiento} onChange={handleChange} className="w-full h-12 bg-white border border-slate-200 rounded-xl px-4 text-base font-medium text-slate-700 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 transition-all shadow-sm appearance-none cursor-pointer">
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
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg></div>
                      </div>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <button type="submit" className="w-full py-4 mt-4 rounded-full bg-violet-600 hover:bg-violet-700 text-white font-semibold text-lg shadow-lg shadow-violet-500/20 transition-all duration-300 flex items-center justify-center gap-2 group active:scale-[0.98]">
                        <span>Continuar en WhatsApp</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </motion.div>
                  </motion.form>
                </div>
              </motion.div>
            )}

            {/* --- CALENDARIO (REDISEÑADO) --- */}
            {bookingMode === 'calendar' && (
              <motion.div
                key="calendar"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-4xl mx-auto bg-white rounded-3xl md:rounded-[2.5rem] shadow-2xl shadow-violet-900/5 overflow-hidden border border-slate-200 relative h-[750px] flex flex-col"
              >
                {/* Header Calendario */}
                <div className="bg-white/90 backdrop-blur border-b border-slate-100 px-6 py-4 flex items-center justify-between z-20 shrink-0">
                  <div className="flex items-center gap-2">
                    {calendarStep === 'booking' ? (
                      <button
                        onClick={handleBack}
                        className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-violet-600 transition-colors px-3 py-1.5 hover:bg-slate-50 rounded-lg"
                      >
                        <ChevronLeft size={18} /> Atrás
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                        <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse"></span>
                        Seleccioná tratamiento
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    <span className="hidden sm:inline">Turnos verificados</span>
                  </div>
                </div>

                <div className="flex-grow relative bg-slate-50 overflow-hidden">
                  <AnimatePresence mode="wait">

                    {/* PASO 1: LISTA FILTRABLE */}
                    {calendarStep === 'selection' && (
                      <motion.div
                        key="step-selection"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 flex flex-col"
                      >
                        {/* Buscador */}
                        <div className="p-6 pb-2 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
                          <div className="relative max-w-lg mx-auto">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                              type="text"
                              placeholder="Buscar tratamiento (ej: Limpieza, Toxina...)"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-50 transition-all shadow-sm"
                            />
                          </div>
                        </div>

                        {/* LISTA CON TARJETAS REDISEÑADAS */}
                        <div className="overflow-y-auto custom-scrollbar p-6 space-y-8 flex-grow">
                          {filteredCategories.length > 0 ? (
                            filteredCategories.map((cat) => (
                              <div key={cat.id} className="max-w-3xl mx-auto">
                                <div className={`flex items-center gap-2 mb-4 px-2 py-1.5 rounded-lg w-fit ${cat.color} bg-opacity-30`}>
                                  {cat.icon}
                                  <h4 className={`text-sm font-bold uppercase tracking-wider`}>
                                    {cat.label}
                                  </h4>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                  {cat.items.map((item, idx) => (
                                    <button
                                      key={idx}
                                      onClick={() => handleTreatmentSelect(item.slug)}
                                      className="group flex flex-col justify-between p-5 rounded-2xl border border-slate-200 bg-white hover:border-violet-300 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300 text-left relative overflow-hidden h-full min-h-[110px]"
                                    >
                                      {/* Título arriba */}
                                      <div className="relative z-10 mb-4">
                                        <span className="text-[15px] font-bold text-slate-700 group-hover:text-violet-700 leading-snug block">
                                          {item.title}
                                        </span>
                                      </div>

                                      {/* Footer: Precio y Duración separados */}
                                      <div className="relative z-10 flex items-end justify-between w-full mt-auto border-t border-slate-100 pt-3">
                                        {/* PRECIO (Destacado) */}
                                        {loadingPrices ? (
                                          <div className="h-5 w-16 bg-slate-100 rounded animate-pulse" />
                                        ) : (
                                          getPrice(item.slug) ? (
                                            <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100 shadow-sm">
                                              {getPrice(item.slug)}
                                            </span>
                                          ) : (
                                            <span className="text-xs text-slate-400 font-medium italic">Consultar</span>
                                          )
                                        )}

                                        {/* DURACIÓN (Sutil) */}
                                        <div className="flex items-center gap-1 text-xs font-semibold text-slate-400 group-hover:text-violet-500 transition-colors">
                                          <Clock size={12} strokeWidth={2.5} />
                                          {item.time}
                                        </div>
                                      </div>

                                      {/* Gradiente sutil en hover */}
                                      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-violet-50/50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                    </button>
                                  ))}
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-center py-10 text-slate-400">
                              <p>No encontramos tratamientos disponibles.</p>
                            </div>
                          )}
                          <div className="h-10"></div>
                        </div>
                      </motion.div>
                    )}

                    {/* PASO 2: IFRAME CAL.COM */}
                    {calendarStep === 'booking' && (
                      <motion.div
                        key="step-booking"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 w-full h-full bg-white"
                      >
                        <AnimatePresence>
                          {!isIframeLoaded && (
                            <motion.div
                              initial={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white"
                            >
                              <Loader2 size={32} className="animate-spin text-violet-600 mb-3" />
                              <span className="text-sm font-medium text-slate-500">Conectando con la agenda...</span>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {selectedUrl && (
                          <iframe
                            src={selectedUrl}
                            title="Agenda"
                            className={`w-full h-full border-none transition-opacity duration-500 ${isIframeLoaded ? 'opacity-100' : 'opacity-0'}`}
                            loading="lazy"
                            onLoad={() => setIsIframeLoaded(true)}
                            allow="camera; microphone; autoplay; fullscreen"
                          />
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default BookingUnified;