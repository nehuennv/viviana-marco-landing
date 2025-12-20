import React, { useState } from 'react';
import { Smile, Sparkles, Syringe, Moon, Zap, User, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ServiceModal from '../components/ServiceModal';

const Services = ({ onTreatmentSelect }) => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 1,
      category: "Ortodoncia",
      title: "Alineadores Invisibles",
      desc: "Alinea tus dientes sin brackets. Estética máxima y comodidad absoluta.",
      longDesc: "La revolución de la ortodoncia. Utilizamos scanners 3D para fabricar férulas transparentes a tu medida que mueven tus dientes milímetro a milímetro. Son removibles, invisibles y mucho más cómodos que los brackets tradicionales.",
      steps: ["Escaneo 3D Intraoral", "Planificación Digital de Sonrisa", "Entrega de Set de Alineadores", "Controles cada 4-6 semanas"],
      image: "https://images.unsplash.com/photo-1598256989626-60ed1543c21b?q=80&w=1000&auto=format&fit=crop",
      icon: <Smile size={28} />,
    },
    {
      id: 2,
      category: "Ortodoncia",
      title: "Brackets Autoligado",
      desc: "Menos fricción, tratamientos más rápidos y sin extracciones.",
      longDesc: "Olvídate de las 'gomitas'. El sistema de autoligado utiliza una tecnología de compuertas que reduce la fricción, permitiendo movimientos más biológicos, rápidos y con menos molestias para el paciente.",
      steps: ["Diagnóstico Radiográfico", "Cementado de Brackets", "Ajustes de Arcos Inteligentes", "Retención Final"],
      image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1000&auto=format&fit=crop",
      icon: <Zap size={28} />,
    },
    {
      id: 3,
      category: "Salud del Sueño",
      title: "Placas de Ronquidos",
      desc: "Disminuye apneas del sueño y mejora tu descanso y calidad de vida.",
      longDesc: "El descanso es salud. Diseñamos dispositivos de avance mandibular que despejan las vías aéreas mientras duermes, eliminando ronquidos y previniendo la apnea obstructiva del sueño.",
      steps: ["Estudio del Sueño (Polisomnografía)", "Toma de Impresiones", "Confección de Dispositivo DAM", "Ajuste y Control"],
      image: "https://plus.unsplash.com/premium_photo-1661777196224-bfda51e61cfd?q=80&w=1000&auto=format&fit=crop",
      icon: <Moon size={28} />,
    },
    {
      id: 4,
      category: "Estética Facial",
      title: "Botox / Toxina",
      desc: "Relaja músculos, elimina arrugas dinámicas y trata el bruxismo.",
      longDesc: "No solo es estética, es prevención. La toxina botulínica relaja la musculatura facial, suavizando arrugas de expresión y aliviando la tensión mandibular en casos de bruxismo severo.",
      steps: ["Evaluación de Mímica Facial", "Aplicación en Puntos Estratégicos", "Cuidados Post-Aplicación", "Retoque a los 15 días"],
      image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=1000&auto=format&fit=crop",
      icon: <Syringe size={28} />,
    },
    {
      id: 5,
      category: "Estética Facial",
      title: "Labios & Rellenos",
      desc: "Ácido hialurónico para perfilado y volumen natural. Realza, no exagera.",
      longDesc: "Recuperamos volúmenes perdidos y definimos contornos. Utilizamos ácido hialurónico de alta gama para armonizar nariz (rinomodelación), labios, pómulos y mentón con resultados inmediatos.",
      steps: ["Análisis de Proporciones Áureas", "Anestesia Tópica", "Inyección y Modelado", "Resultados Inmediatos"],
      image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1000&auto=format&fit=crop",
      icon: <User size={28} />,
    },
    {
      id: 6,
      category: "Piel",
      title: "Mesoterapia & Bio",
      desc: "Estimulación de colágeno para recuperar firmeza y brillo natural.",
      longDesc: "El secreto de la 'Piel de Vidrio'. Cócteles de vitaminas, péptidos y bioestimuladores que nutren la piel desde adentro, mejorando textura, luminosidad y tensión.",
      steps: ["Limpieza Profunda", "Aplicación de Activos (Meso)", "Máscara Descongestiva", "Piel Radiante"],
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1000&auto=format&fit=crop",
      icon: <Sparkles size={28} />,
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 20 } }
  };

  return (
    <section id="services" className="relative py-24 overflow-hidden">
      
      {/* Fondo decorativo sutil */}
      <div className="absolute inset-0 -z-10 opacity-[0.4]" style={{
          backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-20 text-center"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-white border border-slate-100 shadow-sm text-primary font-bold tracking-widest uppercase text-[10px] mb-4">
            Excelencia Médica
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 tracking-tight">
            Diseño de sonrisas y <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Armonización Facial</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto text-balance">
            Tratamientos mínimamente invasivos con tecnología de vanguardia y certificación UBA.
          </p>
        </motion.div>

        {/* GRID DE CARDS */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div 
              key={service.id} 
              variants={cardVariants}
              onClick={() => setSelectedService(service)}
              whileTap={{ scale: 0.95 }}
              className="group relative bg-white rounded-[2rem] p-8 transition-all duration-300 border border-slate-100 overflow-hidden cursor-pointer h-full flex flex-col md:hover:-translate-y-1 md:hover:shadow-2xl md:hover:shadow-primary/5"
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 text-primary bg-primary/5 md:text-slate-400 md:bg-slate-50 md:group-hover:bg-primary md:group-hover:text-white">
                {service.icon}
              </div>

              <div className="relative z-10 flex-grow">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  {service.category}
                </span>
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed text-balance">
                  {service.desc}
                </p>
              </div>

              <div className="mt-6 flex items-center text-primary font-semibold text-sm transition-all duration-500 ease-out opacity-100 translate-y-0 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0">
                Ver detalle <ArrowUpRight size={16} className="ml-1" />
              </div>

              <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-purple-300 transition-transform duration-300 origin-left scale-x-100 md:scale-x-0 md:group-hover:scale-x-100"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedService && (
          <ServiceModal 
            service={selectedService} 
            onClose={() => setSelectedService(null)} 
            onSelect={() => onTreatmentSelect(selectedService.title)} // <--- PASAMOS LA FUNCIÓN MÁGICA
          />
        )}
      </AnimatePresence>

    </section>
  );
};

export default Services;