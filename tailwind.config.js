/** @type {import('tailwindcss').Config} */
export default {
  // 🛑 BLINDAJE TAILWIND: Desactiva la detección automática del sistema
  darkMode: 'class',

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7C3AED",
        secondary: "#DDD6FE",
      },
      fontFamily: {
        // AHORA TODO ES POPPINS
        sans: ['Poppins', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        // Creamos una sombra suave de color violeta para los botones
        'glow-primary': '0 10px 40px -10px rgba(124, 58, 237, 0.4)',
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    // DaisyUI también forzado a Light
    themes: ["light"],
  },
}