import React, { useState, useEffect } from 'react';
import {
    Sparkles,
    Smile,
    ArrowRight,
    X,
    ChevronLeft,
    Loader2,
    CalendarCheck,
    CheckCircle2,
    Clock,
    ShieldCheck,
    Star,
    Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

// --- CONFIGURACIÓN ---
const CAL_BASE_URL = "https://cal.com/dravivianamarco";

// --- COMPONENTES VISUALES ---

/* Fondo Sutil con Ruido y Manchas de Color */
const Background = () => (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-slate-50">
        <div className="absolute inset-0 opacity-[0.03] mix-blend-soft-light z-10"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        />
        {/* Manchas de color ambiental (Violeta Marca) */}
        <div className="absolute top-[-10%] left-[-5%] w-[60vw] h-[60vw] bg-violet-200/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-purple-100/40 rounded-full blur-[80px]" />
    </div>
);

/* Tarjeta Principal (Diseño Robusto y Espacioso) */
const SelectionCard = ({ data, onSelect }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={() => onSelect(data.slug)}
            className="group relative h-full w-full cursor-pointer"
        >
            <div className="
                h-full flex flex-col p-8 md:p-10 rounded-[2rem] 
                bg-white border border-slate-200 shadow-xl shadow-slate-200/30
                transition-all duration-300
                group-hover:border-violet-300 group-hover:shadow-2xl group-hover:shadow-violet-200/40
            ">
                {/* Header Tarjeta */}
                <div className="flex justify-between items-start mb-8">
                    <div className={`
                        w-16 h-16 rounded-2xl flex items-center justify-center
                        bg-violet-50 text-violet-600 border border-violet-100
                        transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3
                    `}>
                        <data.icon size={32} strokeWidth={1.5} />
                    </div>
                    <span className="
                        px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest
                        bg-slate-50 border border-slate-100 text-slate-500
                        group-hover:bg-violet-50 group-hover:text-violet-700 group-hover:border-violet-100 transition-colors
                    ">
                        {data.category}
                    </span>
                </div>

                {/* Contenido */}
                <div className="flex-grow">
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 group-hover:text-violet-700 transition-colors">
                        {data.title}
                    </h3>
                    <p className="text-slate-500 text-base leading-relaxed mb-8 text-pretty">
                        {data.description}
                    </p>

                    {/* Chips de Características */}
                    <div className="flex flex-wrap gap-2 mb-8">
                        {data.tags.map((tag, i) => (
                            <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-600">
                                <tag.icon size={14} className="text-violet-500" />
                                <span>{tag.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Botón (Call To Action) */}
                <div className="pt-6 border-t border-slate-100 group-hover:border-violet-100 transition-colors">
                    <div className="w-full py-3 rounded-xl bg-slate-50 text-slate-500 font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300 group-hover:bg-violet-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-violet-500/20">
                        <span>Reservar Turno</span>
                        <ArrowRight size={16} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// --- DATA ---
const OPTIONS = [
    {
        id: 'estetica',
        slug: 'primera-consulta-estetica',
        category: 'Estética Facial',
        title: 'Primera Consulta Estética',
        description: 'Evaluación diagnóstica y plan de tratamiento facial. Protocolos médicos personalizados con Toxina Botulínica y Ácido Hialurónico.',
        icon: Sparkles,
        tags: [
            { label: 'Diagnóstico Médico', icon: Star },
            { label: 'Plan a Medida', icon: ShieldCheck },
            { label: 'Duración: 30m', icon: Clock }
        ]
    },
    {
        id: 'odontologia',
        slug: 'primera-consulta-odontologica',
        category: 'Salud Dental',
        title: 'Primera Consulta Ortodoncia',
        description: 'Diagnóstico bucal completo y presupuesto. Planificación digital para Ortodoncia Invisible y Diseño de Sonrisa.',
        icon: Smile,
        tags: [
            { label: 'Scanner 3D', icon: Zap },
            { label: 'Ortodoncia', icon: Star },
            { label: 'Presupuesto', icon: ShieldCheck }
        ]
    }
];

// --- PÁGINA PRINCIPAL ---
export default function BookingPage() {
    const [selectedSlug, setSelectedSlug] = useState(null);

    // Scroll to top al entrar
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-violet-100 selection:text-violet-900 relative">
            <Background />

            {/* HEADER (No fixed, ocupa espacio real) */}
            <header className="relative z-50 w-full px-6 py-6 md:py-8 flex justify-between items-center">
                <Link to="/" className="group">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-3 bg-white/80 backdrop-blur px-4 py-2.5 rounded-full border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer"
                    >
                        <div className="w-8 h-8 rounded-full bg-violet-50 flex items-center justify-center group-hover:bg-violet-600 transition-colors">
                            <ChevronLeft size={18} className="text-violet-600 group-hover:text-white transition-colors" />
                        </div>
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-widest group-hover:text-violet-900 pr-1">
                            Volver al inicio
                        </span>
                    </motion.div>
                </Link>

                <div className="hidden md:block bg-white/50 backdrop-blur px-4 py-2 rounded-full border border-white/40 shadow-sm">
                    <span className="text-sm font-bold text-slate-800 tracking-tight">
                        Dra. Viviana Marco
                    </span>
                </div>
            </header>

            {/* CONTENIDO PRINCIPAL (Flex Grow para centrar verticalmente si sobra espacio) */}
            <main className="relative z-10 flex-grow flex flex-col justify-center w-full max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-12">

                {/* Textos de Cabecera */}
                <div className="text-center mb-12 md:mb-16 space-y-6 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-100 text-violet-700 border border-violet-200 text-xs font-bold uppercase tracking-widest"
                    >
                        <CalendarCheck size={14} /> Agenda Oficial
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight text-balance"
                    >
                        Reserva tu próxima <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-500">experiencia.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate-500 font-medium max-w-xl mx-auto leading-relaxed text-pretty"
                    >
                        Seleccioná el área de tratamiento para acceder a la agenda en tiempo real y coordinar tu visita.
                    </motion.p>
                </div>

                {/* Grid de Opciones */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl mx-auto">
                    {OPTIONS.map((opt, i) => (
                        <div key={opt.id} className="h-full">
                            <SelectionCard data={opt} onSelect={setSelectedSlug} />
                        </div>
                    ))}
                </div>

            </main>

            {/* Footer Simple (Opcional, para dar cierre visual) */}
            <footer className="relative z-10 w-full py-6 text-center text-slate-400 text-xs font-semibold uppercase tracking-widest">
                <p>© 2026 Dra. Viviana Marco</p>
            </footer>

            {/* MODAL OVERLAY */}
            <AnimatePresence>
                {selectedSlug && (
                    <BookingOverlay
                        slug={selectedSlug}
                        onClose={() => setSelectedSlug(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

// --- MODAL DE AGENDA ---
const BookingOverlay = ({ slug, onClose }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    // Bloqueo de scroll
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'auto'; };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end md:items-center justify-center sm:p-4 md:p-6 bg-slate-900/60 backdrop-blur-md"
        >
            <div className="absolute inset-0" onClick={onClose} />

            <motion.div
                initial={{ y: "100%", scale: 0.96 }}
                animate={{ y: 0, scale: 1 }}
                exit={{ y: "100%", scale: 0.96 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-6xl h-[90vh] md:h-[85vh] bg-white rounded-t-[2rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col"
            >
                {/* Header Modal */}
                <div className="shrink-0 px-6 py-4 md:px-8 border-b border-slate-100 flex justify-between items-center bg-white z-20">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-violet-600 text-white flex items-center justify-center shadow-lg shadow-violet-200">
                            <CalendarCheck size={20} />
                        </div>
                        <div>
                            <span className="block text-[10px] font-extrabold text-violet-600 uppercase tracking-widest mb-0.5">
                                Agenda Online
                            </span>
                            <span className="block text-sm md:text-base font-bold text-slate-900">
                                Seleccioná fecha y hora
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Iframe */}
                <div className="flex-grow relative bg-slate-50 w-full">
                    {!isLoaded && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                            <Loader2 className="animate-spin text-violet-600" size={32} />
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest animate-pulse">
                                Cargando...
                            </p>
                        </div>
                    )}
                    <iframe
                        src={`${CAL_BASE_URL}/${slug}?embed=true&theme=light`}
                        className={`w-full h-full border-none transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                        onLoad={() => setIsLoaded(true)}
                        allow="camera; microphone; autoplay; fullscreen"
                        title="Booking Calendar"
                    />
                </div>

                {/* Footer Modal */}
                <div className="hidden md:flex shrink-0 justify-between px-8 py-3 bg-slate-50 border-t border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                        <ShieldCheck size={12} />
                        <span>Conexión Segura SSL</span>
                    </div>
                    <span>Neuquén Capital</span>
                </div>
            </motion.div>
        </motion.div>
    );
};