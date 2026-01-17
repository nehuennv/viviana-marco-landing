import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'; // IMPORTANTE
import App from './App.jsx'
import './index.css'

// --- IMPORTAR AOS (ANIMACIONES) ---
import AOS from 'aos';
import 'aos/dist/aos.css';

// --- FIX VANTRA SCROLL ---
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Inicializar AOS
AOS.init({
  disable: false,
  startEvent: 'DOMContentLoaded',
  initClassName: 'aos-init',
  animatedClassName: 'aos-animate',
  useClassNames: false,
  disableMutationObserver: false,
  debounceDelay: 50,
  throttleDelay: 99,
  offset: 80,
  delay: 0,
  duration: 800,
  easing: 'ease-out-cubic',
  once: true,
  mirror: false,
  anchorPlacement: 'top-bottom',
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 👇 ESTA ES LA LÍNEA MÁGICA QUE ARREGLA GITHUB PAGES 👇 */}
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)