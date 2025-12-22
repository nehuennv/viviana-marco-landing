import React, { useState, useRef } from 'react';
import { Smile, Sparkles, Syringe, Moon, Zap, User, ArrowUpRight, Sparkle, Activity, ScanFace } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ServiceModal from '../components/ServiceModal';

// --- IMPORTACIÓN DE IMÁGENES ---
// Asegúrate de que estas imágenes existan en tu carpeta src/assets/tratamientos/
import imgBotox from '../assets/tratamientos/botox-full-face.webp';
import imgHialuronico from '../assets/tratamientos/hialuronico.webp';
import imgMeso from '../assets/tratamientos/mesoterapia.webp';
import imgBio from '../assets/tratamientos/bioestimulacion.webp';
import imgBruxismo from '../assets/tratamientos/bruxismo.webp';
import imgAlineadores from '../assets/tratamientos/alineadores.webp';
import imgBrackets from '../assets/tratamientos/brackets-damon.webp';
import imgPlaca from '../assets/tratamientos/placa.webp';

// --- DATA ---
const facialAesthetics = [
  {
    id: 'f1',
    category: "Rejuvenecimiento",
    title: "Botox Full Face",
    desc: "Relaja músculos del tercio superior para suavizar expresiones.",
    longDesc: "El tratamiento ideal para suavizar la expresión. Aplicamos toxina botulínica en tercio superior para relajar la musculatura, eliminando arrugas de frente, entrecejo y patas de gallo sin perder naturalidad.",
    steps: ["Evaluación mímica", "Diseño de puntos", "Aplicación (10 min)", "Control 15 días"],
    image: imgBotox, // <--- Usamos la variable importada
    icon: <Syringe size={24} />,
  },
  {
    id: 'f2',
    category: "Voluminización",
    title: "Labios & Hialurónico",
    desc: "Perfilado e hidratación labial con ácido hialurónico premium.",
    longDesc: "Utilizamos ácido hialurónico para perfilar, hidratar y dar volumen sutil a los labios. También realizamos rinomodelación y relleno de pómulos/mentón para armonizar el perfil.",
    steps: ["Anestesia tópica", "Diseño anatómico", "Aplicación", "Resultados inmediatos"],
    image: imgHialuronico,
    icon: <User size={24} />,
  },
  {
    id: 'f3',
    category: "Piel & Glow",
    title: "Mesoterapia",
    desc: "Cóctel nutritivo NCTF para revitalizar y dar luminosidad.",
    longDesc: "Microinyecciones de un complejo nutritivo que revitaliza la piel apagada, mejora poros dilatados y aporta una luminosidad inigualable ('Glow Effect').",
    steps: ["Limpieza profunda", "Aplicación Meso", "Máscara descongestiva", "Piel radiante"],
    image: imgMeso,
    icon: <Sparkles size={24} />,
  },
  {
    id: 'f4',
    category: "Tracción",
    title: "Bioestimulación",
    desc: "Generación de colágeno propio para combatir la flacidez.",
    longDesc: "Utilizamos bioestimuladores (Radiesse/Sculptra) que estimulan a tu cuerpo a producir colágeno. Tratamiento #1 para combatir la flacidez facial a largo plazo.",
    steps: ["Vectores de tensión", "Aplicación cánula", "Estimulación progresiva", "Pico efecto 3 meses"],
    image: imgBio,
    icon: <Activity size={24} />,
  },
  {
    id: 'f5',
    category: "Terapéutico",
    title: "Bruxismo",
    desc: "Relajación de maseteros para reducir mordida y afinar rostro.",
    longDesc: "Tratamiento médico-estético. Reducimos la fuerza de la mordida involuntaria, protegiendo tus dientes del desgaste y afinando visualmente el rostro.",
    steps: ["Palpación muscular", "Aplicación", "Alivio de tensión", "Protección dental"],
    image: imgBruxismo,
    icon: <ScanFace size={24} />,
  }
];

const orthodontics = [
  {
    id: 'o1',
    category: "Invisible",
    title: "Alineadores",
    desc: "Ortodoncia sin brackets. Placas transparentes y removibles.",
    longDesc: "La opción premium. Placas transparentes que cambias cada semana. Nadie notará que los llevas puestos. Comé lo que quieras y cepillate sin obstáculos.",
    steps: ["Escaneo 3D", "Planificación digital", "Entrega de set", "Controles"],
    image: imgAlineadores,
    icon: <Smile size={24} />,
  },
  {
    id: 'o2',
    category: "Autoligado",
    title: "Brackets Damon",
    desc: "Sistema de baja fricción. Más rápidos y con menos molestias.",
    longDesc: "Tecnología de autoligado. No llevan 'gomitas', lo que permite que el diente se mueva más rápido y con menos dolor. Ideales para casos complejos.",
    steps: ["Cementado preciso", "Arcos termoactivos", "Menos visitas", "Sonrisa amplia"],
    image: imgBrackets,
    icon: <Zap size={24} />,
  },
  {
    id: 'o3',
    category: "Descanso",
    title: "Placas Ronquidos",
    desc: "Dispositivos de avance mandibular para mejorar el sueño.",
    longDesc: "Dispositivo que libera la vía aérea durante la noche. Es pequeño, cómodo y cambia la vida del paciente (y su pareja) al reducir ronquidos.",
    steps: ["Diagnóstico sueño", "Toma de registros", "Confección", "Descanso reparador"],
    image: imgPlaca,
    icon: <Moon size={24} />,
  }
];

const badgeClass = "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 border border-slate-200 backdrop-blur-md text-slate-600 text-xs font-bold uppercase tracking-widest shadow-sm mb-6";

// --- LIQUID SWITCH ---
const LiquidSwitch = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'facial', label: 'Rostro', icon: <Sparkles size={16} /> },
    { id: 'ortho', label: 'Sonrisa', icon: <Smile size={16} /> }
  ];

  return (
    <div className="inline-flex bg-white/50 backdrop-blur-md p-1.5 rounded-full border border-slate-200 shadow-sm relative">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              outline-none focus:outline-none
              relative z-10 flex items-center gap-2 px-6 md:px-8 py-3 rounded-full text-sm font-semibold transition-colors duration-200
              ${isActive ? 'text-white' : 'text-slate-500 hover:text-violet-600'}
            `}
          >
            {isActive && (
              <motion.div
                layoutId="active-pill-services" 
                className="absolute inset-0 bg-violet-600 rounded-full shadow-md z-10"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-20 flex items-center gap-2">
              {tab.icon} {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

// --- SERVICE CARD ---
const ServiceCard = ({ service, onClick, isCenter }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ 
      opacity: 1,
      scale: isCenter ? 1 : 0.9,
    }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="min-w-[280px] w-[280px] md:min-w-0 md:w-[350px] snap-center h-full flex-shrink-0 md:!scale-100 md:!opacity-100"
  >
    <div
      onClick={() => onClick(service)}
      className="group relative cursor-pointer rounded-[2rem] p-6 md:p-8 h-full flex flex-col overflow-hidden
                 bg-gradient-to-br from-white via-violet-50/30 to-purple-50/20
                 md:bg-white
                 border border-violet-200/60 md:border-slate-200 
                 hover:bg-white hover:border-violet-200 hover:shadow-2xl hover:shadow-violet-500/20
                 transition-colors duration-300 shadow-md md:shadow-sm active:scale-[0.98] transition-transform"

    >
      {/* SHIMMER EFFECT */}
      <div className="absolute inset-0 -translate-x-[150%] skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1s_ease-in-out]" />

      <div className="flex flex-col items-center mb-6 relative z-10">
        <div className="relative w-14 h-14 md:w-16 md:h-16 mb-3 md:mb-4 rounded-2xl flex items-center justify-center 
                        text-violet-600 
                        md:text-violet-500 
                        shadow-sm 
                        transition-all duration-500 ease-in-out
                        md:group-hover:text-white md:group-hover:scale-110 md:group-hover:rotate-6 md:group-hover:shadow-lg md:group-hover:shadow-violet-500/30
                        before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-violet-100 before:to-purple-100 before:border before:border-violet-200/50
                        md:before:bg-violet-50 md:before:border-violet-100
                        after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-br after:from-violet-600 after:to-violet-700 after:opacity-0 after:transition-opacity after:duration-500 after:ease-in-out
                        md:group-hover:after:opacity-100
                        ">
          <span className="relative z-10">{service.icon}</span>
        </div>
        <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest 
                       text-violet-700 bg-violet-100 border border-violet-200/50
                       md:text-violet-600 md:bg-violet-50 md:border-violet-100
                       md:group-hover:text-violet-700 md:group-hover:bg-violet-100 md:group-hover:border-violet-200
                       transition-all duration-500 ease-in-out px-3 py-1 rounded-full">
          {service.category}
        </span>
      </div>

      <div className="text-center flex-grow relative z-10">
        <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2 md:mb-3 md:group-hover:text-slate-900 transition-colors duration-500 ease-in-out">
          {service.title}
        </h3>
        <p className="text-slate-500 text-xs md:text-sm leading-relaxed text-pretty">
          {service.desc}
        </p>
      </div>

      <div className="mt-6 md:mt-8 pt-5 md:pt-6 border-t border-slate-200/50 flex justify-center opacity-80 group-hover:opacity-100 transition-opacity relative z-10">
        <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-violet-600 transition-colors bg-slate-50 px-4 py-2 rounded-full group-hover:bg-violet-50">
          <span>Ver Detalles</span>
          <ArrowUpRight size={12} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </div>
      </div>
    </div>
  </motion.div>
);

const Services = ({ onTreatmentSelect = () => {} }) => {
  const [selectedService, setSelectedService] = useState(null);
  const [activeTab, setActiveTab] = useState('facial'); 

  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const displayServices = activeTab === 'facial' ? facialAesthetics : orthodontics;

  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollLeft = container.scrollLeft;
      const containerCenter = scrollLeft + (container.offsetWidth / 2);
      
      let closestIndex = 0;
      let closestDistance = Infinity;
      
      Array.from(container.children).forEach((child, index) => {
        if (index >= displayServices.length) return;
        const cardCenter = child.offsetLeft + (child.offsetWidth / 2);
        const distance = Math.abs(containerCenter - cardCenter);
        
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });
      
      setActiveIndex(closestIndex);
    }
  };

  const handleCardClick = (service) => {
    setSelectedService(service);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  const handleSelectTreatment = () => {
    if (selectedService && onTreatmentSelect) {
      onTreatmentSelect(selectedService.title);
    }
    handleCloseModal();
  };

  return (
    <section id="services" className="relative py-12 md:py-24 overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-200/20 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-0 md:px-6 relative z-10">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-12 px-6">
          <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className={badgeClass}
          >
            <div className="bg-primary/10 p-1 rounded-full text-primary">
              <Sparkle size={12} fill="currentColor" />
            </div>
            <span>Nuestros Servicios</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Estética & <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-400">Salud Integral.</span>
          </h2>
          
          <p className="text-[15px] md:text-lg text-slate-500 font-light max-w-2xl mx-auto leading-7 md:leading-relaxed mb-10">
            Descubrí la fusión perfecta entre tecnología digital y calidez humana.
          </p>

          <div className="flex justify-center">
             <LiquidSwitch activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </div>

        {/* --- CONTENIDO --- */}
        <div>
          <AnimatePresence mode="wait">
             <motion.div 
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                
                ref={scrollRef}
                onScroll={handleScroll} 
                
                className="
                  flex 
                  md:flex-wrap md:justify-center 
                  gap-4 md:gap-6
                  overflow-x-auto snap-x snap-mandatory 
                  pl-[calc((100vw-280px)/2)] pr-[calc((100vw-280px)/2)]
                  md:px-6 pb-8 md:pb-0 
                  hide-scrollbar
                "
              >
                {displayServices.map((service, idx) => (
                   <ServiceCard 
                     key={service.id} 
                     service={service} 
                     onClick={() => handleCardClick(service)}
                     isCenter={idx === activeIndex}
                   />
                ))}
                
                <div className="w-1 md:hidden flex-shrink-0" />
             </motion.div>
          </AnimatePresence>
        </div>

        {/* --- DOTS INDICATORS --- */}
        <div className="flex md:hidden justify-center gap-2 mt-1 ">
          {displayServices.map((_, idx) => (
            <motion.div 
              key={idx}
              animate={{ 
                width: activeIndex === idx ? 24 : 8,
                backgroundColor: activeIndex === idx ? "#7c3aed" : "#cbd5e1",
                opacity: activeIndex === idx ? 1 : 0.5
              }}
              className="h-2 rounded-full"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          ))}
        </div>

      </div>

      {selectedService && (
        <ServiceModal 
          service={selectedService} 
          onClose={handleCloseModal} 
          onSelect={handleSelectTreatment}
        />
      )}

    </section>
  );
};

export default Services;