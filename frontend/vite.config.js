import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  root: './frontend',
  base: '/mike-pokedex/',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: './frontend/index.html',
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5050',
    },
  },
});
