import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import {
    Clock,
    Calendar,
    ArrowRight,
    Sparkles,
    ShieldCheck,
    UserCircle2,
    Check
} from 'lucide-react';
import { motion } from 'framer-motion';

// --- CONFIGURACIÓN ---
initMercadoPago('APP_USR-314b3d96-b1ff-4ee5-a36d-0c92e28f18d3', {
    locale: 'es-AR'
});

const N8N_CREATE_PREFERENCE_URL = "https://tu-n8n.com/webhook/crear-pago";

const CheckoutPage = () => {
    const [searchParams] = useSearchParams();
    const [preferenceId, setPreferenceId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState(900); // 15 minutos

    // --- DATOS ---
    const rawTitle = searchParams.get('title');
    const rawType = searchParams.get('type');
    const rawSlug = searchParams.get('eventTypeSlug');
    const rawAttendee = searchParams.get('attendeeName');
    const rawName = searchParams.get('name');
    const rawDate = searchParams.get('startTime');
    const rawEmail = searchParams.get('email');

    // --- RECOLECCIÓN DE DATOS COMPLETOS (NUEVO) ---
    useEffect(() => {
        const fullPayload = {};
        for (const [key, value] of searchParams.entries()) {
            fullPayload[key] = value;
        }

        console.log("----------------------------------------------------");
        console.log("🔥 DATOS DE RESERVA RECIBIDOS (PAYLOAD COMPLETO) 🔥");
        console.table(fullPayload); // Usar table para que se vea más ordenado
        console.log("Raw Object:", fullPayload);
        console.log("----------------------------------------------------");

    }, [searchParams]);

    // Helper
    const formatName = (str) => {
        if (!str) return null;
        const clean = str.replace(/-/g, ' ');
        return clean.charAt(0).toUpperCase() + clean.slice(1);
    };

    // Prioridad: Type > Slug > Title
    const getTreatmentName = () => {
        if (rawType) return formatName(rawType);
        if (rawSlug) return formatName(rawSlug);
        if (rawTitle) return rawTitle;
        return null;
    };

    const treatmentName = getTreatmentName();

    const bookingData = {
        date: rawDate,
        type: treatmentName,
        name: rawAttendee || rawName,
        email: rawEmail || ''
    };

    // --- LOGICA FECHA ---
    const formatDate = (isoString) => {
        if (!isoString) return null;
        try {
            const date = new Date(isoString);
            const day = date.getDate();
            const month = new Intl.DateTimeFormat('es-AR', { month: 'long' }).format(date);
            const time = new Intl.DateTimeFormat('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false }).format(date);
            const weekday = new Intl.DateTimeFormat('es-AR', { weekday: 'long' }).format(date);
            return {
                day,
                month: month.charAt(0).toUpperCase() + month.slice(1),
                time,
                weekday: weekday.charAt(0).toUpperCase() + weekday.slice(1)
            };
        } catch (e) {
            return null;
        }
    };

    const dateObj = formatDate(bookingData.date);
    const hasData = !!(bookingData.type && dateObj);

    // --- FETCH PREFERENCE ---
    useEffect(() => {
        const fetchPreference = async () => {
            if (!hasData) { setIsLoading(false); return; }
            try {
                const response = await fetch(N8N_CREATE_PREFERENCE_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        title: `Seña: ${bookingData.type}`,
                        price: 15000,
                        email: bookingData.email,
                        name: bookingData.name
                    }),
                });
                if (!response.ok) throw new Error('Error backend');
                const data = await response.json();
                if (data.preferenceId) setPreferenceId(data.preferenceId);
                else throw new Error('No ID');
            } catch (err) {
                console.warn("Modo Fallback UI");
            } finally {
                setIsLoading(false);
            }
        };
        fetchPreference();
        const timer = setInterval(() => setTimeLeft((p) => (p > 0 ? p - 1 : 0)), 1000);
        return () => clearInterval(timer);
    }, [hasData]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    return (
        <div className="min-h-screen bg-[#FDFCFB] relative overflow-hidden font-sans selection:bg-violet-100 selection:text-violet-900 flex items-center justify-center p-6 lg:p-12">

            {/* FONDO (Estilo Hero) */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-b from-purple-100/50 to-transparent blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-t from-violet-100/40 to-transparent blur-[120px]" />
            </div>

            {/* CARD SPLIT (Estilo Vantra + Layout Split) */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 40, damping: 20 }}
                className="relative z-10 w-full max-w-5xl bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 border-[8px] border-white ring-1 ring-slate-100 overflow-hidden flex flex-col md:flex-row min-h-[500px]"
            >

                {/* --- IZQUIERDA: VISUAL HERO & TIMER --- */}
                <div className="w-full md:w-[40%] bg-gradient-to-br from-violet-600 to-purple-600 relative overflow-hidden flex flex-col justify-between p-8 md:p-10 text-white">
                    {/* Ruido y Decoración */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-fuchsia-400/30 rounded-full blur-[80px]" />

                    {/* Badge */}
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-sm">
                            <Sparkles size={14} className="text-yellow-300" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">Reserva Vantra</span>
                        </div>
                    </div>

                    {/* Timer Heroico */}
                    <div className="relative z-10 my-auto py-8">
                        <div className="flex items-center gap-2 text-white/60 mb-2">
                            <Clock size={16} />
                            <span className="text-xs font-bold uppercase tracking-widest">Tiempo Restante</span>
                        </div>
                        <div className="text-7xl lg:text-8xl font-medium tracking-tighter tabular-nums leading-none drop-shadow-lg">
                            {formatTime(timeLeft)}
                        </div>
                        <p className="mt-4 text-white/70 font-light text-sm max-w-xs leading-relaxed">
                            Aseguramos tu lugar por 15 minutos mientras confirmás los detalles.
                        </p>
                    </div>

                    {/* Footer Visual */}
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 opacity-60">
                            <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center">
                                <Check size={16} />
                            </div>
                            <span className="text-xs font-medium uppercase tracking-wider">Pago Seguro SSL</span>
                        </div>
                    </div>
                </div>


                {/* --- DERECHA: DATOS CLEAN --- */}
                <div className="w-full md:w-[60%] p-8 md:p-12 flex flex-col bg-white relative">
                    {/* Botón Cerrar */}
                    <Link to="/" className="absolute top-8 right-8 text-slate-300 hover:text-slate-600 transition-colors">
                        <ArrowRight size={24} className="rotate-45" />
                    </Link>

                    {/* Header Datos */}
                    <div className="mb-10">
                        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Resumen</h2>
                        {hasData ? (
                            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-[1.1] tracking-tight">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-500">
                                    {bookingData.type}
                                </span>
                            </h1>
                        ) : (
                            <h1 className="text-2xl font-bold text-slate-300">Sin datos de turno</h1>
                        )}
                    </div>

                    {/* Grid de Datos */}
                    {hasData && (
                        <div className="flex-1 space-y-6">
                            {/* Fila Fecha */}
                            <div className="flex items-center gap-5 group">
                                <div className="w-14 h-14 rounded-2xl bg-violet-50 text-violet-600 flex flex-col items-center justify-center border border-violet-100 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                    <span className="text-[10px] font-bold uppercase mt-1">{dateObj.month.substring(0, 3)}</span>
                                    <span className="text-xl font-bold leading-none mb-1">{dateObj.day}</span>
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-slate-800">{dateObj.weekday}, {dateObj.time} hs</p>
                                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Consulta Presencial</p>
                                </div>
                            </div>

                            {/* Fila Paciente */}
                            <div className="flex items-center gap-5 group">
                                <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center border border-slate-100 group-hover:bg-slate-100 transition-colors duration-300">
                                    <UserCircle2 size={24} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-slate-800 truncate max-w-[200px]" title={bookingData.name}>{bookingData.name}</p>
                                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Paciente</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Footer Pago */}
                    <div className="mt-8 pt-8 border-t border-slate-100">
                        <div className="flex justify-between items-end mb-6">
                            <div>
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Total Seña</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-slate-900 tracking-tighter">$15.000</span>
                                </div>
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="h-14 w-full rounded-full bg-slate-100 animate-pulse flex items-center justify-center">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Cargando...</span>
                            </div>
                        ) : preferenceId ? (
                            <Wallet
                                initialization={{ preferenceId }}
                                customization={{
                                    visual: {
                                        buttonBackground: 'black',
                                        borderRadius: '30px', // Round full
                                        height: '56px'
                                    },
                                    texts: { action: 'pay' }
                                }}
                            />
                        ) : (
                            <button className="h-14 w-full rounded-full bg-gradient-to-r from-violet-600 to-purple-500 text-white text-base font-bold shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2">
                                <span>Pagar Seña</span>
                                <ArrowRight size={20} />
                            </button>
                        )}

                        <div className="mt-4 flex justify-center">
                            <div className="inline-flex items-center gap-1.5 text-[10px] text-slate-400 font-medium px-3 py-1 rounded-full bg-slate-50">
                                <ShieldCheck size={12} className="text-emerald-500" />
                                <span>Procesado por Mercado Pago</span>
                            </div>
                        </div>
                    </div>
                </div>

            </motion.div>
        </div>
    );
};

export default CheckoutPage;