import React, { useState, useEffect } from 'react';
import {
    Sparkles,
    Smile,
    ArrowRight,
    X,
    ChevronLeft,
    Loader2,
    ShieldCheck,
    Star
} from 'lucide-react';
import {
    motion,
    AnimatePresence,
    useMotionValue,
    useMotionTemplate
} from 'framer-motion';
import { Link } from 'react-router-dom';
import { useBaserow } from '../hooks/useBaserow';

// --- CONSTANTES ---
const CAL_BASE_URL = "https://cal.com/dra-viviana-marco-demo";

// --- COMPONENTES VISUALES ---

/**
 * Fondo Sutil (Marca de Agua)
 */
const CleanBackground = () => (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#FAFAFA]">
        <motion.div
            animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.4, 0.3],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] bg-violet-100/40 rounded-full blur-[120px]"
        />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-slate-100/50 rounded-full blur-[100px]" />
    </div>
);

/**
 * Tarjeta Interactiva "Brand Style" (Responsive)
 * - MÓVIL: Estado "Activo" (Violeta) por defecto.
 * - DESKTOP: Estado "Reposo" (Gris) -> "Activo" (Violeta) al Hover.
 */
const BrandCard = ({ data, onSelect }) => {
    // Spotlight Logic (Solo se verá en Desktop)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = ({ clientX, clientY, currentTarget }) => {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onClick={() => onSelect(data.slug)}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.4, delay: data.delay }}
            className="relative w-full group cursor-pointer h-full"
        >
            {/* Sombra suave violeta (Siempre visible en móvil, hover en desktop) */}
            <div className="
                absolute inset-4 rounded-[2.5rem] blur-[30px] transform translate-y-4 -z-10
                bg-violet-500/10 opacity-100
                md:opacity-0 md:group-hover:opacity-100
                transition-opacity duration-500
            " />

            {/* CARD CONTAINER */}
            <div className="
                relative h-full flex flex-col justify-between
                rounded-[2.5rem] p-8 md:p-12 overflow-hidden
                transition-all duration-300
                
                /* MOBILE STYLE (Services.jsx Match) */
                bg-gradient-to-br from-white via-violet-50/30 to-purple-50/20
                border border-violet-200/60
                shadow-none

                /* DESKTOP STYLE (Preserve Original) */
                md:bg-white
                md:border-slate-100 md:shadow-slate-200/40
                md:group-hover:border-violet-100 md:group-hover:shadow-violet-100/50
            ">
                {/* Spotlight (Solo Desktop) */}
                <motion.div
                    className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 md:group-hover:opacity-100 z-20 hidden md:block"
                    style={{
                        background: useMotionTemplate`
                            radial-gradient(
                                500px circle at ${mouseX}px ${mouseY}px,
                                rgba(139, 92, 246, 0.1),
                                transparent 80%
                            )
                        `
                    }}
                />

                {/* CONTENIDO */}
                <div className="relative z-30">

                    {/* Header: Icono y Badge */}
                    <div className="flex justify-between items-start mb-8">
                        {/* ICONO: Match Services.jsx (Mobile) / Preserve Desktop Hover */}
                        <div className="
                            relative w-20 h-20 rounded-[1.5rem] flex items-center justify-center
                            shadow-sm transition-all duration-500 ease-out overflow-hidden
                            
                            /* Mobile: Gradient Light & Violet Text */
                            text-violet-600
                            before:absolute before:inset-0 before:bg-gradient-to-br before:from-violet-100 before:to-purple-100 
                            
                            /* Desktop: Reset & Interactive */
                            md:text-violet-600 md:shadow-sm md:scale-100
                            md:before:bg-violet-50 md:before:border-none
                            
                            /* Desktop Hover */
                            md:group-hover:bg-violet-600 md:group-hover:text-white 
                            md:group-hover:scale-105 md:group-hover:rotate-3 md:group-hover:shadow-lg
                            md:group-hover:before:opacity-0 /* Hide light bg on hover to show solid if needed, or adjust approach */
                        ">
                            {/* Fix for Desktop Hover Solid Background: 
                                The 'before' element handles the light background. 
                                For the solid violet hover on desktop, we can style the parent or the before element.
                                Let's adopt a strategy that allows the solid color override in desktop hover.
                             */}
                            <div className="absolute inset-0 bg-violet-600 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 z-0" />

                            <data.icon size={36} strokeWidth={1.5} className="relative z-10" />
                        </div>

                        <div className="
                            px-4 py-2 rounded-full border 
                            transition-all duration-300
                            
                            /* Mobile: Services Style */
                            text-violet-700 bg-violet-100 border-violet-200/50
                            
                            /* Desktop: Original Style Base */
                            md:bg-white md:text-slate-500 md:border-violet-100 md:opacity-70 
                            
                            /* Desktop Hover */
                            md:group-hover:opacity-100 md:group-hover:text-violet-600
                        ">
                            <span className="text-xs font-bold uppercase tracking-widest text-current">
                                {data.category}
                            </span>
                        </div>
                    </div>

                    {/* Títulos */}
                    <div className="mb-6">
                        <h3 className="
                            text-3xl md:text-4xl font-bold mb-3 leading-tight transition-colors duration-300
                            
                            /* Mobile: Violeta */
                            text-violet-700
                            
                            /* Desktop: Negro -> Violeta */
                            md:text-slate-900 
                            md:group-hover:text-violet-700
                        ">
                            {data.title}
                        </h3>

                        {/* Línea decorativa */}
                        <div className="
                            h-1.5 rounded-full transition-all duration-500
                            
                            /* Mobile: Larga y Violeta */
                            w-20 bg-violet-500
                            
                            /* Desktop: Corta y Gris -> Larga y Violeta */
                            md:w-12 md:bg-slate-100 
                            md:group-hover:w-20 md:group-hover:bg-violet-500
                        " />
                    </div>

                    <p className="
                        text-lg font-medium leading-relaxed mb-8 transition-colors
                        
                        /* Mobile */
                        text-slate-600
                        
                        /* Desktop */
                        md:text-slate-500 
                        md:group-hover:text-slate-600
                    ">
                        {data.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-3 mb-8">
                        {data.features.map((feat, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="
                                    p-1 rounded-full transition-colors
                                    
                                    /* Mobile: Services Style */
                                    bg-violet-100 text-violet-600

                                    /* Desktop: Original */
                                    md:bg-violet-50 md:text-violet-500 
                                    md:group-hover:bg-violet-100 md:group-hover:text-violet-600
                                ">
                                    <Star size={10} fill="currentColor" />
                                </div>
                                <span className="
                                    text-sm font-semibold transition-colors
                                    text-slate-700
                                    md:text-slate-500 
                                    md:group-hover:text-slate-700
                                ">
                                    {feat}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FOOTER: Botón */}
                <div className="relative z-30 mt-auto pt-8">
                    <div className="
                        w-full py-4 rounded-full flex flex-row items-center justify-center gap-3
                        text-white text-base font-semibold
                        transition-all duration-300
                        shadow-lg
                        
                        /* Mobile: Violeta */
                        bg-violet-600 shadow-violet-200
                        
                        /* Desktop: Negro -> Violeta */
                        md:bg-slate-900 md:shadow-slate-200
                        md:group-hover:bg-violet-600 md:group-hover:shadow-violet-200
                        md:group-hover:scale-[1.02]
                    ">
                        <span>Reservar Turno</span>
                        <ArrowRight size={20} className="md:group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// --- DATOS ---
const SERVICES = [
    {
        id: 'estetica',
        slug: 'primera-consulta-estetica',
        category: 'Medicina Estética',
        title: 'Armonización Facial',
        description: 'Rejuvenecimiento médico con Botox, Hialurónico y Bioestimuladores. Realzamos tus rasgos naturales respetando la anatomía de tu rostro.',
        features: ['Botox Full Face', 'Labios & Perfilado', 'Piel & Glow Effect'],
        icon: Sparkles,
        delay: 0.1
    },
    {
        id: 'odontologia',
        slug: 'primera-consulta-odontologica',
        category: 'Ortodoncia & Diseño',
        title: 'Ortodoncia Premium',
        description: 'Tecnología 100% invisible con Alineadores y Sistema Damon Autoligado. Tratamientos más rápidos, cómodos y de alta precisión.',
        features: ['Alineadores Invisibles', 'Sistema Damon', 'Scanner Intraoral 3D'],
        icon: Smile,
        delay: 0.2
    }
];

// --- PÁGINA PRINCIPAL ---

export default function BookingPage() {
    const { loading } = useBaserow();
    const [selectedSlug, setSelectedSlug] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen relative font-sans selection:bg-violet-100 selection:text-violet-900 bg-[#FAFAFA]">
            <CleanBackground />

            {/* HEADER */}
            <motion.header
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6 }}
                className="fixed top-0 left-0 w-full z-40 px-6 py-6 flex justify-between items-center pointer-events-none"
            >
                <Link to="/" className="pointer-events-auto group">
                    <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md pl-2 pr-6 py-2 rounded-full border border-white shadow-sm hover:shadow-lg transition-all duration-300">
                        <div className="w-9 h-9 rounded-full bg-violet-50 group-hover:bg-violet-600 flex items-center justify-center transition-colors">
                            <ChevronLeft size={18} className="text-violet-500 group-hover:text-white transition-colors" />
                        </div>
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-widest group-hover:text-violet-900">
                            Volver
                        </span>
                    </div>
                </Link>

                <div className="hidden md:block pointer-events-auto bg-white/50 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/40 shadow-sm">
                    <span className="text-sm font-bold text-slate-800 tracking-tight">
                        Dra. Viviana Marco
                    </span>
                </div>
            </motion.header>

            {/* MAIN CONTENT */}
            <main className="relative z-10 container mx-auto px-6 min-h-screen flex flex-col justify-center py-24 md:py-20">

                <div className="text-center mb-12 md:mb-20 max-w-3xl mx-auto space-y-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-50 text-violet-700 border border-violet-100 text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm mb-2"
                    >
                        <ShieldCheck size={12} />
                        Agenda Oficial
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-7xl font-bold text-slate-900 tracking-tighter leading-tight"
                    >
                        Tu transformación <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">comienza hoy.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate-500 font-medium max-w-xl mx-auto"
                    >
                        Atención exclusiva en Fotheringham 115. Seleccioná tu tratamiento para coordinar tu visita.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl mx-auto items-stretch">
                    {SERVICES.map((service) => (
                        <div key={service.id} className="h-full">
                            <BrandCard
                                data={service}
                                onSelect={setSelectedSlug}
                            />
                        </div>
                    ))}
                </div>

            </main>

            {/* MODAL FULLSCREEN */}
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

// MODAL FULLSCREEN
const BookingOverlay = ({ slug, onClose }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
        >
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                onClick={onClose}
            />

            <motion.div
                initial={{ scale: 0.95, y: 30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 30, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-5xl h-[85vh] md:h-[90vh] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col"
            >
                {/* Header Modal */}
                <div className="px-6 md:px-8 py-5 bg-white border-b border-slate-100 flex justify-between items-center z-20">
                    <div className="flex items-center gap-4">
                        <div className="w-2.5 h-2.5 rounded-full bg-violet-500 animate-pulse" />
                        <div>
                            <span className="block text-xs font-bold text-violet-600 uppercase tracking-widest">
                                Agenda Online
                            </span>
                            <h2 className="text-sm font-bold text-slate-900">Seleccioná tu horario</h2>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="group flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-red-500 transition-all"
                    >
                        <span className="text-xs font-bold uppercase tracking-widest hidden md:block">Cancelar</span>
                        <X size={18} />
                    </button>
                </div>

                {/* Iframe */}
                <div className="flex-grow relative bg-slate-50">
                    {!isLoaded && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                            <Loader2 className="animate-spin text-violet-600" size={40} />
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse">
                                Cargando agenda...
                            </p>
                        </div>
                    )}
                    <iframe
                        src={`${CAL_BASE_URL}/${slug}?embed=true&theme=light`}
                        className={`w-full h-full border-none transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                        onLoad={() => setIsLoaded(true)}
                        allow="camera; microphone; autoplay; fullscreen"
                        title="Booking Calendar"
                    />
                </div>
            </motion.div>
        </motion.div>
    );
};