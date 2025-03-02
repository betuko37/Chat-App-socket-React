import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true, // Permite probar la PWA en modo desarrollo
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Chat App',
        short_name: 'Chat App',
        description: 'Chat App',
        theme_color: '#ffffff',
        background_color: '#ffffff', // Puedes agregar un color de fondo
        display: 'standalone', // Asegura que la PWA se vea como una app independiente
        start_url: '.', // Puedes especificar el inicio
        icons: [
          {
            src: '/charlando.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/charlando.png',
            sizes: '192x192',
            type: 'image/png',
          }
        ],
      },
    }),
  ],
  server: {
    proxy: {
      '/socket.io': {
        target: 'http://localhost:4000',
        ws: true,
      }
    }
  }
})
