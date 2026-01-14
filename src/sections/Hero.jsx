import React, { useState, useEffect } from 'react';
import { ChevronRight, CalendarCheck, Sparkles } from 'lucide-react';
// IMPORTANTE: Agregamos 'useAnimation' para controlar manualmente la entrada
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useAnimation } from 'framer-motion';
const consultorioHeader = `${import.meta.env.BASE_URL}assets/consultorio-hero.webp`;

const heroVariants = [
  // --- 1. AUTORIDAD LOCAL (Perfil Profesional) ---
  {
    titleStart: "Especialista en",
    highlight: "Ortodoncia & Estética.",
    titleEnd: "", // Total: 4 palabras
    description: "Atención exclusiva en Fotheringham 115, Neuquén. La Dra. Viviana Marco combina ciencia y arte para diseñar la sonrisa que merecés."
  },

  // --- 2. ORTODONCIA INVISIBLE (Servicio Premium) ---
  {
    titleStart: "Tu ortodoncia",
    highlight: "100% invisible.",
    titleEnd: "", // Total: 4 palabras
    description: "Expertos en alineadores transparentes. Corregí tus dientes con la última tecnología digital, sin metales y con total comodidad."
  },

  // --- 3. ARMONIZACIÓN (Enfoque Médico) ---
  {
    titleStart: "Armonización",
    highlight: "Orofacial",
    titleEnd: "", // Total: 2 palabras
    description: "Rejuvenecimiento facial sutil con Botox, Ácido Hialurónico y Bioestimuladores. Realzamos tus rasgos naturales respetando la anatomía de tu rostro."
  },

  // --- 4. TECNOLOGÍA DAMON (Eficiencia) ---
  {
    titleStart: "Sistema Damon",
    highlight: "Autoligado.",
    titleEnd: "", // Total: 3 palabras
    description: "Tratamientos de ortodoncia avanzada de baja fricción. Lográ resultados más rápidos, higiénicos y con menos visitas al consultorio."
  },

  // --- 5. FILOSOFÍA (Confianza/Calidez) ---
  {
    titleStart: "Diseñamos",
    highlight: "sonrisas únicas.",
    titleEnd: "", // Total: 3 palabras
    description: "No hacemos diseños genéricos. Estudiamos tu estructura facial para lograr una armonía perfecta que potencie tu belleza personal."
  },

  // --- 6. PROPUESTA DE VALOR (Seguridad) ---
  {
    titleStart: "Estética Facial y",
    highlight: "Salud Integral.",
    titleEnd: "", // Total: 4 palabras
    description: "Un enfoque profesional que prioriza tu bienestar. Recuperá la seguridad en tu imagen con tratamientos mínimamente invasivos y seguros."
  },
  {
    titleStart: "Placas para ronquidos y",
    highlight: "Salud Apneas del sueño.",
    titleEnd: "", 
    description: "Recupera la calidad de sueño utilizando las placas de adelantamiento mandibular que te ayuda a  descansar mejor durante las noches disminuyendo los ronquidos y apneas que interrumpen tu sueño."
  }
];

const allClientFaces = [
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=100&h=100&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?fit=crop&w=100&h=100&q=80",
];

// 1. RECIBIMOS LA PROP 'startAnimation' DESDE APP.JSX
const Hero = ({ startAnimation }) => {
  const [isMobile, setIsMobile] = useState(true);

  // Controls de Framer Motion para disparar la animación a voluntad
  const controls = useAnimation();

  // 2. EFECTO DE SINCRONIZACIÓN
  useEffect(() => {
    if (startAnimation) {
      // Cuando termina el Splash (startAnimation = true), iniciamos la animación 'visible'
      controls.start("visible");
    } else {
      // Mientras carga, mantenemos todo oculto
      controls.start("hidden");
    }
  }, [startAnimation, controls]);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 1023px)');
    const updateMobile = (e) => setIsMobile(e.matches);
    setIsMobile(media.matches);
    media.addEventListener('change', updateMobile);
    return () => media.removeEventListener('change', updateMobile);
  }, []);

  // --- LÓGICA 3D TILT ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    x.set(0);
    y.set(0);
  };

  // --- DATA ---
  const [heroContent] = useState(() => {
    const randomIndex = Math.floor(Math.random() * heroVariants.length);
    return heroVariants[randomIndex];
  });
  const [clientFaces] = useState(() => allClientFaces.slice(0, 3));
  const badges = ["Especialista U.B.A.", "Ortodoncia Invisible", "Armonización Facial"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % badges.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // --- VARIANTES DE ANIMACIÓN (Entrada escalonada) ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Retraso entre elementos
        delayChildren: 0.2     // Pequeño respiro inicial
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 50, damping: 20 } // Movimiento suave y natural
    }
  };

  // Variantes específicas para la imagen (entra desde la derecha)
  const imageVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 40, damping: 20, delay: 0.4 }
    }
  };

  return (
    <section id="home" className="relative w-full overflow-hidden flex flex-col justify-center h-[100dvh] lg:h-screen lg:min-h-[800px]">

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full h-full lg:py-0">

        {/* --- COLUMNA TEXTO (Animada por Framer Motion) --- */}
        <motion.div
          className="relative z-10 flex flex-col h-full lg:h-auto justify-between lg:justify-center items-center lg:items-start text-center lg:text-left pt-28 pb-10 lg:py-0"
          initial="hidden"     // Estado inicial
          animate={controls}   // Controlado por App.jsx (espera al Splash)
          variants={containerVariants}
        >
          {/* BADGE MEJORADO */}
          <motion.div variants={itemVariants} className="w-full flex justify-center lg:justify-start lg:mb-10 mb-2">
            {/* Agregamos 'layout' al contenedor padre para que se estire suavemente */}
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/60 border border-slate-200 backdrop-blur-md shadow-sm"
            >
              {/* El icono debe tener layout también para moverse suavemente si el ancho cambia */}
              <motion.div layout className="bg-primary/10 p-1 rounded-full text-primary flex-shrink-0">
                <Sparkles size={14} fill="currentColor" />
              </motion.div>

              {/* Quitamos anchos fijos y 'absolute'. Dejamos que el texto fluya. */}
              <div className="relative flex items-center justify-center h-5 overflow-hidden min-w-[120px]">
                <AnimatePresence mode='popLayout' initial={false}>
                  <motion.span
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    // IMPORTANTE: text-center para asegurar centrado visual
                    className="text-slate-600 text-xs font-bold uppercase tracking-widest whitespace-nowrap block w-full text-center"
                  >
                    {badges[index]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>

          {/* TÍTULO Y DESCRIPCIÓN */}
          <div className="w-full flex flex-col items-center lg:items-start gap-6 lg:gap-8 justify-center flex-grow lg:flex-grow-0">
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-7xl font-bold text-slate-800 leading-[1.1] tracking-tight text-balance">
              {heroContent.titleStart} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
                {heroContent.highlight}
              </span>
              {heroContent.titleEnd && (
                <> <br className="hidden md:block" /> {heroContent.titleEnd}</>
              )}
            </motion.h1>

            <motion.p variants={itemVariants} className="text-[15px] md:text-lg text-slate-500 max-w-lg leading-7 md:leading-relaxed font-light text-balance mx-auto lg:mx-0">
              {heroContent.description}
            </motion.p>

            {/* BOTONES */}
            <motion.div variants={itemVariants} className="flex flex-col w-full sm:w-auto sm:flex-row gap-4 pt-2 lg:pt-4">
              <a
                href="#booking"
                className="outline-none focus:outline-none h-14 px-8 rounded-full w-full sm:w-auto flex items-center justify-center bg-gradient-to-r from-violet-600 to-purple-500 text-white text-base font-medium tracking-wide shadow-lg shadow-violet-500/30 transition-all duration-300 hover:shadow-violet-500/50 hover:brightness-110 active:scale-95"
              >
                <CalendarCheck size={20} className="mr-2" />
                Agendar Cita
              </a>

              <a
                href="#services"
                className="outline-none focus:outline-none h-14 px-8 rounded-full w-full sm:w-auto flex items-center justify-center bg-white border border-slate-200 text-slate-500 text-base font-medium transition-all duration-300 hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50/30 active:scale-95"
              >
                Ver Tratamientos
                <ChevronRight size={20} className="ml-1" />
              </a>
            </motion.div>
          </div>

          {/* CLIENTES */}
          <motion.div variants={itemVariants} className="w-full flex justify-center lg:justify-start lg:mt-16">
            <div className="flex flex-col sm:flex-row items-center gap-3 text-sm text-slate-500 font-medium">
              <div className="flex -space-x-3">
                {clientFaces.map((faceUrl, i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-slate-200 border-4 border-white shadow-sm overflow-hidden">
                    <img src={faceUrl} alt="Cliente" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <p className="text-slate-600 text-sm">
                <span className="text-slate-900 font-bold">+1,500</span> pacientes felices
              </p>
            </div>
          </motion.div>

        </motion.div>

        {/* --- COLUMNA IMAGEN (Con Tilt 3D + Animación de Entrada) --- */}
        <motion.div
          className="hidden lg:flex relative w-full justify-center lg:justify-end lg:pl-10 items-center h-full"
          style={{ perspective: 1000 }}
          initial="hidden"
          animate={controls} // Sincronizado
          variants={imageVariants} // Animación propia (desde la derecha)
        >
          {/* CONTENEDOR INTERACTIVO 3D */}
          <motion.div
            className="relative z-0 group w-full max-w-xl aspect-[4/5]"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={!isMobile ? { rotateX, rotateY, transformStyle: "preserve-3d" } : {}}
          >

            {/* BORDE FLOTANTE (Parallax en PC) */}
            <motion.div
              animate={!isMobile ? {
                x: [30, 45, 30],
                y: [30, 50, 30],
                rotate: [0, -2, 0]
              } : {}}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full border-[2px] border-slate-300 rounded-[2.5rem] z-0 transition-colors duration-700 ease-out"
              style={!isMobile ? { translateZ: -50 } : {}}
            />

            {/* IMAGEN PRINCIPAL */}
            <div
              className="relative z-10 w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/50 border-[10px] border-white ring-1 ring-slate-200"
              style={!isMobile ? { transform: "translateZ(20px)" } : {}}
            >
              <img
                src={consultorioHeader}
                alt="Dra. Viviana Marco Consultorio"
                fetchPriority="high"
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover will-change-transform"
              />

              {/* BRILLO GLOSSY */}
              {!isMobile && (
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay" />
              )}
            </div>

          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;