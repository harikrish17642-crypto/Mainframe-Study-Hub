import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  esbuild: {
    drop: ['console', 'debugger'],
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'supabase': ['@supabase/supabase-js'],
          'react-vendor': ['react', 'react-dom'],
        }
      }
    },
    chunkSizeWarningLimit: 600,
    target: 'es2020',
    minify: 'esbuild',
  }
})
