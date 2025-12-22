import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// Componentes
import Navbar from './layout/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import BookingUnified from './sections/BookingUnified';
import Reviews from './sections/Reviews';
import Footer from './layout/Footer';
import WhatsAppBtn from './components/WhatsAppBtn';
import MouseSpotlight from './components/MouseSpotlight';
import BackgroundFlow from './components/BackgroundFlow';
import SplashScreen from './components/SplashScreen';

// --- IMÁGENES A PRECARGAR ---
import fotoAbout from './assets/viviana-about.png'; 

const externalImages = [
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fit=crop&w=100&h=100&q=80", 
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=100&h=100&q=80", 
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?fit=crop&w=100&h=100&q=80", 
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=100&h=100&q=80"
];

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTreatment, setSelectedTreatment] = useState("");

  // ---------------------------------------------------------
  // 🧠 UX HACK: TAB TITLE & FAVICON INTERACTION
  // ---------------------------------------------------------
  useEffect(() => {
    const handleVisibilityChange = () => {
      const link = document.querySelector("link[rel~='icon']");

      if (document.hidden) {
        // --- MODO "TE EXTRAÑAMOS" ---
        // CORREGIDO: Abarca ambos mundos (Estética y Ortodoncia)
        document.title = "✨ Estética & Ortodoncia te esperan...";
        
        // Cambiar favicon a un Emoji (👋) para llamar la atención visualmente
        if (link) {
          link.href = "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👋</text></svg>";
        }

      } else {
        // --- MODO ACTIVO (RESTAURAR) ---
        document.title = "Dra. Viviana Marco | Estética & Salud";
        
        // Restaurar Favicon Original
        // Asegurate de tener el archivo /favicon.svg en tu carpeta public
        if (link) {
          link.href = "/favicon.svg"; 
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
  // ---------------------------------------------------------

  // --- LÓGICA DE PRECARGA ---
// ---------------------------------------------------------
  // 🧠 UX HACK: TAB TITLE (VERSIÓN CORTA & ELEGANTE)
  // ---------------------------------------------------------
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Opción A: Corta y amable
        document.title = "¡Te esperamos! ✨";
        
        // Opción B (Alternativa si preferís): 
        // document.title = "Tu consulta... 📅";

      } else {
        // Cuando vuelve, título oficial
        document.title = "Dra. Viviana Marco | Estética & Salud";
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const handleTreatmentSelect = (treatmentName) => {
    console.log("Tratamiento seleccionado:", treatmentName);
    setSelectedTreatment(treatmentName);

    setTimeout(() => {
        const bookingSection = document.getElementById('booking');
        if (bookingSection) {
          bookingSection.scrollIntoView({ behavior: 'smooth' });
        }
    }, 100);
  };

  return (
    <div className="relative min-h-screen font-sans selection:bg-purple-500/30 selection:text-purple-900">
      <AnimatePresence mode='wait'>
        {isLoading && (
          <SplashScreen finishLoading={() => setIsLoading(false)} />
        )}
      </AnimatePresence>
      <BackgroundFlow />
      <MouseSpotlight /> 
      {!isLoading && (
        <>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Services onTreatmentSelect={handleTreatmentSelect} />
            <Reviews />
            <BookingUnified initialTreatment={selectedTreatment} />
          </main>
          <Footer />
          <WhatsAppBtn />
        </>
      )}
    </div>
  );
}

export default App;