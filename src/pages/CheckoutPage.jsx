import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import {
    ShieldCheck,
    Clock,
    CalendarCheck,
    Loader2,
    AlertCircle,
    ArrowRight,
    CheckCircle2,
    Phone,
    User
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

    // --- FUNCIÓN DE RASTREO DE PARAMETROS ---
    const getCalParam = (keys) => {
        for (const key of keys) {
            const val = searchParams.get(key);
            if (val) return val;
        }
        return '';
    };

    // Capturamos los datos
    const bookingData = {
        uid: getCalParam(['uid', 'bookingUid', 'id']),
        date: getCalParam(['date', 'startTime', 'start']),
        type: getCalParam(['type', 'eventTypeSlug']),
        name: getCalParam(['name', 'attendeeName']),
        email: getCalParam(['email', 'attendeeEmail']),
        dni: getCalParam(['dni', 'responses[dni]', 'responses[DNI]', 'DNI']),
        phone: getCalParam(['phone', 'attendeePhoneNumber', 'responses[phone]', 'guests[0][phone]'])
    };

    useEffect(() => {
        console.log("🔍 URL Search Params:", searchParams.toString());
        console.log("✅ DATOS CAPTURADOS:", bookingData);

        const fetchPaymentLink = async () => {
            if (!bookingData.uid) {
                console.warn("⚠️ No se encontró UID, no se puede iniciar pago.");
                setIsLoading(false);
                return;
            }

            try {
                // LLAMADA AL NUEVO BACKEND (Solo UID según doc)
                const response = await fetch(API_BOOKING_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        uid: bookingData.uid
                    }),
                });

                if (!response.ok) {
                    const errData = await response.json().catch(() => ({}));
                    console.error("❌ Error backend:", errData);
                    throw new Error(errData.error || 'Error en backend');
                }

                const data = await response.json();
                console.log("🔥 RESPUESTA BACKEND:", data);

                // Según documentación: { success: true, payment_link: "...", ... }
                if (data.success && data.payment_link) {
                    setPaymentLink(data.payment_link);
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

        const timer = setInterval(() => setTimeLeft((p) => (p > 0 ? p - 1 : 0)), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    // Formateo de fecha
    const displayDate = bookingData.date
        ? new Date(bookingData.date).toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }) + ' hs'
        : 'Fecha a confirmar';

    // Handler para redirigir
    const handlePayClick = () => {
        if (paymentLink) {
            window.location.href = paymentLink;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 relative font-sans selection:bg-violet-100 selection:text-violet-900 flex items-center justify-center p-4">

            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[90vw] h-[90vw] bg-violet-200/40 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] bg-purple-100/50 rounded-full blur-[100px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl border border-white/50 overflow-hidden"
            >
                <div className="bg-gradient-to-r from-violet-600 to-purple-600 p-6 text-white text-center">
                    <div className="flex flex-col items-center gap-2">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-white/10">
                            <Clock size={14} /> Reserva en proceso
                        </div>
                        <div className="text-4xl font-black tracking-tighter tabular-nums">
                            {formatTime(timeLeft)}
                        </div>
                    </div>
                </div>

                <div className="p-8">
                    <div className="mb-6 pb-6 border-b border-slate-100">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Paciente</h3>
                            {bookingData.dni && (
                                <span className="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-500 font-mono">
                                    DNI: {bookingData.dni}
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                <User size={20} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-800">{bookingData.name}</p>
                                <p className="text-xs text-slate-500">{bookingData.email}</p>
                                {bookingData.phone && <p className="text-xs text-slate-500 mt-0.5">{bookingData.phone}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 mb-8">
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-violet-50/50 border border-violet-100">
                            <CheckCircle2 className="text-violet-600" size={18} />
                            <div>
                                <p className="text-[10px] font-bold text-violet-400 uppercase">Tratamiento</p>
                                <p className="text-xs font-bold text-violet-900 capitalize">
                                    {bookingData.type?.replace(/-/g, ' ')}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-violet-50/50 border border-violet-100">
                            <CalendarCheck className="text-violet-600" size={18} />
                            <div>
                                <p className="text-[10px] font-bold text-violet-400 uppercase">Fecha</p>
                                <p className="text-xs font-bold text-violet-900">{displayDate}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-end mb-6">
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Total a pagar</p>
                        </div>
                        <div className="text-3xl font-black text-slate-900 tracking-tight">
                            $15.000
                        </div>
                    </div>

                    <div className="min-h-[50px]">
                        {isLoading ? (
                            <div className="w-full py-3 bg-slate-100 rounded-xl flex items-center justify-center gap-2 text-slate-400 animate-pulse">
                                <Loader2 size={18} className="animate-spin" />
                                <span className="text-xs font-bold uppercase">Generando link de pago...</span>
                            </div>
                        ) : paymentLink ? (
                            <button
                                onClick={handlePayClick}
                                className="w-full py-4 bg-[#009EE3] hover:bg-[#008ED0] text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-200 transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <span>Pagar ahora en Mercado Pago</span>
                                <ArrowRight size={18} />
                            </button>
                        ) : (
                            <div className="w-full py-3 bg-red-50 text-red-500 rounded-xl flex items-center justify-center text-xs font-bold border border-red-100">
                                <AlertCircle size={16} className="mr-2" />
                                Error al generar link. Intenta refrescar.
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default CheckoutPage;