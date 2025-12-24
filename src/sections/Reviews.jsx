import React, { useRef, useState, useEffect } from 'react';
import { Star, Quote, CheckCircle2, MapPin, Edit3 } from 'lucide-react';
import { motion } from 'framer-motion';

// --- CLASE BADGE ---
const badgeClass = "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 border border-slate-200 backdrop-blur-md text-slate-600 text-xs font-bold uppercase tracking-widest shadow-sm mb-6";

const Reviews = () => {
  const [displayReviews, setDisplayReviews] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);
  const ticking = useRef(false);

  const allReviews = [
    {
      id: 1,
      name: "Mariana Lahournere",
      date: "13 Dic, 2025",
      text: "Viviana fue una verdadera bendición para mis tres nenes. No solo les dejó una sonrisa hermosa, sino que también los ayudó desde lo estructural, corrigiendo la mordida. Es una profesional súper responsable.",
      stars: 5,
      googleColor: "#8D6E63"
    },
    {
      id: 2,
      name: "Cynthia Brualla",
      date: "11 Dic, 2025",
      text: "Excelente profesional la doctora Marco!! Agradecida por cuidar y ser tan delicada con mi hija en cada etapa del tratamiento, su paciencia y atención a los detalles hace una diferencia enorme!!!",
      stars: 5,
      googleColor: "#C2185B"
    },
    {
      id: 3,
      name: "Guillermo Perez",
      date: "16 Dic, 2025",
      text: "Quiero destacar la excelente atención y profesionalismo! Tuve la oportunidad de hacer un tratamiento de ortodoncia y los resultados fueron positivos en tiempo y forma. Destacar la buena atención en higiene.",
      stars: 5,
      googleColor: "#00897B"
    },
  ];

  useEffect(() => {
    const shuffled = [...allReviews].sort(() => 0.5 - Math.random());
    setDisplayReviews(shuffled.slice(0, 3));
  }, []);

  const handleScroll = () => {
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        if (scrollRef.current) {
          const container = scrollRef.current;
          const scrollLeft = container.scrollLeft;
          const containerCenter = scrollLeft + (container.offsetWidth / 2);

          let closestIndex = 0;
          let closestDistance = Infinity;

          const children = container.children;
          for (let i = 0; i < children.length; i++) {
            if (i >= displayReviews.length) break;
            const child = children[i];
            const cardCenter = child.offsetLeft + (child.offsetWidth / 2);
            const distance = Math.abs(containerCenter - cardCenter);

            if (distance < closestDistance) {
              closestDistance = distance;
              closestIndex = i;
            }
          }
          setActiveIndex(closestIndex);
        }
        ticking.current = false;
      });
      ticking.current = true;
    }
  };

  return (
    <section id='reviews' className="py-12 md:py-24 relative overflow-hidden z-10">

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-200/20 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-0 md:px-6 relative z-10">

        {/* HEADER */}
        <div className="text-center mb-12 px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={badgeClass}
          >
            <div className="bg-amber-100 p-1 rounded-full text-amber-500">
              <Star size={14} fill="currentColor" />
            </div>
            <span>Google Reviews</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-slate-800 tracking-tight"
          >
            Pacientes
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-400 drop-shadow-sm">
              {" "}felices.
            </span>
          </motion.h2>
        </div>

        {/* --- GRID / CAROUSEL --- */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="
          flex 
          md:flex-wrap md:justify-center
          gap-4 md:gap-6
          overflow-x-auto md:overflow-visible 
          snap-x snap-mandatory 
          pl-[calc((100vw-280px)/2)] pr-[calc((100vw-280px)/2)]
          md:px-6 
          pb-8 md:pb-0
          scroll-smooth
          hide-scrollbar
        "
        >
          {displayReviews.map((review, idx) => {
            const initialLetter = review.name.charAt(0).toUpperCase();

            return (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: 1,
                  scale: activeIndex === idx ? 1 : 0.9,
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true }}
                className="
                  min-w-[280px] w-[280px] 
                  md:min-w-0 md:w-[350px]
                  snap-center h-full flex-shrink-0 
                  md:!scale-100 md:!opacity-100
                  py-4 // Un poco de padding vertical para que la sombra no se corte
              "              >
                {/* CARD SIMPLE CON HOVER NORMAL */}
                <div className="
                    bg-white 
                    border border-slate-200 
                    p-6 md:p-8 
                    rounded-[2rem] 
                    h-full flex flex-col justify-between 
                    relative group overflow-hidden
                    
                    /* HOVER EFICIENTE (CSS PURO) */
                    transition-all duration-300 ease-in-out
                    hover:-translate-y-1 
                    hover:shadow-2xl hover:shadow-violet-500/10
                    hover:border-violet-200
                  ">

                  {/* Decoración Fondo */}
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                  {/* Icono Comillas (Gira un poquito con CSS) */}
                  <div className="absolute top-6 right-6 transition-transform duration-500 ease-out group-hover:rotate-12 hidden md:block">
                    <Quote className="text-slate-200/50 transition-colors duration-500 group-hover:text-violet-200" size={60} fill="currentColor" />
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">

                      {/* --- BADGE DE USUARIO --- */}
                      <div className="relative w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold text-white shadow-inner">
                        <span
                          className="absolute inset-0 rounded-2xl"
                          style={{ backgroundColor: review.googleColor }}
                        />
                        <span className="relative z-10">{initialLetter}</span>
                      </div>

                      <div>
                        <h4 className="font-bold text-slate-800 text-sm">{review.name}</h4>
                        <div className="flex items-center gap-1 mt-0.5 opacity-60">
                          <CheckCircle2 size={12} className="text-green-500" />
                          <span className="text-[10px] uppercase font-bold tracking-wide">Verificado</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-4">
                      {[...Array(review.stars)].map((_, i) => (
                        <Star key={i} size={16} className="text-amber-400 fill-amber-400 drop-shadow-sm" />
                      ))}
                    </div>
                    <p className="text-slate-600 text-xs md:text-[15px] leading-relaxed font-medium text-pretty whitespace-normal break-words">
                      "{review.text}"
                    </p>
                  </div>

                  {/* --- FOOTER --- */}
                  <div className="mt-6 md:mt-8 pt-5 border-t border-slate-100/50 flex items-center justify-between relative z-10 text-slate-400/80 transition-colors duration-300 group-hover:border-violet-100">
                    <div className="flex items-center gap-2 filter grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                      <span className="text-xs font-bold group-hover:text-slate-600 transition-colors">Google</span>
                    </div>
                    <span className="text-xs font-medium group-hover:text-slate-500 transition-colors">{review.date}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}

          <div className="w-1 md:hidden flex-shrink-0" />
        </div>

        {/* --- DOTS --- */}
        <div className="flex md:hidden justify-center gap-2 mt-2 mb-12">          {displayReviews.map((_, idx) => (
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

        {/* --- BOTONES --- */}
        <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-6 px-6 md:px-0 md:mt-12">

          <a
            href="https://www.google.com/maps/place/?q=place_id:ChIJm3osuPUzCpYR-i-TI3gOw20"
            target="_blank"
            rel="noopener noreferrer"
            className="
              outline-none focus:outline-none
              flex items-center justify-center gap-2 px-8 py-3.5 rounded-full
              border border-slate-200 bg-white text-slate-500 font-semibold text-sm tracking-wide shadow-sm
              transition-all duration-300
              hover:border-violet-200 hover:text-violet-600 hover:shadow-lg hover:shadow-violet-500/10
              active:scale-[0.98]
              w-full sm:w-auto
            "
          >
            <MapPin size={18} /> Ver reseñas
          </a>

          <a
            href="https://search.google.com/local/writereview?placeid=ChIJm3osuPUzCpYR-i-TI3gOw20"
            target="_blank"
            rel="noopener noreferrer"
            className="
              outline-none focus:outline-none
              flex items-center justify-center gap-2 px-8 py-3.5 rounded-full
              bg-violet-600 text-white font-semibold text-sm tracking-wide 
              shadow-lg shadow-violet-500/30
              transition-all duration-300
              hover:shadow-violet-500/50 hover:brightness-110
              active:scale-[0.98]
              w-full sm:w-auto
            "
          >
            <Edit3 size={18} /> Opinar
          </a>

        </div>

      </div>
    </section>
  );
};

export default Reviews;