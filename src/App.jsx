import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// Componentes
import Navbar from './layout/Navbar';
import Hero from './sections/Hero';

const About = React.lazy(() => import('./sections/About'));
const Services = React.lazy(() => import('./sections/Services'));
const BookingUnified = React.lazy(() => import('./sections/BookingUnified'));
const Reviews = React.lazy(() => import('./sections/Reviews'));
const Footer = React.lazy(() => import('./layout/Footer'));
import WhatsAppBtn from './components/WhatsAppBtn';
import MouseSpotlight from './components/MouseSpotlight';
import BackgroundFlow from './components/BackgroundFlow';
import SplashScreen from './components/SplashScreen';

// --- ASSETS CRÍTICOS PARA PRECARGA ---
import consultorioHero from './assets/consultorio-hero.webp';


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTreatment, setSelectedTreatment] = useState("");

  // ---------------------------------------------------------
  // 1. PRECARGA DE IMÁGENES (OPTIMIZACIÓN)
  // ---------------------------------------------------------
  useEffect(() => {
    const loadResources = async () => {
      // OPTIMIZACIÓN: Solo bloqueamos la carga por la imagen CRÍTICA del Hero.
      // Las imágenes de 'About' o 'Reviews' que carguen asíncronamente después.
      return new Promise((resolve) => {
        const img = new Image();
        img.src = consultorioHero;
        // Resolvemos tanto en éxito como en error para no trabar la app
        img.onload = resolve;
        img.onerror = resolve;
      });
    };
    loadResources();
  }, []);

  // ---------------------------------------------------------
  // 2. INTERACCIÓN UX (Título y Favicon)
  // ---------------------------------------------------------
  useEffect(() => {
    const handleVisibilityChange = () => {
      const link = document.querySelector("link[rel~='icon']");

      if (document.hidden) {
        document.title = "✨ Estética & Ortodoncia te esperan...";
        if (link) link.href = "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👋</text></svg>";
      } else {
        document.title = "Dra. Viviana Marco | Estética & Salud";
        if (link) link.href = "/favicon.svg";
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // ---------------------------------------------------------
  // 3. NAVEGACIÓN A BOOKING
  // ---------------------------------------------------------
  const handleTreatmentSelect = (treatmentName) => {
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
            {/* Suspense maneja la carga de los componentes lazy sin bloquear la UI */}
            <React.Suspense fallback={<div className="h-20 w-full" />}>
              <About />
              <Services onTreatmentSelect={handleTreatmentSelect} />
              <Reviews />
              <BookingUnified initialTreatment={selectedTreatment} />
            </React.Suspense>
          </main>

          <React.Suspense fallback={null}>
            <Footer />
          </React.Suspense>          <WhatsAppBtn />
        </>
      )}
    </div>
  );
}

export default App;