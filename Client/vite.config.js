import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    proxy: {
      '/productos': 'http://localhost:3000',
      '/tarjetas_regalos': 'http://localhost:3000',
      '/promocionPropia': 'http://localhost:3000',
    }
  }
})
