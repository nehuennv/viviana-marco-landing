import React, { useState, useEffect } from 'react';

// --- COMPONENTES ---
import Navbar from './layout/Navbar';
import Hero from './sections/Hero';
import SplashScreen from './components/SplashScreen';
import BackgroundFlow from './components/BackgroundFlow';
import WhatsAppBtn from './components/WhatsAppBtn';

// --- LAZY LOADING (Carga diferida para velocidad inicial) ---
const About = React.lazy(() => import('./sections/About'));
const Services = React.lazy(() => import('./sections/Services'));
const BookingUnified = React.lazy(() => import('./sections/BookingUnified'));
const Reviews = React.lazy(() => import('./sections/Reviews'));
const Footer = React.lazy(() => import('./layout/Footer'));

// --- EFECTOS VISUALES (Condicionales) ---
import MouseSpotlight from './components/MouseSpotlight';

// --- ASSETS CRÍTICOS ---
import consultorioHero from './assets/consultorio-hero.webp';

function App() {
  // Estado de carga controlado por App (Robusto)
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTreatment, setSelectedTreatment] = useState("");
  const [isMobile, setIsMobile] = useState(true);

  // ---------------------------------------------------------
  // 1. DETECCIÓN DE MÓVIL (Para desactivar MouseSpotlight)
  // ---------------------------------------------------------
  useEffect(() => {
    const media = window.matchMedia('(max-width: 1024px)');
    setIsMobile(media.matches);

    const handler = (e) => setIsMobile(e.matches);
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  // ---------------------------------------------------------
  // 2. LÓGICA DE CARGA INTELIGENTE (Window Load + Hero Image)
  // ---------------------------------------------------------
  useEffect(() => {
    const handleLoad = async () => {
      // A. Carga manual de imagen crítica
      const imagePromise = new Promise((resolve) => {
        const img = new Image();
        img.src = consultorioHero;
        img.onload = resolve;
        img.onerror = resolve;
      });

      // B. Esperamos a la imagen
      await imagePromise;

      // C. Damos un pequeño respiro (500ms) para que React pinte la UI debajo
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };

    // Si el navegador ya cargó todo (cache o recarga rápida)
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      // Si no, esperamos el evento oficial
      window.addEventListener('load', handleLoad);

      // Fallback de seguridad: Si algo falla, abrir la app a los 4 segundos sí o sí
      const timeoutFallback = setTimeout(() => setIsLoading(false), 4000);

      return () => {
        window.removeEventListener('load', handleLoad);
        clearTimeout(timeoutFallback);
      };
    }
  }, []);

  // ---------------------------------------------------------
  // 3. UX: FAVICON & TÍTULO DINÁMICO
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
  // 4. SCROLL TO BOOKING
  // ---------------------------------------------------------
  const handleTreatmentSelect = (treatmentName) => {
    setSelectedTreatment(treatmentName);
    // Pequeño delay para permitir que el estado se actualice antes de scrollear
    setTimeout(() => {
      const bookingSection = document.getElementById('booking');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="relative min-h-screen font-sans selection:bg-purple-500/30 selection:text-purple-900">

      {/* SPLASH SCREEN: Recibe el estado isLoading y maneja su propia salida */}
      <SplashScreen isLoading={isLoading} />

      {/* FONDO: Estático y ligero (CSS puro) */}
      <BackgroundFlow />

      {/* SPOTLIGHT: Solo se renderiza en PC para ahorrar batería en móvil */}
      {!isMobile && <MouseSpotlight />}

      {/* CONTENIDO PRINCIPAL */}
      <Navbar />

      <main>
        {/* El Hero es crítico, se carga normal */}
        <Hero />

        {/* El resto se carga bajo demanda (Lazy) */}
        <React.Suspense fallback={<div className="h-20 w-full" />}>
          <About />
          <Services onTreatmentSelect={handleTreatmentSelect} />
          <Reviews />
          <BookingUnified initialTreatment={selectedTreatment} />
        </React.Suspense>
      </main>

      <React.Suspense fallback={null}>
        <Footer />
      </React.Suspense>

      <WhatsAppBtn />
    </div>
  );
}

export default App;