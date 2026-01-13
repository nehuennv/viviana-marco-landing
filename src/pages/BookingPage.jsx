import React, { useState, useEffect } from 'react';
import {
    Sparkles, Smile, ArrowRight, X, ChevronLeft, Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useBaserow } from '../hooks/useBaserow';

const CAL_BASE_URL = "https://cal.com/dra-viviana-marco-demo";

export default function BookingPage() {
    const { treatmentsData, loading } = useBaserow();
    const [selectedSlug, setSelectedSlug] = useState(null);
    const [isIframeLoaded, setIsIframeLoaded] = useState(false);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);

    // Scroll Effect for Navbar
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Helper para obtener precio dinámico
    const getPrice = (targetSlug) => {
        if (loading) return null;
        const item = treatmentsData.find(t => t.slug === targetSlug);
        return item ? Number(item.price).toLocaleString('es-AR') : null;
    };

    const handleSelect = (slug) => {
        setIsIframeLoaded(false);
        setSelectedSlug(slug);
    };

    // Configuración de las 2 Tarjetas "Hero" (Consistente con la Sección)
    const PORTALS = [
        {
            id: 'estetica',
            slug: 'primera-consulta-estetica',
            title: 'Estética Facial',
            subtitle: 'Armonización y rejuvenecimiento.',
            icon: <Sparkles size={56} strokeWidth={1.5} />,
            theme: {
                bg: 'from-fuchsia-50 via-white to-purple-50',
                border: 'hover:border-fuchsia-300/50',
                iconBox: 'bg-fuchsia-100 text-fuchsia-600',
                textGradient: 'from-fuchsia-700 to-purple-800',
                button: 'bg-fuchsia-600 hover:bg-fuchsia-700 shadow-fuchsia-200',
                shadow: 'hover:shadow-fuchsia-900/10'
            }
        },
        {
            id: 'odontologia',
            slug: 'primera-consulta-odontologica',
            title: 'Odontología',
            subtitle: 'Salud, ortodoncia y diseño de sonrisa.',
            icon: <Smile size={56} strokeWidth={1.5} />,
            theme: {
                bg: 'from-cyan-50 via-white to-blue-50',
                border: 'hover:border-cyan-300/50',
                iconBox: 'bg-cyan-100 text-cyan-600',
                textGradient: 'from-cyan-700 to-blue-800',
                button: 'bg-cyan-600 hover:bg-cyan-700 shadow-cyan-200',
                shadow: 'hover:shadow-cyan-900/10'
            }
        }
    ];

    return (
        <div className="min-h-screen bg-[#FDFDFD] font-sans text-slate-600 selection:bg-violet-100 selection:text-violet-900 relative overflow-x-hidden">

            {/* ATMÓSFERA SUTIL */}
            <div className="fixed top-0 left-0 w-full h-[400px] bg-gradient-to-b from-white via-slate-50 to-transparent pointer-events-none z-0" />
            <div className="fixed -top-40 -right-40 w-[600px] h-[600px] bg-indigo-50/40 rounded-full blur-[100px] pointer-events-none" />

            {/* --- NAVBAR DINÁMICO --- */}
            <motion.nav
                initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}
                className={`fixed top-0 left-0 right-0 z-40 px-6 py-4 flex items-center justify-between transition-all duration-500 ease-in-out ${isScrolled
                    ? 'bg-white/90 backdrop-blur-md border-b border-slate-100/50 shadow-sm'
                    : 'bg-transparent border-b border-transparent'
                    }`}
            >
                <div className="flex items-center gap-4">
                    <Link to="/" className="group flex items-center gap-2">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${isScrolled ? 'bg-slate-50 border border-slate-200' : 'bg-white/80 border border-slate-200/60 shadow-sm'}`}>
                            <ChevronLeft size={18} className="text-slate-500 group-hover:text-slate-900 transition-colors" />
                        </div>
                        <span className={`text-sm font-semibold transition-colors ${isScrolled ? 'text-slate-600' : 'text-slate-500'} group-hover:text-slate-900 hidden sm:inline`}>
                            Volver al inicio
                        </span>
                    </Link>
                    <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
                    <h1 className="text-lg font-bold font-heading tracking-tight text-slate-900 leading-none">
                        Dra. Viviana Marco
                    </h1>
                </div>
            </motion.nav>

            {/* --- MAIN CONTENT --- */}
            <main className="relative z-10 max-w-6xl mx-auto px-6 h-screen flex flex-col justify-center items-center py-20 md:py-0">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 max-w-3xl"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight mb-6">
                        Agendá tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-500">visita.</span>
                    </h2>
                    <p className="text-lg text-slate-500 font-light hidden md:block">
                        Dos caminos, un mismo objetivo: tu bienestar y confianza.
                    </p>
                </motion.div>

                {/* DUAL CARDS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full">
                    {PORTALS.map((portal) => {
                        const price = getPrice(portal.slug);
                        const isHovered = hoveredCard === portal.id;
                        const isDimmed = hoveredCard && hoveredCard !== portal.id;

                        return (
                            <motion.button
                                key={portal.id}
                                onClick={() => handleSelect(portal.slug)}
                                onMouseEnter={() => setHoveredCard(portal.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className={`
                                    group relative w-full text-left rounded-[3rem] p-10 md:p-14
                                    bg-gradient-to-br ${portal.theme.bg}
                                    border border-white/80 shadow-2xl shadow-slate-200/50
                                    transition-all duration-500 ease-out
                                    ${portal.theme.border}
                                    ${isDimmed ? 'opacity-40 blur-[2px] scale-[0.95]' : 'opacity-100 blur-0 scale-100'}
                                    ${isHovered ? 'lg:scale-[1.03] lg:-translate-y-2 z-10' : 'z-0'}
                                `}
                            >
                                <div className="relative z-10 flex flex-col h-full min-h-[320px]">
                                    {/* Icon */}
                                    <div className={`w-28 h-28 rounded-[2rem] ${portal.theme.iconBox} flex items-center justify-center mb-10 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                                        {portal.icon}
                                    </div>

                                    {/* Content */}
                                    <div className="mb-8">
                                        <h3 className={`text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${portal.theme.textGradient} mb-4`}>
                                            {portal.title}
                                        </h3>
                                        <p className="text-slate-500 font-medium text-lg leading-relaxed">
                                            {portal.subtitle}
                                        </p>
                                    </div>

                                    {/* Footer */}
                                    <div className="mt-auto pt-8 border-t border-slate-900/5 flex items-end justify-between">
                                        <div>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Reserva</p>
                                            <div className="h-9 flex items-center">
                                                {loading ? (
                                                    <div className="w-28 h-5 bg-slate-200 rounded animate-pulse" />
                                                ) : (
                                                    <span className="text-2xl font-bold text-slate-800">
                                                        {price ? `$${price}` : 'Consultar'}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className={`w-16 h-16 rounded-full ${portal.theme.button} flex items-center justify-center text-white shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl`}>
                                            <ArrowRight size={28} className="transition-transform duration-500 group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </div>
                            </motion.button>
                        );
                    })}
                </div>

            </main>

            {/* --- MODAL CALENDARIO --- */}
            <AnimatePresence>
                {selectedSlug && (
                    <motion.div
                        initial={{ opacity: 0, y: "100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[100] bg-white flex flex-col"
                    >
                        {/* Header del Modal */}
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white/90 backdrop-blur sticky top-0 z-10">
                            <div className="flex items-center gap-4">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                <h2 className="text-base font-medium text-slate-600">
                                    Reserva en curso
                                </h2>
                            </div>

                            <button
                                onClick={() => setSelectedSlug(null)}
                                className="w-10 h-10 rounded-full bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 flex items-center justify-center transition-all group"
                            >
                                <X size={20} className="group-hover:rotate-90 transition-transform" />
                            </button>
                        </div>

                        {/* Iframe */}
                        <div className="flex-grow w-full h-full relative bg-slate-50">
                            {!isIframeLoaded && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center z-0">
                                    <Loader2 className="animate-spin text-violet-500 mb-3" size={32} />
                                    <p className="text-sm font-medium text-slate-400">Conectando con la agenda...</p>
                                </div>
                            )}
                            <iframe
                                src={`${CAL_BASE_URL}/${selectedSlug}?embed=true&theme=light`}
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