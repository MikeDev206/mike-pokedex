import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  root: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: './index.html',
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5050',
    },
  },
});
