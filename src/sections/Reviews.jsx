import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Reviews = () => {
  // DATOS REALES TRANSCRITOS DE LA IMAGEN
  const reviews = [
    {
      id: 1,
      name: "Mariana Lahournere",
      date: "14 Nov, 2023", // Fecha estática para que no quede vieja
      text: "Viviana fue una verdadera bendición para mis tres nenes. No solo les dejó una sonrisa hermosa, sino que también los ayudó desde lo estructural, corrigiendo la mordida y mejorando su salud bucal. Es una profesional súper responsable, meticulosa y atenta.",
      initial: "M",
      stars: 5
    },
    {
      id: 2,
      name: "Cynthia Brualla",
      date: "08 Nov, 2023",
      text: "Excelente profesional la doctora Marco!! Agradecida por cuidar y ser tan delicada con mi hija en cada etapa del tratamiento, su paciencia, atención a los detalles y la confianza que transmite hace una diferencia enorme!!! Una sonrisa saludable es una sonrisa feliz!!",
      initial: "C",
      stars: 5
    },
    {
      id: 3,
      name: "Guillermo Perez",
      date: "02 Nov, 2023",
      text: "Quiero agradecer/destacar la excelente atención y profesionalismo de Odontóloga Viviana Marco! Tuve la oportunidad de hacer un tratamiento de ortodoncia y los resultados fueron positivos en tiempo y forma. Destacar la buena atención y cuidados en higiene.",
      initial: "G",
      stars: 5
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      
      {/* Container con MAX-WIDTH para que NO explote en UltraWide */}
      <div className="max-w-6xl mx-auto px-6">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm"
          >
            <Star size={12} fill="#FBBF24" className="text-amber-400" /> 
            Google Reviews
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-slate-800 tracking-tight"
          >
            Nuestros pacientes <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
              lo dicen mejor.
            </span>
          </motion.h2>
        </div>

        {/* GRID DE 3 COLUMNAS (Contenido y centrado) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <motion.div 
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }} // Efecto cascada
              className="group relative bg-white p-8 rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/40 flex flex-col h-full hover:-translate-y-2 transition-transform duration-300"
            >
              {/* Comillas grandes de fondo (Decoración) */}
              <Quote className="absolute top-6 right-6 text-slate-100 group-hover:text-primary/5 transition-colors duration-300" size={60} fill="currentColor" />

              {/* Header de la Card: Avatar + Nombre */}
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-lg font-bold text-slate-600 shadow-sm group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors duration-300">
                  {review.initial}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{review.name}</h4>
                  <div className="flex items-center gap-1 mt-0.5">
                    <CheckCircle2 size={12} className="text-green-500" />
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wide">Paciente Verificado</span>
                  </div>
                </div>
              </div>

              {/* Estrellas */}
              <div className="flex gap-1 mb-4 relative z-10">
                {[...Array(review.stars)].map((_, i) => (
                  <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* El Texto Real */}
              <p className="text-slate-600 text-[15px] leading-relaxed font-medium relative z-10 flex-grow text-pretty">
                "{review.text}"
              </p>

              {/* Footer: Google + Fecha Estática */}
              <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between opacity-70 group-hover:opacity-100 transition-opacity">
                {/* Logo Google */}
                <div className="flex items-center gap-2">
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="grayscale group-hover:grayscale-0 transition-all">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span className="text-xs font-bold text-slate-500">Google</span>
                </div>
                
                {/* FECHA ESTÉTICA */}
                <span className="text-xs font-medium text-slate-400">
                  {review.date}
                </span>
              </div>

            </motion.div>
          ))}
        </div>

        {/* CTA FINAL */}
        <div className="mt-16 text-center">
          <a 
            href="https://www.google.com/maps/place/Odontologa+Viviana+Marco/" // Reemplazar con link real
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-primary transition-colors border-b border-transparent hover: pb-0.5"
          >
            Ver más reseñas en Google Maps
          </a>
        </div>

      </div>
    </section>
  );
};

export default Reviews;