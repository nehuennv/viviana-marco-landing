import React, { useState, useMemo, useEffect } from 'react';
import {
  Calendar, MessageCircle, ArrowRight, Sparkles,
  ShieldCheck, Loader2, Search, ChevronLeft,
  Smile, ClipboardList, Stethoscope, Clock, Layers, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBaserow } from '../hooks/useBaserow';

// --- 1. UTILIDADES & CONFIGURACIÓN VISUAL ---
const normalizeText = (text) => text.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

const smartSearch = (itemTitle, searchTerm) => {
  if (!searchTerm) return true;
  const cleanTitle = normalizeText(itemTitle);
  const cleanSearch = normalizeText(searchTerm);
  const searchTokens = cleanSearch.split(/\s+/).filter(t => t.length > 0);
  return searchTokens.every(token => {
    if (cleanTitle.includes(token)) return true;
    if (token.length > 4 && token.endsWith('s')) {
      const singularToken = token.slice(0, -1);
      if (cleanTitle.includes(singularToken)) return true;
    }
    return false;
  });
};

// Estilos de Categoría (Solo para el Calendario)
const CATEGORY_UI = {
  'Estética Facial': { icon: <Sparkles size={16} />, color: 'text-purple-600', activeClass: 'bg-purple-600 text-white shadow-purple-200' },
  'Ortodoncia & Aparatología': { icon: <Smile size={16} />, color: 'text-blue-600', activeClass: 'bg-blue-600 text-white shadow-blue-200' },
  'Consultas & Obras Sociales': { icon: <ClipboardList size={16} />, color: 'text-emerald-600', activeClass: 'bg-emerald-600 text-white shadow-emerald-200' },
  'Procedimientos Clínicos': { icon: <Stethoscope size={16} />, color: 'text-slate-600', activeClass: 'bg-slate-700 text-white shadow-slate-200' },
  'Otros': { icon: <Layers size={16} />, color: 'text-gray-500', activeClass: 'bg-gray-600 text-white shadow-gray-200' }
};

const CATEGORY_ORDER = [
  'Todos',
  'Estética Facial',
  'Ortodoncia & Aparatología',
  'Procedimientos Clínicos',
  'Consultas & Obras Sociales',
  'Otros'
];

const CAL_BASE_URL = "https://cal.com/nehuen-5wgahb";

// --- 2. SWITCH COMPONENT (Diseño Original) ---
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

// --- 3. COMPONENTE PRINCIPAL ---
const BookingUnified = ({ initialTreatment }) => {
  const [bookingMode, setBookingMode] = useState('whatsapp');

  // Hook de Datos
  const { treatmentsData, loading: loadingPrices } = useBaserow();

  // Estados Calendario
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [calendarView, setCalendarView] = useState('grid'); // 'grid' | 'iframe'
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  // Formulario WhatsApp
  const [formData, setFormData] = useState({ nombre: '', apellido: '', tratamiento: '' });

  // Efecto: Preselección
  useEffect(() => {
    if (initialTreatment) {
      setFormData(prev => ({ ...prev, tratamiento: initialTreatment }));
      setBookingMode('whatsapp');
    }
  }, [initialTreatment]);

  // --- LÓGICA DE FILTRADO ---
  const filteredTreatments = useMemo(() => {
    if (loadingPrices) return [];

    let filtered = treatmentsData.filter(item => smartSearch(item.title, searchTerm) && item.active);

    if (activeCategory !== 'Todos') {
      filtered = filtered.filter(item => (item.category || 'Otros') === activeCategory);
    }

    return filtered;
  }, [treatmentsData, searchTerm, activeCategory, loadingPrices]);

  const categories = useMemo(() => {
    const activeItems = treatmentsData.filter(t => t.active);
    const availableCats = new Set(activeItems.map(t => t.category || 'Otros'));
    return CATEGORY_ORDER.filter(cat => cat === 'Todos' || availableCats.has(cat));
  }, [treatmentsData]);

  // Handlers
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 0 && activeCategory !== 'Todos') setActiveCategory('Todos');
  };

  const handleSelectTreatment = (slug) => {
    setIsIframeLoaded(false);
    setSelectedUrl(`${CAL_BASE_URL}/${slug}?embed=true&theme=light`);
    setCalendarView('iframe');
  };

  const handleBackToGrid = () => {
    setCalendarView('grid');
    setSelectedUrl(null);
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const phoneNumber = "5492995977208";
    const message = `Hola Dra, soy ${formData.nombre} ${formData.apellido}. Me gustaría agendar un turno para: *${formData.tratamiento || "Consulta General"}*.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Variantes para animación suave
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } };

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
            <LiquidSwitch activeTab={bookingMode} setActiveTab={setBookingMode} />
          </div>
        </div>

        {/* AREA PRINCIPAL */}
        <div className="min-h-[600px] relative" data-aos="zoom-in-up" data-aos-duration="800" data-aos-delay="300">
          <AnimatePresence mode="wait">

            {/* --- MODO A: WHATSAPP (ESTÉTICA ORIGINAL RESTAURADA) --- */}
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

                  <motion.form variants={containerVariants} initial="hidden" animate="visible" onSubmit={handleWhatsAppSubmit} className="space-y-6">
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
                          <option value="Consulta General">Consulta General</option>
                          {/* Opciones dinámicas para el select de WA también */}
                          {treatmentsData.length > 0 && (
                            <optgroup label="Disponibles">
                              {treatmentsData.filter(t => t.active).map(t => (
                                <option key={t.slug} value={t.title}>{t.title}</option>
                              ))}
                            </optgroup>
                          )}
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

            {/* --- MODO B: CALENDARIO (DISEÑO INFINITY PERO ADAPTADO) --- */}
            {bookingMode === 'calendar' && (
              <motion.div
                key="calendar"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-5xl mx-auto"
              >
                <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-violet-900/5 border border-slate-200 overflow-hidden min-h-[750px] flex flex-col relative">

                  {/* HEADER INTERNO */}
                  <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white/90 backdrop-blur sticky top-0 z-20">
                    {calendarView === 'iframe' ? (
                      <button onClick={handleBackToGrid} className="flex items-center gap-2 text-slate-500 hover:text-violet-600 transition-colors group px-2 py-1 rounded-lg hover:bg-slate-50">
                        <ChevronLeft size={18} />
                        <span className="text-sm font-bold">Volver a tratamientos</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse"></span>
                        <span className="text-sm font-bold text-slate-700">Seleccioná tu tratamiento</span>
                      </div>
                    )}
                    <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                      <ShieldCheck size={14} /> <span>TURNOS VERIFICADOS</span>
                    </div>
                  </div>

                  {/* CONTENIDO DINÁMICO */}
                  <div className="flex-grow relative bg-slate-50/50">
                    <AnimatePresence mode="wait">

                      {/* VISTA GRID (Pills + Cards Nuevas) */}
                      {calendarView === 'grid' && (
                        <motion.div
                          key="grid"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                          className="absolute inset-0 flex flex-col"
                        >
                          {/* Filtros Container */}
                          <div className="p-6 pb-2 space-y-5 bg-white/50 backdrop-blur-sm z-10">
                            {/* Buscador Clean */}
                            <div className="relative group max-w-lg mx-auto">
                              <div className="relative flex items-center bg-white rounded-xl border border-slate-200 shadow-sm group-hover:border-violet-300 transition-all focus-within:ring-2 focus-within:ring-violet-100">
                                <Search className="ml-4 text-slate-400 group-focus-within:text-violet-500 transition-colors" size={18} />
                                <input
                                  type="text" placeholder="Buscar (ej: Botox, Limpieza...)"
                                  value={searchTerm} onChange={handleSearchChange}
                                  className="w-full h-12 bg-transparent border-none outline-none text-slate-700 placeholder:text-slate-400 px-3 text-sm font-medium"
                                />
                              </div>
                            </div>
                            {/* Pills de Categorías */}
                            <div className="flex flex-wrap justify-center gap-2">
                              {categories.map(cat => {
                                const isActive = activeCategory === cat;
                                const ui = CATEGORY_UI[cat] || CATEGORY_UI['Otros'];
                                return (
                                  <button
                                    key={cat} onClick={() => { setActiveCategory(cat); setSearchTerm(''); }}
                                    className={`
                                                         px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 border flex items-center gap-1.5
                                                         ${isActive ? ui.activeClass + ' shadow-md scale-105' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50'}
                                                      `}
                                  >
                                    {cat !== 'Todos' && <span className={isActive ? 'text-white' : ui.color}>{ui.icon}</span>}
                                    {cat}
                                  </button>
                                )
                              })}
                            </div>
                          </div>

                          {/* Grid Scrollable */}
                          <div className="flex-grow overflow-y-auto px-6 pb-8 custom-scrollbar">
                            {loadingPrices ? (
                              <div className="flex flex-col items-center justify-center h-full text-slate-400">
                                <Loader2 className="animate-spin mb-2 text-violet-500" size={32} />
                                <p className="text-xs font-medium">Cargando...</p>
                              </div>
                            ) : (
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                                {filteredTreatments.map((item) => (
                                  <button
                                    key={item.slug} onClick={() => handleSelectTreatment(item.slug)}
                                    className="group bg-white p-5 rounded-2xl border border-slate-200 hover:border-violet-300 shadow-sm hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300 text-left flex flex-col h-full relative overflow-hidden"
                                  >
                                    <div className="mb-3 relative z-10">
                                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-50 text-[10px] font-bold uppercase text-slate-400 border border-slate-100 group-hover:text-violet-600 group-hover:bg-violet-50 transition-colors">
                                        {CATEGORY_UI[item.category]?.icon} {item.category}
                                      </span>
                                    </div>
                                    <div className="flex-grow relative z-10">
                                      <h4 className="text-[15px] font-bold text-slate-700 group-hover:text-violet-700 transition-colors mb-1 leading-snug">{item.title}</h4>
                                      <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium"><Clock size={10} /> {item.duration}</div>
                                    </div>
                                    <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between w-full relative z-10">
                                      <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                                        {`$${Number(item.price).toLocaleString('es-AR')}`}
                                      </span>
                                      <ArrowRight size={16} className="text-slate-300 group-hover:text-violet-600 transition-colors -rotate-45 group-hover:rotate-0 transform duration-300" />
                                    </div>
                                    {/* Glow sutil en hover */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-violet-50/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                  </button>
                                ))}
                                {filteredTreatments.length === 0 && (
                                  <div className="col-span-full text-center py-10 text-slate-400 text-sm">
                                    No encontramos tratamientos.
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}

                      {/* VISTA IFRAME (Dentro del contenedor, sin modal externo) */}
                      {calendarView === 'iframe' && (
                        <motion.div
                          key="iframe"
                          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}
                          className="absolute inset-0 bg-white flex flex-col"
                        >
                          {!isIframeLoaded && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 z-0">
                              <Loader2 className="animate-spin text-violet-500 mb-3" size={32} />
                              <p className="text-xs text-slate-400 font-medium animate-pulse">Conectando con la agenda...</p>
                            </div>
                          )}
                          {selectedUrl && (
                            <iframe
                              src={selectedUrl}
                              className={`w-full h-full border-none relative z-10 transition-opacity duration-500 ${isIframeLoaded ? 'opacity-100' : 'opacity-0'}`}
                              onLoad={() => setIsIframeLoaded(true)}
                              allow="camera; microphone; autoplay; fullscreen"
                            />
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
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