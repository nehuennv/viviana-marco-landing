import React, { useState, useMemo, useEffect } from 'react';
import {
    Search, ChevronLeft, ArrowRight, X,
    Sparkles, Smile, ClipboardList, Stethoscope, Layers,
    Clock, Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useBaserow } from '../hooks/useBaserow';

// --- UTILIDADES ---
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

// --- CONFIGURACIÓN UI ---
const CATEGORY_UI = {
    'Estética Facial': { icon: <Sparkles size={16} />, color: 'text-purple-600', activeClass: 'bg-purple-600 border-purple-600 text-white' },
    'Ortodoncia & Aparatología': { icon: <Smile size={16} />, color: 'text-blue-600', activeClass: 'bg-blue-600 border-blue-600 text-white' },
    'Consultas & Obras Sociales': { icon: <ClipboardList size={16} />, color: 'text-emerald-600', activeClass: 'bg-emerald-600 border-emerald-600 text-white' },
    'Procedimientos Clínicos': { icon: <Stethoscope size={16} />, color: 'text-slate-600', activeClass: 'bg-slate-700 border-slate-700 text-white' },
    'Otros': { icon: <Layers size={16} />, color: 'text-gray-500', activeClass: 'bg-gray-600 border-gray-600 text-white' }
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

export default function BookingPage() {
    const { treatmentsData, loading: loadingPrices } = useBaserow();

    const [selectedUrl, setSelectedUrl] = useState(null);
    const [isIframeLoaded, setIsIframeLoaded] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('Todos');

    // Header Scroll Effect
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // --- FILTROS ---
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

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value.length > 0 && activeCategory !== 'Todos') {
            setActiveCategory('Todos');
        }
    };

    const handleSelect = (slug) => {
        setIsIframeLoaded(false);
        setSelectedUrl(`${CAL_BASE_URL}/${slug}?embed=true&theme=light`);
    };

    return (
        <div className="min-h-screen bg-[#FDFDFD] font-sans text-slate-600 selection:bg-violet-100 selection:text-violet-900 relative overflow-x-hidden" style={{ scrollbarGutter: 'stable' }}>

            {/* ATMÓSFERA SUTIL */}
            <div className="fixed top-0 left-0 w-full h-[400px] bg-gradient-to-b from-white via-slate-50 to-transparent pointer-events-none z-0" />
            <div className="fixed -top-40 -right-40 w-[600px] h-[600px] bg-indigo-50/40 rounded-full blur-[100px] pointer-events-none" />

            {/* --- NAVBAR DINÁMICO (TODO A LA IZQUIERDA) --- */}
            <motion.nav
                initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}
                className={`fixed top-0 left-0 right-0 z-40 px-6 py-4 flex items-center justify-between transition-all duration-500 ease-in-out ${isScrolled
                        ? 'bg-white/90 backdrop-blur-md border-b border-slate-100/50 shadow-sm'
                        : 'bg-transparent border-b border-transparent'
                    }`}
            >
                <div className="flex items-center gap-4">
                    {/* BOTÓN VOLVER */}
                    <Link to="/" className="group flex items-center gap-2">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${isScrolled ? 'bg-slate-50 border border-slate-200' : 'bg-white/80 border border-slate-200/60 shadow-sm'}`}>
                            <ChevronLeft size={18} className="text-slate-500 group-hover:text-slate-900 transition-colors" />
                        </div>
                        <span className={`text-sm font-semibold transition-colors ${isScrolled ? 'text-slate-600' : 'text-slate-500'} group-hover:text-slate-900 hidden sm:inline`}>
                            Volver
                        </span>
                    </Link>

                    {/* SEPARADOR VERTICAL */}
                    <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

                    {/* IDENTIDAD (SOLO TEXTO) */}
                    <h1 className="text-lg font-bold font-heading tracking-tight text-slate-900 leading-none">
                        Dra. Viviana Marco
                    </h1>
                </div>
            </motion.nav>

            {/* --- MAIN CONTENT --- */}
            <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-20 min-h-screen flex flex-col">

                {/* HEADER & SEARCH */}
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
                        className="text-3xl md:text-5xl font-bold text-slate-800 tracking-tight mb-8"
                    >
                        Agendá tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-500">visita.</span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
                        className="relative group max-w-xl mx-auto"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-100 to-indigo-50 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="relative flex items-center bg-white rounded-2xl border border-slate-200 shadow-sm group-hover:border-violet-200 group-hover:shadow-lg group-hover:shadow-violet-500/5 transition-all duration-300">
                            <Search className="ml-5 text-slate-400 group-focus-within:text-violet-500 transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Buscar (ej: Toxina, Brackets, Consulta...)"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="w-full h-14 bg-transparent border-none outline-none text-slate-700 placeholder:text-slate-400 px-4 text-[15px] font-medium"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* CATEGORÍAS */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-2 mb-12"
                >
                    {categories.map(cat => {
                        const isActive = activeCategory === cat;
                        const ui = CATEGORY_UI[cat] || CATEGORY_UI['Otros'];
                        return (
                            <button
                                key={cat}
                                onClick={() => { setActiveCategory(cat); setSearchTerm(''); }}
                                className={`
                             relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border
                             ${isActive
                                        ? ui.activeClass + ' shadow-md transform scale-105'
                                        : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50'}
                          `}
                            >
                                <span className="flex items-center gap-2">
                                    {cat !== 'Todos' && <span className={isActive ? 'text-white' : ui.color}>{ui.icon}</span>}
                                    {cat}
                                </span>
                            </button>
                        )
                    })}
                </motion.div>

                {/* GRID DE TRATAMIENTOS */}
                {loadingPrices ? (
                    <div className="flex flex-col items-center justify-center py-24">
                        <Loader2 className="animate-spin text-violet-500 mb-3" size={32} />
                        <p className="text-sm font-medium text-slate-400">Cargando...</p>
                    </div>
                ) : (
                    <motion.div
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredTreatments.length > 0 ? filteredTreatments.map((item) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ layout: { duration: 0.3, ease: "easeOut" } }}
                                    key={item.slug}
                                >
                                    <button
                                        onClick={() => handleSelect(item.slug)}
                                        className="w-full h-full group bg-white hover:bg-[#FAFAFA] rounded-[1.5rem] p-6 text-left border border-slate-100 hover:border-violet-100 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_-10px_rgba(124,58,237,0.06)] transition-all duration-300 flex flex-col relative overflow-hidden"
                                    >
                                        <div className="mb-4">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-violet-500 transition-colors">
                                                {CATEGORY_UI[item.category]?.icon || <Layers size={12} />}
                                                {item.category || 'General'}
                                            </span>
                                        </div>

                                        <div className="mb-6 flex-grow">
                                            <h3 className="text-[17px] font-semibold text-slate-800 leading-snug group-hover:text-violet-700 transition-colors mb-2">
                                                {item.title}
                                            </h3>
                                            <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                                                <Clock size={12} /> {item.duration}
                                            </div>
                                        </div>

                                        <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Valor</span>
                                                <span className="text-[15px] font-bold text-slate-700 group-hover:text-emerald-600 transition-colors">
                                                    {`$${Number(item.price).toLocaleString('es-AR')}`}
                                                </span>
                                            </div>
                                            <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-violet-600 group-hover:text-white transition-all duration-300">
                                                <ArrowRight size={16} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                                            </div>
                                        </div>
                                    </button>
                                </motion.div>
                            )) : (
                                <div className="col-span-full text-center py-20">
                                    <p className="text-slate-400 font-medium">No encontramos resultados.</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </main>

            {/* --- MODAL CALENDARIO --- */}
            <AnimatePresence>
                {selectedUrl && (
                    <motion.div
                        initial={{ opacity: 0, y: "100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "100%" }}
                        transition={{ type: "spring", damping: 28, stiffness: 200 }}
                        className="fixed inset-0 z-[100] bg-white flex flex-col"
                    >
                        {/* Header del Modal */}
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white/90 backdrop-blur sticky top-0 z-10">
                            <div className="flex items-center gap-4">
                                <h2 className="text-base font-medium text-slate-600">
                                    Completando <span className="text-slate-900 font-semibold ml-1">reserva</span>
                                </h2>
                            </div>

                            <button
                                onClick={() => setSelectedUrl(null)}
                                className="w-9 h-9 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-red-500 flex items-center justify-center transition-all"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Iframe */}
                        <div className="flex-grow w-full h-full relative bg-slate-50">
                            {!isIframeLoaded && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center z-0">
                                    <Loader2 className="animate-spin text-violet-500 mb-3" size={32} />
                                    <p className="text-sm font-medium text-slate-400">Conectando agenda...</p>
                                </div>
                            )}
                            <iframe
                                src={selectedUrl}
                                className={`w-full h-full border-none transition-opacity duration-700 ${isIframeLoaded ? 'opacity-100' : 'opacity-0'}`}
                                onLoad={() => setIsIframeLoaded(true)}
                                allow="camera; microphone; autoplay; fullscreen"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}