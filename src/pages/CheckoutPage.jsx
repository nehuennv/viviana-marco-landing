import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { initMercadoPago } from '@mercadopago/sdk-react';
import {
    ShieldCheck,
    Clock,
    CalendarCheck,
    Loader2,
    AlertCircle,
    ArrowRight,
    CheckCircle2,
    Sparkles,
    CreditCard,
    Zap,
    Timer
} from 'lucide-react';
import { motion } from 'framer-motion';

// --- CONFIGURACIÓN ---
initMercadoPago('APP_USR-314b3d96-b1ff-4ee5-a36d-0c92e28f18d3', {
    locale: 'es-AR'
});

const API_BOOKING_URL = "https://gaston-backendmicroservice.toooti.easypanel.host/api/web/booking";

const CheckoutPage = () => {
    const [searchParams] = useSearchParams();
    const [paymentLink, setPaymentLink] = useState(null); // Guardamos el link en vez del preferenceId
    const [isLoading, setIsLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState(900);

    const [status, setStatus] = useState('pending'); // 'pending', 'paid', 'expired'
    const [bookingDetails, setBookingDetails] = useState(null);

    // --- FUNCIÓN DE RASTREO DE PARAMETROS ---
    const getCalParam = (keys) => {
        for (const key of keys) {
            const val = searchParams.get(key);
            if (val) return val;
        }
        return '';
    };

    // Capturamos los datos DEL URL (Fallback/Initial)
    const initialBookingData = {
        uid: getCalParam(['uid', 'bookingUid', 'id']),
        date: getCalParam(['date', 'startTime', 'start']),
        type: getCalParam(['type', 'eventTypeSlug']),
        name: getCalParam(['name', 'attendeeName']),
        email: getCalParam(['email', 'attendeeEmail']),
        dni: getCalParam(['dni', 'responses[dni]', 'responses[DNI]', 'DNI']),
        phone: getCalParam(['phone', 'attendeePhoneNumber', 'responses[phone]', 'guests[0][phone]'])
    };

    // 1. TIMER VISUAL (UX Only - Backend valida expiration real)
    useEffect(() => {
        if (!initialBookingData.uid) return;

        const STORAGE_KEY = `booking_timer_${initialBookingData.uid}`;
        const LINK_DURATION = 900; // 15 minutos en segundos

        // Recuperar inicio o setear nuevo
        let startTime = localStorage.getItem(STORAGE_KEY);

        if (!startTime) {
            startTime = Date.now();
            localStorage.setItem(STORAGE_KEY, startTime);
        } else {
            startTime = parseInt(startTime, 10);
        }

        // Función de tick
        const tick = () => {
            const now = Date.now();
            const elapsedSeconds = Math.floor((now - startTime) / 1000);
            const remaining = LINK_DURATION - elapsedSeconds;

            if (remaining <= 0) {
                setTimeLeft(0);
                setStatus('expired'); // UX Expiration
            } else {
                setTimeLeft(remaining);
            }
        };

        tick(); // Primer tick inmediato
        const interval = setInterval(tick, 1000);

        return () => clearInterval(interval);
    }, [initialBookingData.uid]);


    // 2. FETCH DATOS & LINK (Prioridad Backend)
    useEffect(() => {
        console.log("🔍 URL Search Params:", searchParams.toString());

        const fetchPaymentLink = async () => {
            if (!initialBookingData.uid) {
                console.warn("⚠️ No se encontró UID.");
                setIsLoading(false);
                return;
            }

            try {
                // LLAMADA AL BACKEND
                const response = await fetch(API_BOOKING_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        uid: initialBookingData.uid
                    }),
                });

                if (!response.ok) {
                    const errData = await response.json().catch(() => ({}));
                    console.error("❌ Error backend:", errData);
                    throw new Error(errData.error || 'Error en backend');
                }

                const data = await response.json();
                console.log("🔥 RESPUESTA BACKEND:", data);

                // A. Verificar si ya está pagado
                if (data.status === 'paid' || data.paymentStatus === 'paid') {
                    setStatus('paid');
                    setIsLoading(false);
                    return;
                }

                // B. Verificar link de pago
                if (data.success && data.payment_link) {
                    setPaymentLink(data.payment_link);
                    // Si el backend devuelve info del booking, usarla en vez de URL params
                    if (data.booking) {
                        setBookingDetails(data.booking);
                    }
                } else {
                    console.error("❌ No se recibió payment_link válido", data);
                }

            } catch (err) {
                console.error("❌ Error fetch:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPaymentLink();
    }, []);

    // --- RENDER HELPERS ---

    // Usar datos del backend si existen, sino usar URL params
    const displayData = bookingDetails || initialBookingData;

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    // Formateo de fecha
    const displayDate = displayData.date
        ? new Date(displayData.date).toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }) + ' hs'
        : 'Fecha a confirmar';

    // Handler para redirigir
    const handlePayClick = () => {
        if (paymentLink && status !== 'expired') {
            window.location.href = paymentLink;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 relative font-sans flex items-center justify-center p-4 lg:p-8 overflow-hidden">
            {/* --- FONDO DISRUPTIVO (Strict Brand Purple) --- */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[90vw] h-[90vw] bg-violet-300/30 rounded-full blur-[120px] mix-blend-multiply" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] bg-purple-200/40 rounded-full blur-[100px] mix-blend-multiply" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative z-10 w-full max-w-5xl"
            >
                {/* --- UNIFIED MODAL CONTAINER --- */}
                <div className="bg-white/60 backdrop-blur-3xl border border-white/80 rounded-[2.5rem] shadow-[0_40px_100px_-10px_rgba(0,0,0,0.15)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[600px] ring-1 ring-white/50">

                    {/* --- LEFT SIDE: INFO & DETAILS --- */}
                    <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-between gap-10">

                        {/* HEADER SECTION */}
                        <div>
                            {status === 'paid' ? (
                                <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-6 border border-green-200 shadow-sm">
                                    <CheckCircle2 size={12} /> Pago Acreditado
                                </div>
                            ) : status === 'expired' ? (
                                <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-6 border border-red-200 shadow-sm">
                                    <AlertCircle size={12} /> Turno Expirado
                                </div>
                            ) : (
                                <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-6 border border-amber-100 shadow-sm">
                                    <Clock size={12} /> Esperando pago
                                </div>
                            )}

                            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tighter leading-tight mb-4 drop-shadow-sm">
                                {status === 'paid' ? (
                                    <>Tu reserva está <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">Confirmada</span>.</>
                                ) : status === 'expired' ? (
                                    <>Tu reserva ha <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-600">Expirado</span>.</>
                                ) : (
                                    <>Tu reserva está <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">Pendiente</span>.</>
                                )}
                            </h1>
                            <p className="text-slate-600 font-medium text-pretty leading-relaxed max-w-md">
                                {status === 'paid' ? (
                                    "Hemos recibido tu pago correctamente. Recibirás un correo con los detalles de tu turno."
                                ) : status === 'expired' ? (
                                    "El tiempo límite para realizar el pago ha finalizado. Por favor, vuelve a intentar reservar un turno."
                                ) : (
                                    <>Tienes <strong className="text-slate-900">15 minutos</strong> para realizar el pago.
                                        El turno se liberará automáticamente si no se confirma.</>
                                )}
                            </p>
                        </div>

                        {/* INFO GRID */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* BOX 1: Tratamiento */}
                            <div className="group p-5 rounded-2xl bg-white border border-slate-100 shadow-[0_2px_15px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <Sparkles size={16} />
                                    </div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tratamiento</p>
                                </div>
                                <p className="text-base font-bold text-slate-900 capitalize leading-tight">
                                    {displayData.type?.replace(/-/g, ' ') || 'Consulta General'}
                                </p>
                            </div>

                            {/* BOX 2: Fecha */}
                            <div className="group p-5 rounded-2xl bg-white border border-slate-100 shadow-[0_2px_15px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <CalendarCheck size={16} />
                                    </div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Fecha</p>
                                </div>
                                <p className="text-base font-bold text-slate-900 capitalize leading-tight">
                                    {displayDate}
                                </p>
                            </div>
                        </div>

                        {/* USER FOOTER */}
                        <div className="flex items-center gap-4 pt-2">
                            <div className="w-10 h-10 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center font-bold text-slate-600 text-sm">
                                {displayData.name ? displayData.name.charAt(0).toUpperCase() : <ShieldCheck size={18} />}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-900">{displayData.name || 'Paciente'}</p>
                                <p className="text-xs text-slate-400">{displayData.email || 'Email no disponible'}</p>
                            </div>
                        </div>
                    </div>

                    {/* --- RIGHT SIDE: ACTION AREA --- */}
                    <div className="lg:col-span-5 bg-slate-50/50 border-t lg:border-t-0 lg:border-l border-slate-200/60 p-8 lg:p-12 flex flex-col justify-center gap-8 relative">

                        {/* TIMER CARD */}
                        <div className={`bg-slate-900 text-white p-6 rounded-[1.5rem] shadow-2xl shadow-slate-900/20 relative overflow-hidden group border border-slate-800 transition-all duration-500 ${status === 'expired' ? 'grayscale opacity-70' : ''}`}>
                            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800" />
                            <div className="relative z-10 text-center">
                                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-2">
                                    {status === 'expired' ? 'TIEMPO AGOTADO' : 'El turno expira en'}
                                </p>
                                <div className="text-5xl font-black tracking-tighter tabular-nums text-white flex justify-center items-center gap-2">
                                    {formatTime(timeLeft)}
                                </div>
                                <div className="mt-4 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: "100%" }}
                                        animate={{ width: `${(timeLeft / 900) * 100}%` }}
                                        transition={{ ease: "linear", duration: 1 }}
                                        className={`h-full ${timeLeft < 180 ? 'bg-red-500' : 'bg-violet-500'}`}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* PRICE & PAY */}
                        <div className="text-center space-y-6">
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total a Pagar</p>
                                <div className={`text-4xl font-black text-slate-900 tracking-tighter drop-shadow-sm ${status === 'paid' ? 'text-green-600' : ''}`}>
                                    $15.000
                                </div>
                            </div>

                            <div className="relative">
                                {isLoading ? (
                                    <button disabled className="w-full py-4 bg-white border border-slate-200 rounded-xl flex items-center justify-center gap-3 text-slate-400 cursor-not-allowed shadow-sm">
                                        <Loader2 size={20} className="animate-spin text-slate-400" />
                                        <span className="font-bold text-sm">Verificando...</span>
                                    </button>
                                ) : status === 'paid' ? (
                                    <button disabled className="w-full py-4 bg-green-500 text-white rounded-xl flex items-center justify-center gap-2 font-bold text-lg shadow-lg cursor-default">
                                        <span>Pago Completado</span>
                                        <CheckCircle2 size={20} />
                                    </button>
                                ) : status === 'expired' ? (
                                    <button disabled className="w-full py-4 bg-slate-200 text-slate-400 rounded-xl flex items-center justify-center gap-2 font-bold text-lg cursor-not-allowed">
                                        <span>Link Vencido</span>
                                        <AlertCircle size={20} />
                                    </button>
                                ) : paymentLink ? (
                                    <a
                                        href={paymentLink}
                                        className="block w-full py-4 bg-[#009EE3] hover:bg-[#008ED0] text-white rounded-xl font-bold text-lg shadow-[0_10px_25px_-5px_rgba(0,158,227,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-center flex items-center justify-center gap-2"
                                    >
                                        <span>Pagar con Mercado Pago</span>
                                        <CreditCard size={20} />
                                    </a>
                                ) : (
                                    <div className="w-full py-4 bg-red-50 text-red-500 rounded-xl flex items-center justify-center text-sm font-bold border border-red-100 gap-2">
                                        <AlertCircle size={18} />
                                        <span>Error al cargar link</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-center items-center gap-2 text-[10px] text-slate-400 font-medium uppercase tracking-wide">
                                <ShieldCheck size={12} className="text-slate-300" />
                                Pago 100% Seguro
                            </div>
                        </div>

                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default CheckoutPage;