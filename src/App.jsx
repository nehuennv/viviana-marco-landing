import React, { useState, useEffect } from 'react';

// --- COMPONENTES ---
import Navbar from './layout/Navbar';
import Hero from './sections/Hero';
import SplashScreen from './components/SplashScreen';
import BackgroundFlow from './components/BackgroundFlow';
import WhatsAppBtn from './components/WhatsAppBtn';

// --- LAZY LOADING ---
const About = React.lazy(() => import('./sections/About'));
const Services = React.lazy(() => import('./sections/Services'));
const BookingUnified = React.lazy(() => import('./sections/BookingUnified'));
const Reviews = React.lazy(() => import('./sections/Reviews'));
const Footer = React.lazy(() => import('./layout/Footer'));

// --- EFECTOS VISUALES ---
import MouseSpotlight from './components/MouseSpotlight';

// --- ASSETS CRÍTICOS ---
import consultorioHero from './assets/consultorio-hero.webp';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTreatment, setSelectedTreatment] = useState("");
  const [isMobile, setIsMobile] = useState(true);

  // 1. DETECCIÓN DE MÓVIL
  useEffect(() => {
    const media = window.matchMedia('(max-width: 1024px)');
    setIsMobile(media.matches);
    const handler = (e) => setIsMobile(e.matches);
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  // 2. LÓGICA DE CARGA INTELIGENTE (TIEMPO MÍNIMO + CARGA REAL)
  useEffect(() => {
    const handleLoad = async () => {

      // A. Promesa de TIEMPO MÍNIMO (2.5 segundos)
      // Esto asegura que la animación de la sonrisa (que tarda ~2s) se vea completa.
      const minTimePromise = new Promise(resolve => setTimeout(resolve, 2500));

      // B. Promesa de CARGA DE RECURSOS
      const imagePromise = new Promise((resolve) => {
        const img = new Image();
        img.src = consultorioHero;
        img.onload = resolve;
        img.onerror = resolve; // Si falla, seguimos igual
      });

      // C. Esperamos a que AMBAS terminen.
      // Si la imagen carga rápido, esperamos al timer.
      // Si la imagen tarda mucho, el timer termina pero esperamos a la imagen.
      await Promise.all([minTimePromise, imagePromise]);

      setIsLoading(false);
    };

    // Verificamos carga
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      // Fallback de seguridad (máximo 5s por si algo se traba)
      const timeoutFallback = setTimeout(() => setIsLoading(false), 5000);
      return () => {
        window.removeEventListener('load', handleLoad);
        clearTimeout(timeoutFallback);
      };
    }
  }, []);

  // 3. UX: TÍTULO DINÁMICO
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

  // 4. SCROLL TO BOOKING
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

      {/* SPLASH SCREEN */}
      <SplashScreen isLoading={isLoading} />

      {/* BACKGROUND ESTÁTICO (Optimizado) */}
      <BackgroundFlow />

      {/* SPOTLIGHT (Solo PC) */}
      {!isMobile && <MouseSpotlight />}

      {/* CONTENIDO PRINCIPAL */}
      <Navbar />

      <main>
        <Hero />
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