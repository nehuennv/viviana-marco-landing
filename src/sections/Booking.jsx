import React, { useEffect, useState } from 'react';
import { MapPin, Phone, ArrowRight, CalendarCheck, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Booking = ({ initialTreatment }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    tratamiento: ''
  });

  useEffect(() => {
    if (initialTreatment) {
      setFormData(prev => ({ ...prev, tratamiento: initialTreatment }));
    }
  }, [initialTreatment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const phoneNumber = "5492995977208"; 
    const message = `Hola Dra. Viviana, mi nombre es ${formData.nombre} ${formData.apellido}. Quisiera solicitar un turno para realizarme: ${formData.tratamiento || "Consulta General"}.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="booking" className="relative py-24">
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-5 gap-12 items-center">
        
        {/* COLUMNA IZQUIERDA */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-2 space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm text-primary text-xs font-bold uppercase tracking-wider mb-2">
            <CalendarCheck size={14} /> Agenda Abierta
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 leading-tight">
            Empezá tu <br/> transformación.
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed text-balance">
            Sin listas de espera eternas. Te derivamos directamente a nuestro WhatsApp para coordinar tu cita personalmente.
          </p>

          <div className="space-y-6 pt-4">
            <ContactItem 
              icon={<MapPin />} 
              title="Consultorio" 
              text="Fotheringham 115, Neuquén"
              actionText="Abrir en Maps"
              href="https://maps.google.com"
            />
          </div>
        </motion.div>


        {/* COLUMNA DERECHA: FORMULARIO */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-3"
        >
          <div className="relative bg-white border border-slate-200 p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 hover:shadow-primary/5 transition-shadow duration-500">
            
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-green-50 rounded-2xl text-green-600 border border-green-100">
                <MessageCircle size={26} strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800">Solicitar turno vía WhatsApp</h3>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wide">Coordinación directa</p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <AnimatedInput 
                  label="Nombre" 
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Tu nombre" 
                  type="text" 
                  required
                />
                <AnimatedInput 
                  label="Apellido" 
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  placeholder="Tu apellido" 
                  type="text" 
                  required
                />
              </div>
              
              {/* SELECTOR CON PADDING EN EL PLACEHOLDER */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="form-control w-full"
              >
                <label className="label py-1 mb-1">
                  <span className="label-text font-bold text-slate-700 text-xs uppercase tracking-widest ml-1">Tratamiento de Interés</span>
                </label>
                
                <select 
                  name="tratamiento"
                  value={formData.tratamiento}
                  onChange={handleChange}
                  className="select select-bordered w-full bg-slate-50 border-slate-200 h-14 rounded-2xl text-base font-medium text-slate-700 focus:outline-none focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10 transition-all duration-300 pl-5"
                >
                  <option value="" disabled className="text-slate-400 pl-5">Seleccioná una opción...</option>
                  <option value="Consulta General" className="pl-5">Consulta General</option>
                  <option value="Alineadores Invisibles" className="pl-5">Alineadores Invisibles</option>
                  <option value="Brackets Autoligado" className="pl-5">Brackets Autoligado</option>
                  <option value="Placas de Ronquidos" className="pl-5">Placas de Ronquidos</option>
                  <option value="Botox / Toxina" className="pl-5">Botox / Toxina</option>
                  <option value="Labios & Rellenos" className="pl-5">Labios & Rellenos</option>
                  <option value="Mesoterapia & Bio" className="pl-5">Mesoterapia & Bio</option>
                </select>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="pt-4"
              >
                <button type="submit" className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg shadow-xl shadow-green-500/20 hover:shadow-green-500/40 hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 group">
                  Continuar en WhatsApp <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-center text-xs text-slate-400 mt-4 font-medium">
                  Se abrirá tu app de mensajería con la solicitud lista para enviar.
                </p>
              </motion.div>
            </form>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

// INPUT CON PADDING PARA EL PLACEHOLDER
const AnimatedInput = ({ label, placeholder, type, delay, name, value, onChange, required }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: delay }}
    viewport={{ once: true }}
    className="form-control w-full"
  >
    <label className="label py-1 mb-1">
      <span className="label-text font-bold text-slate-700 text-xs uppercase tracking-widest ml-1">{label}</span>
    </label>
    <input 
      type={type} 
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder} 
      className="input input-bordered w-full bg-slate-50 border-slate-200 h-14 rounded-2xl text-base font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10 transition-all duration-300 pl-5" 
    />
  </motion.div>
);

const ContactItem = ({ icon, title, text, actionText, href }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 group cursor-pointer p-4 rounded-3xl transition-all duration-300 hover:bg-white hover:shadow-md border border-transparent hover:border-slate-100">
    <div className="relative w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white group-hover:border-primary shadow-sm">
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <div>
      <div className="flex items-center gap-2">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{title}</p>
        <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[10px] font-bold text-primary bg-purple-50 px-2 py-0.5 rounded-full">{actionText}</span>
      </div>
      <p className="font-semibold text-slate-800 text-lg group-hover:text-primary transition-colors">{text}</p>
    </div>
  </a>
);

export default Booking;