import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/personality-archetypes/', // Asegúrate de poner el nombre correcto de tu repositorio de GitHub
});
