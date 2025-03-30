import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: "dist",
  },
  plugins: [react()],
  base: './', // Correct for relative paths in production

  // ✅ Add the server proxy configuration
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // Backend URL
        changeOrigin: true,
        secure: false, // Optional, only needed if using HTTPS during dev
      },
    },
  },
});
