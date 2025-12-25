import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { X, Star, CheckCircle2, Calendar } from 'lucide-react';

const ReviewModal = ({ review, onClose }) => {

    // 1. CONTROL DE SCROLL
    useEffect(() => {
        if (review) {
            document.body.style.overflow = 'hidden';
            document.body.style.touchAction = 'none';
        }

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') handleClose();
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [review]);

    const handleClose = () => {
        document.body.style.overflow = '';
        document.body.style.touchAction = '';
        onClose();
    };

    if (!review) return null;

    const initialLetter = review.name.charAt(0).toUpperCase();

    return createPortal(
        <>
            {/* BACKDROP */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={handleClose}
                className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
                style={{ overscrollBehavior: 'contain' }}
            >

                {/* CARD MODAL */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 10 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 10 }}
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    onClick={(e) => e.stopPropagation()}
                    className="
            relative w-full 
            max-w-[480px] /* Un poco más angosto para buscar la forma cuadrada */
            min-h-[420px] /* Altura mínima: evita que se vea aplastado si hay poco texto */
            max-h-[85vh]  /* Tope para móviles */
            bg-white rounded-[2.5rem] 
            shadow-2xl shadow-black/20 
            overflow-hidden 
            border border-white/50
            flex flex-col justify-between /* Distribuye el contenido: Cabecera arriba, Fecha abajo */
          "
                >
                    {/* BOTÓN CERRAR */}
                    <button
                        onClick={handleClose}
                        className="absolute top-6 right-6 z-50 p-2 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors border border-slate-100"
                    >
                        <X size={20} />
                    </button>

                    {/* --- HEADER --- */}
                    <div className="pt-10 px-10 pb-2 shrink-0">
                        <div className="flex items-center gap-5">

                            {/* AVATAR */}
                            <div className="relative shrink-0">
                                <div
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-slate-200"
                                    style={{ backgroundColor: review.googleColor }}
                                >
                                    {initialLetter}
                                </div>
                                {/* LOGO GOOGLE */}
                                <div className="absolute -bottom-1.5 -right-1.5 bg-white p-1.5 rounded-full shadow-md border border-slate-100 flex items-center justify-center">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                </div>
                            </div>

                            {/* INFO */}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-bold text-slate-800 leading-tight truncate pr-8">
                                    {review.name}
                                </h3>

                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">
                                    <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={16}
                                                className={`${i < review.stars ? "text-amber-400 fill-amber-400" : "text-slate-200"} drop-shadow-sm`}
                                            />
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                                        <CheckCircle2 size={11} strokeWidth={3} />
                                        <span className="text-[10px] font-bold uppercase tracking-wide">Verificado</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- BODY (SCROLL) --- */}
                    {/* Padding generoso y alineación centrada visualmente */}
                    <div className="flex-1 overflow-y-auto px-10 py-6 custom-scrollbar overscroll-contain">
                        <p className="text-slate-600 text-[15px] leading-relaxed font-medium text-pretty">
                            {review.text}
                        </p>
                    </div>

                    {/* --- FOOTER --- */}
                    <div className="px-10 py-8 shrink-0">
                        <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase tracking-widest border-t border-slate-100 pt-6">
                            <Calendar size={16} className="text-violet-500" />
                            <span>{review.date}</span>
                        </div>
                    </div>

                </motion.div>
            </motion.div>
        </>,
        document.body
    );
};

export default ReviewModal;