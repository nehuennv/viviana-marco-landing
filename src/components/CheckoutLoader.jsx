import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CheckoutLoader = ({ isLoading }) => {
    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    {/* Fondo decorativo estático (igual que SplashScreen original) */}
                    <div className="absolute w-[80vw] h-[80vw] md:w-[500px] md:h-[500px] bg-purple-100/50 rounded-full blur-[60px] md:blur-[100px] -z-10 pointer-events-none" />

                    {/* CONTENIDO CENTRADO */}
                    <motion.div
                        className="flex flex-col items-center justify-center relative z-10"
                        exit={{ y: -50, opacity: 0 }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    >

                        {/* SPINNER DE CARGA (Reemplazando la sonrisa) */}
                        <div className="relative mb-8">
                            {/* Anillo de fondo */}
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-purple-100"></div>

                            {/* Anillo giratorio */}
                            <motion.div
                                className="absolute top-0 left-0 w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-t-purple-600 border-r-transparent border-b-transparent border-l-transparent"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                        </div>

                        {/* TEXTO */}
                        <div className="text-center space-y-2">
                            <motion.h2
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                                className="text-lg md:text-2xl font-bold tracking-tight text-slate-800"
                            >
                                Preparando tu reserva...
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 1 }}
                                className="text-[10px] md:text-xs text-slate-400 font-medium uppercase tracking-[0.2em]"
                            >
                                Por favor, aguarda un momento
                            </motion.p>
                        </div>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CheckoutLoader;
