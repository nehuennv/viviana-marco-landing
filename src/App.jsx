import React, { useState } from 'react';
import Navbar from './layout/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Booking from './sections/Booking';
import Reviews from './sections/Reviews'; // Nueva sección
import Footer from './layout/Footer';
import WhatsAppBtn from './components/WhatsAppBtn';
import MouseSpotlight from './components/MouseSpotlight';

function App() {
  // Estado para guardar el tratamiento seleccionado desde Servicios
  const [preSelectedTreatment, setPreSelectedTreatment] = useState("");

  // Función para manejar la selección y el scroll
  const handleTreatmentSelect = (treatmentName) => {
    setPreSelectedTreatment(treatmentName);
    // Hacemos scroll suave hasta el formulario
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen">
      <MouseSpotlight />
      <Navbar />
      <main>
        <Hero />
        <About />
        {/* Pasamos la función a Servicios para que la use el Modal */}
        <Services onTreatmentSelect={handleTreatmentSelect} />


        {/* Pasamos el tratamiento seleccionado al Booking */}
        <Booking initialTreatment={preSelectedTreatment} />

        <Reviews />
      </main>
      <Footer />
      <WhatsAppBtn />
    </div>
  );
}

export default App;