import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ShieldCheck, Clock, CreditCard, AlertCircle, CheckCircle2 } from 'lucide-react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

// INICIALIZAR MP (Usar tu PUBLIC KEY)
initMercadoPago('TU_PUBLIC_KEY_DE_MERCADO_PAGO');

const CheckoutPage = () => {
    const [params] = useSearchParams();
    const [preferenceId, setPreferenceId] = useState(null);
    const [loading, setLoading] = useState(true);

    // Datos que vienen de Cal.com
    const date = new Date(params.get('date'));
    const type = params.get('type'); // ej: 'toxina-tercio-superior'
    const name = params.get('name');

    // Lógica de cuenta regresiva (15 min)
    const [timeLeft, setTimeLeft] = useState(900); // 15 min en segundos

    useEffect(() => {
        // 1. Simular (o conectar con backend) la creación de la preferencia de pago
        // En producción: fetch('https://tu-n8n-o-backend.com/crear-preferencia', { method: 'POST', body: ... })

        const createPreference = async () => {
            try {
                // AQUÍ LLAMARÍAS A TU BACKEND (n8n o Node) PARA OBTENER EL ID DE PREFERENCIA
                // Por ahora simulamos un delay
                setTimeout(() => {
                    setPreferenceId("ID_DE_PRUEBA_MP"); // Reemplazar con ID real del backend
                    setLoading(false);
                }, 1500);
            } catch (error) {
                console.error(error);
            }
        };

        createPreference();

        // Timer
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">

                {/* Header de "Reserva Pendiente" */}
                <div className="bg-amber-50 border-b border-amber-100 p-6 text-center">
                    <div className="mx-auto w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-3">
                        <Clock className="text-amber-600" size={24} />
                    </div>
                    <h2 className="text-xl font-bold text-amber-800">Reserva Pendiente</h2>
                    <p className="text-amber-600 text-sm mt-1">
                        Tenés <span className="font-bold">{formatTime(timeLeft)}</span> minutos para confirmar.
                    </p>
                </div>

                <div className="p-8">
                    {/* Resumen del Turno */}
                    <div className="space-y-4 mb-8">
                        <div className="flex items-start gap-4">
                            <div className="bg-slate-50 p-3 rounded-xl">
                                <CheckCircle2 className="text-violet-600" size={24} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tratamiento</p>
                                <p className="font-semibold text-slate-800 capitalize">{type?.replace(/-/g, ' ')}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-slate-50 p-3 rounded-xl">
                                <Clock className="text-violet-600" size={24} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fecha y Hora</p>
                                <p className="font-semibold text-slate-800">
                                    {date.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}
                                    <br />
                                    <span className="text-violet-600">{date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })} hs</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Total a Pagar */}
                    <div className="bg-slate-50 rounded-2xl p-4 mb-6 flex justify-between items-center border border-slate-100">
                        <span className="text-slate-500 font-medium">Seña de confirmación</span>
                        <span className="text-xl font-bold text-slate-900">$15.000</span>
                    </div>

                    {/* Botón Mercado Pago */}
                    {loading ? (
                        <button disabled className="w-full py-4 bg-slate-100 text-slate-400 rounded-xl font-bold animate-pulse">
                            Generando link de pago...
                        </button>
                    ) : (
                        <div className="custom-mp-button-container">
                            {/* Opción A: Botón Wallet Nativo (Requiere Backend) */}
                            {/* <Wallet initialization={{ preferenceId: preferenceId }} /> */}

                            {/* Opción B (MVP Rápido sin Backend complejo): Link directo */}
                            <a
                                href="LINK_DE_MERCADO_PAGO_GENERICO" // Pedro puede generar links fijos por tipo de tratamiento en MP
                                className="block w-full py-4 bg-[#009EE3] hover:bg-[#008ED0] text-white text-center font-bold rounded-xl transition-all shadow-lg shadow-blue-200"
                            >
                                Pagar con Mercado Pago
                            </a>
                        </div>
                    )}

                    <p className="mt-6 text-xs text-center text-slate-400 flex items-center justify-center gap-1">
                        <ShieldCheck size={12} /> Pagos procesados de forma segura por Mercado Pago
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;