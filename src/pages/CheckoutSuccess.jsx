import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    CheckCircle2,
    CalendarCheck,
    Home,
    ArrowRight,
    Sparkles,
    ShieldCheck,
    Mail
} from 'lucide-react';
import confetti from 'canvas-confetti';

const CheckoutSuccess = () => {
    const [searchParams] = useSearchParams();

    // Capturamos params que podrían venir de MercadoPago
    const paymentId = searchParams.get('payment_id');
    const status = searchParams.get('status');
    const externalReference = searchParams.get('external_reference');

    useEffect(() => {
        // Confetti effect on load
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 relative font-sans flex items-center justify-center p-4 lg:p-8 overflow-hidden">
            {/* --- FONDO DISRUPTIVO (Strict Brand Purple) --- */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[90vw] h-[90vw] bg-green-200/30 rounded-full blur-[120px] mix-blend-multiply" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] bg-emerald-100/40 rounded-full blur-[100px] mix-blend-multiply" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-full max-w-lg mx-auto"
            >
                <div className="bg-white/60 backdrop-blur-3xl border border-white/80 rounded-[2.5rem] shadow-[0_40px_100px_-10px_rgba(0,0,0,0.1)] p-6 md:p-8 lg:p-12 text-center overflow-visible ring-1 ring-white/50 relative">
                    {/* Decorative Blur */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-green-400/10 rounded-full blur-[80px] pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-center gap-6 md:gap-8">

                        {/* ICON HERO */}
                        <div className="relative mb-2">
                            <div className="absolute inset-0 bg-green-200 rounded-full blur-2xl opacity-60 animate-pulse" />
                            <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-[0_20px_40px_-10px_rgba(16,185,129,0.3)] border-2 border-white flex items-center justify-center relative z-10 transform -rotate-3">
                                <CheckCircle2 size={40} className="text-white drop-shadow-md md:w-12 md:h-12" />
                            </div>
                            <div className="absolute -top-3 -right-5 md:-top-2 md:-right-4 bg-white px-3 py-1.5 md:py-1 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-slate-100 transform rotate-6 z-20">
                                <span className="text-xs md:text-sm font-bold text-green-600 whitespace-nowrap">¡Listo!</span>
                            </div>
                        </div>

                        {/* TEXT CONTENT */}
                        <div className="space-y-3 md:space-y-4">
                            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter leading-tight">
                                ¡Pago Exitoso!
                            </h1>
                            <p className="text-sm md:text-base text-slate-600 font-medium text-pretty leading-relaxed px-2">
                                Tu turno ha sido confirmado correctamente. Te enviamos un correo electrónico con todos los detalles.
                            </p>
                        </div>

                        {/* INFO BOX */}
                        <div className="w-full bg-white/50 border border-white rounded-2xl p-4 md:p-6 shadow-sm flex flex-col gap-3">
                            <div className="flex items-center gap-3 text-slate-700">
                                <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0">
                                    <Sparkles size={16} />
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] uppercase font-bold text-slate-400">Estado</p>
                                    <p className="text-sm font-bold">Confirmado</p>
                                </div>
                            </div>
                            {paymentId && (
                                <div className="flex items-center gap-3 text-slate-700 border-t border-slate-100 pt-3">
                                    <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-500 flex items-center justify-center flex-shrink-0">
                                        <ShieldCheck size={16} />
                                    </div>
                                    <div className="text-left overflow-hidden w-full">
                                        <p className="text-[10px] uppercase font-bold text-slate-400">ID de Pago</p>
                                        <p className="text-sm font-bold font-mono text-slate-500 truncate">#{paymentId}</p>
                                    </div>
                                </div>
                            )}
                            <div className="flex items-center gap-3 text-slate-700 border-t border-slate-100 pt-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center flex-shrink-0">
                                    <Mail size={16} />
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] uppercase font-bold text-slate-400">Revisá tu correo</p>
                                    <p className="text-sm font-bold text-slate-600">Enviamos el comprobante</p>
                                </div>
                            </div>
                        </div>

                        {/* ACTIONS */}
                        <div className="flex flex-col w-full gap-3 pt-4">
                            <Link to="/" className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group">
                                <span>Volver al Inicio</span>
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default CheckoutSuccess;
