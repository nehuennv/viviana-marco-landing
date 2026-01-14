import React, { useState, useEffect } from 'react';
// CORRECCIÓN: Agregada 'Sparkle' a los imports que faltaba
import { Smile, Sparkles, Syringe, Moon, Zap, User, ArrowUpRight, Activity, ScanFace, Sparkle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ServiceModal from '../components/ServiceModal';

// Helper para imágenes locales
const getPath = (img) => `${import.meta.env.BASE_URL}assets/tratamientos/${img}`;

// --- DATA ---
const facialAesthetics = [
  {
    id: 'f1',
    category: "Rejuvenecimiento",
    title: "Botox",
    desc: "Relaja los músculos faciales, suavizando las líneas de expresión.",
    longDesc: "El tratamiento ideal y seguro para suavizar la expresión. Aplicamos toxina botulínica para relajar la musculatura, eliminando arrugas de frente, entrecejo y patas de gallo sin perder naturalidad.",
    steps: ["Evaluación mímica", "Diseño de puntos", "Aplicación (10 min)", "Control 15 días"],
    image: getPath('tratamiento-toxina-botulinica-full-face.webp'),
    icon: <Syringe size={24} />,
  },
  {
    id: 'f2',
    category: "Voluminización",
    title: "Labios & Hialurónico",
    desc: "Perfilado e hidratación labial con ácido hialurónico premium.",
    longDesc: "Utilizamos ácido hialurónico para perfilar, hidratar y dar volumen sutil a los labios. También realizamos relleno de pómulos/mentón para armonizar el perfil.",
    steps: ["Anestesia tópica", "Diseño anatómico", "Aplicación", "Resultados inmediatos"],
    image: getPath('tratamiento-relleno-labios-acido-hialuronico.webp'),
    icon: <User size={24} />,
  },
  {
    id: 'f3',
    category: "Piel & Glow",
    title: "Mesoterapia",
    desc: "Mesoterapia francesa, coreana y exosomas para revitalizar y dar luminosidad.",
    longDesc: "Tratamiento con activos nutritivos que revitaliza la piel apagada, mejora la apariencia de los poros y aporta una luminosidad natural e inmediata  ('Glow Effect').",
    steps: ["Limpieza profunda", "Aplicación Meso", "Máscara descongestiva", "Piel radiante"],
    image: getPath('tratamiento-mesoterapia-facial-glow.webp'),
    icon: <Sparkles size={24} />,
  },
  {
    id: 'f4',
    category: "Tracción",
    title: "Bioestimulación",
    desc: "Generación de colágeno y elastina propio para combatir la flacidez.",
    longDesc: "Utilizamos bioestimuladores (Radiesse/Sculptra) que estimulan a tu cuerpo a producir nuevo colágeno y elastina. Tratamiento #1 para combatir la flacidez facial a largo plazo.",
    steps: ["Vectores de tensión", "Aplicación con cánula", "Estimulación progresiva", "Pico efecto 3 meses"],
    image: getPath('tratamiento-bioestimulacion-colageno.webp'),
    icon: <Activity size={24} />,
  },
  {
    id: 'f5',
    category: "Terapéutico",
    title: "Bruxismo",
    desc: "Relajación de maseteros para reducir el apretamiento y afinar rostro.",
    longDesc: "Tratamiento médico-estético. Reducimos la fuerza de la mordida involuntaria, protegiendo tus dientes del desgaste, mejorando dolores cervicales y de cabeza y afinando visualmente el rostro.",
    steps: ["Palpación muscular", "Aplicación", "Alivio de tensión", "Protección dental"],
    image: getPath('tratamiento-bruxismo-relajacion-maseteros.webp'),
    icon: <ScanFace size={24} />,
  }
];

const orthodontics = [
  {
    id: 'o1',
    category: "Invisible",
    title: "Alineadores",
    desc: "Ortodoncia invisible. Placas transparentes y removibles.",
    longDesc: "La opción premium. Placas transparentes que cambias cada 15 días. Nadie notará que los llevas puestos. Comé lo que quieras y cepillate sin obstáculos.",
    steps: ["Escaneo 3D", "Planificación digital", "Entrega de set", "Controles"],
    image: getPath('tratamiento-ortodoncia-invisible-alineadores.webp'),
    icon: <Smile size={24} />,
  },
  {
    id: 'o2',
    category: "Autoligado",
    title: "Brackets Damon",
    desc: "Sistema de baja fricción. Más rápidos y con menos molestias.",
    longDesc: "Tecnología de autoligado. No llevan 'gomitas', lo que permite que el diente se mueva más rápido y con menos dolor. Ideales para casos complejos.",
    steps: ["Cementado preciso", "Arcos termoactivos", "Menos visitas", "Sonrisa amplia"],
    image: getPath('tratamiento-ortodoncia-brackets-damon.webp'),
    icon: <Zap size={24} />,
  },
  {
    id: 'o3',
    category: "Descanso",
    title: "Placas Ronquidos",
    desc: "Dispositivos de avance mandibular para mejorar calidad de sueño.",
    longDesc: "Dispositivo que libera la vía aérea durante la noche. Es pequeño, cómodo y cambia la vida del paciente (y su pareja) al reducir ronquidos y apneas.",
    steps: ["Diagnóstico sueño", "Toma de registros", "Confección", "Descanso reparador"],
    image: getPath('tratamiento-dispositivo-anti-ronquidos.webp'),
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
    <div
      className="inline-flex bg-white/50 backdrop-blur-md p-1.5 rounded-full border border-slate-100/50 shadow-sm relative"
      data-aos="fade-up"
      data-aos-delay="200"
    >
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
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{
      opacity: 1,
      scale: isCenter ? 1 : 0.9,
    }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="min-w-[280px] w-[280px] md:min-w-0 md:w-[350px] snap-center h-full flex-shrink-0 md:!scale-100 md:!opacity-100"
  >

    <div
      onClick={() => onClick(service)}
      className="
          group relative cursor-pointer rounded-[2rem] p-6 md:p-8 h-full flex flex-col overflow-hidden
          
          /* ESTILOS BASE (Mobile) */
          bg-gradient-to-br from-white via-violet-50/30 to-purple-50/20
          border border-violet-200/60 
          shadow-none
          
          /* ESTILOS DESKTOP (md:) */
          md:bg-white
          md:border-slate-200 
          md:shadow-sm
          
          /* HOVER (Unificado y Sutil) */
          transition-all duration-300 ease-out
          active:scale-[0.98]
          md:hover:bg-white 
          md:hover:border-violet-200 
          md:hover:shadow-xl md:hover:shadow-violet-500/10 
          md:hover:-translate-y-1 
          /* Nota: Quité 'scale-[1.02]' para que sea igual a reviews */
        "
    >
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

const Services = ({ onTreatmentSelect = () => { } }) => {
  const [selectedService, setSelectedService] = useState(null);
  const [activeTab, setActiveTab] = useState('facial');
  const [scrollContainer, setScrollContainer] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const displayServices = activeTab === 'facial' ? facialAesthetics : orthodontics;

  useEffect(() => {
    setActiveIndex(0);
  }, [activeTab]);

  useEffect(() => {
    if (!scrollContainer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.dataset.index;
            if (index !== undefined && index !== null) {
              setActiveIndex(Number(index));
            }
          }
        });
      },
      {
        root: scrollContainer,
        threshold: 0.5
      }
    );

    Array.from(scrollContainer.children).forEach((child) => {
      if (child.hasAttribute('data-index')) {
        observer.observe(child);
      }
    });

    return () => observer.disconnect();
  }, [scrollContainer, displayServices]);

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
    <section id="services" className="relative pt-12 pb-0 md:pt-32 md:pb-20 overflow-hidden">

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-200/20 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-0 md:px-6 relative z-10">

        {/* --- HEADER --- */}
        <div className="text-center  px-6">

          {/* Badge con AOS */}
          <div
            className={badgeClass}
            data-aos="fade-down"
          >
            <div className="bg-primary/10 p-1 rounded-full text-primary">
              <Sparkle size={12} fill="currentColor" />
            </div>
            <span>Nuestros Servicios</span>
          </div>

          {/* Título con AOS */}
          <h2
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Estética & <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-400">Salud Integral.</span>
          </h2>

          <p
            className="text-lg text-slate-500 font-light max-w-2xl mx-auto leading-relaxed mb-10"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Descubrí la fusión perfecta entre tecnología digital y calidez humana.
          </p>

          <div className="flex justify-center">
            <LiquidSwitch activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </div>

        {/* --- CONTENIDO (Carrusel) --- */}
        {/* Usamos un div wrapper para el AOS, así no interfiere con el motion.div interno */}
        <div
          data-aos="fade-up"
          data-aos-delay="300"
          className="relative" // IMPORTANTE: relative aquí ayuda a contener el layout
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}

              ref={setScrollContainer}

              className="
                  relative /* REQUERIDO POR FRAMER MOTION */
                  flex 
                  md:flex-wrap md:justify-center 
                  gap-4 md:gap-6
                  overflow-x-auto snap-x snap-mandatory 
                  py-12
                  pl-[calc((100vw-280px)/2)] pr-[calc((100vw-280px)/2)]
                  md:px-6 
                  pb-8 md:pb-12 
                  hide-scrollbar
                  scroll-smooth
                "
            >
              {displayServices.map((service, idx) => (
                <div key={service.id} data-index={idx} className="h-full">
                  <ServiceCard
                    service={service}
                    onClick={() => handleCardClick(service)}
                    isCenter={idx === activeIndex}
                  />
                </div>
              ))}

              <div className="w-1 md:hidden flex-shrink-0" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- DOTS INDICATORS --- */}
        <div className="flex md:hidden justify-center gap-2 mt-1 mb-8">
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