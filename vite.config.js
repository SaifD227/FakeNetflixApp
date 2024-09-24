import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split vendor libraries into their own chunk
          if (id.includes('node_modules')) {
            return 'vendor'; // All node_modules go to 'vendor' chunk
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Adjust the chunk size limit as needed
  },
});
