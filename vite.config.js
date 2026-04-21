import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/stage-2/', // 👈 THIS is what fixes GitHub Pages 404
  plugins: [
    react(),
    tailwindcss(),
  ],
})