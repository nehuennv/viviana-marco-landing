import React, { useState, useEffect } from 'react';

// --- COMPONENTES CORE ---
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

  // 2. LÓGICA DE CARGA
  useEffect(() => {
    const handleLoad = async () => {
      const minTimePromise = new Promise(resolve => setTimeout(resolve, 2500));
      const imagePromise = new Promise((resolve) => {
        const img = new Image();
        img.src = consultorioHero;
        img.onload = resolve;
        img.onerror = resolve;
      });
      await Promise.all([minTimePromise, imagePromise]);
      setIsLoading(false);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      const timeoutFallback = setTimeout(() => setIsLoading(false), 5000);
      return () => {
        window.removeEventListener('load', handleLoad);
        clearTimeout(timeoutFallback);
      };
    }
  }, []);

  // ---------------------------------------------------------
  // 3. UX: SOLO TÍTULO DINÁMICO (Sin tocar Favicon)
  // ---------------------------------------------------------
  useEffect(() => {
    let lastIndex = -1;

    const handleVisibilityChange = () => {
      // Frases cortas con Emoji incluido
      const exitTitles = [
        "¡Te esperamos! 💜",
        "No te vayas... 🥺",
        "Tu sonrisa te espera ✨",
        "Volvé pronto 👋",
        "Dra. Viviana Marco 👩‍⚕️",
        "¿Te olvidaste algo? 🤔",
        "¡Agendá tu turno! 📅"
      ];

      if (document.hidden) {
        // --- AL SALIR: ELEGIR FRASE ALEATORIA ---
        let randomIndex;

        // Evitamos repetir la misma frase dos veces seguidas
        do {
          randomIndex = Math.floor(Math.random() * exitTitles.length);
        } while (randomIndex === lastIndex);

        lastIndex = randomIndex;
        document.title = exitTitles[randomIndex];

      } else {
        // --- AL VOLVER: RESTAURAR TÍTULO ORIGINAL ---
        document.title = "Dra. Viviana Marco | Estética & Salud";
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

      <SplashScreen isLoading={isLoading} />
      <BackgroundFlow />
      {!isMobile && <MouseSpotlight />}

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