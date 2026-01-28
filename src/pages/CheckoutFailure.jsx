import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    XCircle,
    AlertTriangle,
    RotateCcw,
    ShieldAlert
} from 'lucide-react';

const CheckoutFailure = () => {
    const [searchParams] = useSearchParams();

    // Capturamos params de error de MercadoPago o internos
    // status=null ?? 
    const externalReference = searchParams.get('external_reference');

    return (
        <div className="min-h-screen bg-slate-50 relative font-sans flex items-center justify-center p-4 lg:p-8 overflow-hidden">
            {/* --- FONDO DISRUPTIVO (Red Tones for Error) --- */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[90vw] h-[90vw] bg-red-200/30 rounded-full blur-[120px] mix-blend-multiply" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] bg-orange-100/40 rounded-full blur-[100px] mix-blend-multiply" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-full max-w-lg mx-auto"
            >
                <div className="bg-white/60 backdrop-blur-3xl border border-white/80 rounded-[2.5rem] shadow-[0_40px_100px_-10px_rgba(0,0,0,0.1)] p-6 md:p-8 lg:p-12 text-center overflow-visible ring-1 ring-white/50 relative">
                    {/* Decorative Blur */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-red-400/10 rounded-full blur-[80px] pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-center gap-6 md:gap-8">

                        {/* ICON HERO */}
                        <div className="relative mb-2">
                            <div className="absolute inset-0 bg-red-200 rounded-full blur-2xl opacity-60 animate-pulse" />
                            <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl shadow-[0_20px_40px_-10px_rgba(239,68,68,0.3)] border-2 border-white flex items-center justify-center relative z-10 transform rotate-3">
                                <XCircle size={40} className="text-white drop-shadow-md md:w-12 md:h-12" />
                            </div>
                        </div>

                        {/* TEXT CONTENT */}
                        <div className="space-y-3 md:space-y-4">
                            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter leading-tight">
                                Hubo un problema
                            </h1>
                            <p className="text-sm md:text-base text-slate-600 font-medium text-pretty leading-relaxed px-2">
                                No pudimos procesar tu pago. Esto puede deberse a un error con la tarjeta o fondos insuficientes.
                            </p>
                        </div>

                        {/* INFO BOX */}
                        <div className="w-full bg-red-50/50 border border-red-100 rounded-2xl p-4 md:p-6 shadow-sm flex flex-col gap-3">
                            <div className="flex items-center gap-3 text-red-700">
                                <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
                                    <AlertTriangle size={16} />
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] uppercase font-bold text-red-400">Estado</p>
                                    <p className="text-sm font-bold">Pago rechazado</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-slate-700 border-t border-red-200/50 pt-3">
                                <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-500 flex items-center justify-center flex-shrink-0">
                                    <ShieldAlert size={16} />
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] uppercase font-bold text-slate-400">Sugerencia</p>
                                    <p className="text-sm font-bold text-slate-600">Probá con otro medio de pago</p>
                                </div>
                            </div>
                        </div>

                        {/* ACTIONS */}
                        <div className="flex flex-col w-full gap-3 pt-4">
                            <Link to="/" className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group">
                                <span>Volver al Inicio</span>
                                <RotateCcw size={18} className="group-hover:-rotate-180 transition-transform duration-500" />
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default CheckoutFailure;
