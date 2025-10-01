import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // Temporalmente desactivar la verificación de tipos en el build
    rollupOptions: {
      onwarn(warning, warn) {
        // Ignorar advertencias de circular dependencies
        if (warning.code === 'CIRCULAR_DEPENDENCY') return;
        warn(warning);
      }
    }
  }
})
