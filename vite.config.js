import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://gaston-backendmicroservice.toooti.easypanel.host',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  base: '/',
})