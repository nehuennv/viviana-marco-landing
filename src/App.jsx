import React, { useState, useEffect, useLayoutEffect, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// --- COMPONENTES CORE ---
import Navbar from './layout/Navbar';
import Hero from './sections/Hero';
import SplashScreen from './components/SplashScreen';
import CheckoutLoader from './components/CheckoutLoader';
import BackgroundFlow from './components/BackgroundFlow';
import WhatsAppBtn from './components/WhatsAppBtn';
import Footer from './layout/Footer';

// --- LAZY LOADING ---
// Cargamos las secciones pesadas solo cuando se necesitan
const About = React.lazy(() => import('./sections/About'));
const Services = React.lazy(() => import('./sections/Services'));
const BookingUnified = React.lazy(() => import('./sections/BookingUnified')); // Sección de reserva en Landing
const Reviews = React.lazy(() => import('./sections/Reviews'));

// --- PÁGINAS NUEVAS ---
// IMPORTANTE: Verifica que la ruta coincida con donde creaste el archivo
const CheckoutPage = React.lazy(() => import('./pages/CheckoutPage'));
const BookingPage = React.lazy(() => import('./pages/BookingPage'));

// --- EFECTOS VISUALES ---
import MouseSpotlight from './components/MouseSpotlight';

// --- ASSETS CRÍTICOS ---
import consultorioHero from './assets/consultorio-hero.webp';

// --- COMPONENTE LANDING (Home) ---
const LandingPage = ({ isLoading, handleTreatmentSelect }) => (
  <>
    <Navbar />
    <main>
      {/* Pasamos !isLoading para que la animación del Hero arranque al terminar el splash */}
      <Hero startAnimation={!isLoading} />

      <Suspense fallback={<div className="h-20 w-full" />}>
        <About />
        <Services onTreatmentSelect={handleTreatmentSelect} />
        <Reviews />
        {/* Mantenemos tu sección de reservas original en la home */}
        <BookingUnified initialTreatment="" />
      </Suspense>
    </main>
    <Suspense fallback={null}>
      <Footer />
    </Suspense>
    <WhatsAppBtn />
  </>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(true);
  const location = useLocation(); // Hook para saber en qué ruta estamos

  // 1. DETECCIÓN DE MÓVIL
  useEffect(() => {
    const media = window.matchMedia('(max-width: 1024px)');
    setIsMobile(media.matches);
    const handler = (e) => setIsMobile(e.matches);
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  // 2. LÓGICA DE CARGA DE ASSETS
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

  // --- SCROLL RESET AL CAMBIAR DE RUTA ---
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // 3. TÍTULO DINÁMICO
  useEffect(() => {
    let lastIndex = -1;
    const handleVisibilityChange = () => {
      const exitTitles = [
        "¡Te esperamos! 💜", "No te vayas... 🥺", "Tu sonrisa te espera ✨",
        "Volvé pronto 👋", "Dra. Viviana Marco 👩‍⚕️", "¿Te olvidaste algo? 🤔", "¡Agendá tu turno! 📅"
      ];
      if (document.hidden) {
        let randomIndex;
        do { randomIndex = Math.floor(Math.random() * exitTitles.length); } while (randomIndex === lastIndex);
        lastIndex = randomIndex;
        document.title = exitTitles[randomIndex];
      } else {
        document.title = "Dra. Viviana Marco | Estética & Salud";
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // 4. SCROLL INTERNO
  const handleTreatmentSelect = (treatmentName) => {
    if (location.pathname !== '/') {
      window.location.href = '/#booking';
      return;
    }
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen font-sans selection:bg-purple-500/30 selection:text-purple-900">

      {/* SELECCIÓN DE SPLASH SCREEN SEGÚN RUTA */}
      {location.pathname.startsWith('/checkout') ? (
        <CheckoutLoader isLoading={isLoading} />
      ) : (
        <SplashScreen isLoading={isLoading} />
      )}

      <BackgroundFlow />

      {!isMobile && <MouseSpotlight />}

      <Suspense fallback={<div className="h-screen w-full bg-slate-50 flex items-center justify-center text-violet-600">Cargando...</div>}>
        <Routes>

          {/* RUTA 1: Landing Page (Exacta) */}
          <Route path="/" element={
            <LandingPage
              isLoading={isLoading}
              handleTreatmentSelect={handleTreatmentSelect}
            />
          } />

          {/* RUTA 2: Checkout (Catch-all) */}
          <Route path="/checkout/*" element={<CheckoutPage />} />

          {/* RUTA 3: Booking Pages (Alias) */}
          <Route path="/reservar" element={<BookingPage />} />
          <Route path="/turnos" element={<BookingPage />} />

          {/* RUTA 404: Catch-all -> Landing */}
          <Route path="*" element={<LandingPage isLoading={false} handleTreatmentSelect={() => { }} />} />
        </Routes>
      </Suspense>

    </div>
  );
}

export default App;