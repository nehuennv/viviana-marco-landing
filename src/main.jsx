import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// --- IMPORTAR AOS (ANIMACIONES LIGERAS) ---
import AOS from 'aos';
import 'aos/dist/aos.css';

// Inicializar AOS
AOS.init({
  // Configuración Global
  disable: false, // Puedes poner 'mobile' si quieres desactivarlas en celus muy viejos
  startEvent: 'DOMContentLoaded',
  initClassName: 'aos-init',
  animatedClassName: 'aos-animate',
  useClassNames: false,
  disableMutationObserver: false,
  debounceDelay: 50,
  throttleDelay: 99,

  // Settings de animación
  offset: 80,          // Se activa un poco antes de llegar (px)
  delay: 0,
  duration: 800,       // Duración suave (800ms)
  easing: 'ease-out-cubic', // Curva de velocidad elegante
  once: true,          // IMPORTANTE: Solo anima una vez al bajar (ahorra recursos al subir)
  mirror: false,
  anchorPlacement: 'top-bottom',
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)