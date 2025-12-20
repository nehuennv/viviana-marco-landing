import React from 'react';
import { Award, CheckCircle, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  const credentials = [
    "Egresada de la Universidad de Buenos Aires (UBA)",
    "Postgrado en Ortodoncia y Brackets de Autoligado",
    "Diplomado en Armonización Orofacial (UBA)",
    "Especialista en Alineadores Invisibles"
  ];

  return (
    <section id="about" className="relative py-24">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* IMAGEN ANIMADA (Entra desde la izquierda) */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          viewport={{ once: true, margin: "-100px" }} 
          transition={{ duration: 0.8 }}
          className="relative order-2 md:order-1"
        >
          {/* Marco de Imagen Unificado con Hero */}
          <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/50 border-[8px] border-white group">
            <img 
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1000&auto=format&fit=crop" 
              alt="Dra. Viviana Marco" 
              className="relative w-full object-cover aspect-[4/5] group-hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Tarjeta 15+ Años (Flotando) */}
          <div className="absolute bottom-10 -right-4 md:-right-10 z-20 bg-white p-5 rounded-2xl shadow-xl border border-slate-50 flex items-center gap-4 transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl">
            <div className="bg-purple-50 p-3 rounded-xl text-primary">
              <Award size={28} />
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-800 font-heading leading-none">15+</p>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Años Exp.</p>
            </div>
          </div>
          
          {/* Decoración de fondo */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100/50 rounded-full blur-3xl -z-10"></div>
        </motion.div>

        {/* TEXTO ANIMADO (Entra desde la derecha) */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="order-1 md:order-2 space-y-8"
        >
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-primary text-[10px] font-bold uppercase tracking-widest mb-4">
              <GraduationCap size={14} /> Formación Académica
            </span>
            
            {/* TÍTULO CORREGIDO: Usamos 'text-balance' para evitar saltos de línea feos */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 leading-tight tracking-tight text-balance">
              Experiencia, dedicación y <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">formación de excelencia.</span>
            </h2>
          </div>

          <p className="text-slate-500 text-lg leading-relaxed font-light text-balance">
            Mi objetivo es encontrar la sonrisa que siempre soñaste y mejorar tu estética facial resaltando tus rasgos naturales. <strong className="text-slate-700 font-medium">Nunca exageramos, solo perfeccionamos.</strong>
          </p>
          
          {/* LISTA CON CHECKS VIOLETAS (Cascada) */}
          <div className="space-y-4 pt-2">
            {credentials.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + (index * 0.1) }} 
                className="flex items-start gap-4 p-3 rounded-xl hover:bg-white hover:shadow-sm transition-all duration-300 border border-transparent hover:border-slate-50 group"
              >
                <div className="mt-1 p-1 bg-purple-50 rounded-full text-primary group-hover:scale-110 transition-transform">
                  <CheckCircle size={16} strokeWidth={3} />
                </div>
                <span className="text-slate-700 font-medium text-base">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;