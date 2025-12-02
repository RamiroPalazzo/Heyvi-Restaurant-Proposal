import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Configurado para tu repositorio: https://github.com/RamiroPalazzo/Heyvi-Restaurant-Proposal
  base: '/Heyvi-Restaurant-Proposal/', 
})